let mongo = require('../infra/connectionFactory');
let jwt = require('../infra/JWT');
let crypto = require('../infra/crypto');

module.exports = (app) => {
    app.post('/api/transfers', (request, response) => {
        let result = request.body;
        let validToken = jwt.verify(result.token);
        result.date = new Date().toString()
        let transfer = {};
        transfer.date = new Date().toString();
        let _balances ={}
        transfer.account_number_dest = result.account_number_dest;              
        
        if(validToken){
            if((parseFloat(result.value))  <=  0 ){
                response.send({error: "Você não pode transferir valores negativos"})                
            }else{

            mongo.connection.then(mongoDB => {
                dbo = mongoDB.db(mongo.database);
                dbo.collection('clients').findOne({ cpf: validToken.user })
                .then(res => {
                    if(res.account_number == result.account_number_dest){
                        response.send({error: "Você não pode transferir dinheiro para sua própria conta"})
                    
                    }else{

                        transfer.account_number_origin = res.account_number;
                        transfer.balance_origin = res.balance;                    
                        _balances.origin = (parseFloat(res.balance)) - (parseFloat(result.value));
                        
                        dbo.collection('clients')
                            .findOne({account_number: transfer.account_number_dest})
                            .then(res => {
                                transfer.balance_dest = res.balance;
                                _balances.dest = (parseFloat(res.balance)) + (parseFloat(result.value));                            
                                
                                if(_balances.origin > 0){
                                    dbo.collection('clients')
                                    .updateOne({account_number: transfer.account_number_dest},
                                        {$set:{balance : _balances.dest}},
                                        { upsert: true })
                                        .then(res => res )
                                    .catch(err=>{console.error(err)});
                                    
                                    dbo.collection('clients')
                                    .updateOne({account_number: transfer.account_number_origin},
                                        {$set:{balance : _balances.origin}},
                                        { upsert: true })
                                        .then(res => res )
                                    .catch(err=>{console.error(err)});
                                    
                                    
                                    dbo.collection('transfers').insertOne(transfer)
                                    .then(res => {
                                        let log = `${transfer.date}:::::: A conta ${transfer.account_number_origin} transferiu ${transfer.value} para a conta ${transfer.account_number_dest}`;
                                        console.log(log);
                                        log = crypto.crypt(log);
                                        dbo.collection("log_col").insertOne({log}).then(res => res).catch(err => {console.log(err)});
                                        return res;

                                    }).catch(err => { console.error(err) });
                                    response.send({'success': true});

                                }else{
                                    response.send({error: 'Saldo insuficiente'});
                                }
                                
                                return res;
                        }).catch(err =>  {response.send({error: 'Conta inválida'})} );
                        return res;
                    }
                }).catch(err => { err });


            })

        }
            //consulta conta destino
            if(transfer.account_number_dest == transfer.account_number_origin){
            }else{
                //pega valor da transação
                if (Math.sign(result.value) === 1) {
                    transfer.value = result.value;
                }
                
                //inserindo nova transferencia no banco
                // mongo.connection.then(mongoDB => {
                //     dbo = mongoDB.db(mongo.database);

                // })
            }
            
        }else{
                response.send({error: 'Token inválido'});
        }
    });
}
    