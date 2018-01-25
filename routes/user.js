let db = require('../infra/connectionFactory');

module.exports = (app) => {
    app.get('/api/user', (request, response) => {

        db.connection.then(mongoDB => {
            dbo = mongoDB.db(db.database);
            dbo.collection("clients").findOne({_id: 1}).then( res => {
                let abstration = {
                    name: res.name,
                    alias: res.alias,
                    gender: res.gender,
                    balance: res.balance,
                    account: res.account_number,
                    email: res.email
                }   
                console.log(res);
                response.send(abstration);
            }).catch(err => { console.error(err)});
        })
    
    
    }); 
}
