

let mongo = require('../infra/connectionFactory');


module.exports = (app) => {
    app.post('/api/transfers', (request, response) => {
        let result = request.body;
        result.date = new Date().toString()
        //consultar as contas no banco
        let transfer = {};
        // transfer.date = new Date(result.date)
        // transfer.account_number_origin = result.account_number_origin;
        // transfer.account_number_dest = result.account_number_dest;
        // transfer.value = result.value;

        //consultar conta origem
        mongo.connection.then(mongoDB => {
            dbo = mongoDB.db(mongo.database);
            dbo.collection('clients').findOne({ _id: result.account_number_origin })
                .then(res => {
                    if (res === result.account_number_origin) {
                        transfer.account_number_origin = result.account_number_origin;
                    }
                }).catch(err => { console.log(err) })
        })
        //consulta conta destino
        mongo.connection.then(mongoDB => {
            dbo = mongoDB.db(mongo.database);
            dbo.collection('clients').findOne({ _id: result.account_number_dest })
                .then(res => {
                    if (res === result.account_number_dest) {
                        transfer.account_number_dest = result.account_number_dest;
                    }
                }).catch(err => { console.log(err) })
        })
        //pega valor da transação
        if (Math.sign(result.value) === 1) {
            transfer.value = result.value;
        }

        //inserindo nova transferencia no banco
        mongo.connection.then(mongoDB => {
            dbo = mongoDB.db(mongo.database);
            dbo.collection("transfers").insertOne(transfer)
                .then(res => res).catch(err => { console.error(err) });
        })
    });
}
