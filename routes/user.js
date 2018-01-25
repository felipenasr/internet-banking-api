let db = require('../infra/connectionFactory');
let jwt = require('../infra/JWT');

module.exports = (app) => {
    app.post('/api/user', (request, response) => {
        let result = request.body;
        db.connection.then(mongoDB => {
            dbo = mongoDB.db(db.database);
            let validToken = jwt.verify(result.token);
            if(validToken){
                dbo.collection("clients").findOne({cpf: validToken.user}).then( res => {
                    let abstration = {
                        name: res.name,
                        alias: res.alias,
                        gender: res.gender,
                        balance: res.balance,
                        account: res.account_number,
                        email: res.email
                    }
                    console.log(abstration);
                    response.send(abstration);
                }).catch(err => { console.error(err)});    
            }else{
                response.send({"error": "Token Inválido"});                    
            }
        
        })
    
    
    }); 
}
