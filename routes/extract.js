const mongo = require('../infra/connectionFactory');
const jwt = require('../infra/JWT');

module.exports = (app) => {
    app.post('/api/extract', (request, response) => {
        let result = request.body;
        let tokenIsValid = jwt.verify(result.token);
        if(tokenIsValid){

            mongo.connection.then(MongoDB => {
                let dbo = MongoDB.db(mongo.database);
                dbo.collection("clients").findOne({cpf: tokenIsValid.user}).then(cpf => {
                    dbo.collection("transfers")
                        .find({account_number_origin: cpf.account_number})
                        .toArray()
                        .then(res => {
                            let abstract = {
                                dest: [],
                                origin: []
                            };
                            if(res){

                                res.forEach((v, i)=>{
                                    let abst = {
                                        origin: v.account_number_origin,
                                        value: v.value,
                                        dest: v.account_number_dest,
                                        date: v.date
                                    }
                                    abstract.origin.push(abst);
                                });

                                dbo.collection("transfers")
                                .find({account_number_dest: cpf.account_number})
                                .toArray()
                                .then(res => {
                                    if(res){
    
                                        res.forEach((v, i)=>{
                                            let abst = {
                                                origin: v.account_number_origin,
                                                value: v.value,
                                                dest: v.account_number_dest,
                                                date: v.date
                                            }
                                            abstract.dest.push(abst);
                                        });
                                        response.send(abstract);
                                    }
                                }).catch(err => {console.error(err)});

                            }
                                

                        }).catch(err => {console.error(err)});
                    
                    
                    return res;

                }).catch(err => err);
                

                
            })
        }else{
            response.send({"error": "O token não é valido"});
        }
    });
    
}
