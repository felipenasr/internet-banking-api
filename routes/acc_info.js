let db = require('../infra/connectionFactory');
let jwt = require('../infra/JWT');

module.exports = (app) => {
    app.post('/api/acc_info', (request, response) => {
        let result = request.body;
        

        db.connection.then(mongoDB => {
            dbo = mongoDB.db(db.database);
            let validToken = jwt.verify(result.token);

            if(validToken){
                dbo.collection("clients").findOne({account_number: result.account}).then( res => {
                    let abstration = {
                        name: res.name,
                        gender: res.gender,
                        email: res.email
                    }

                    response.send(abstration);
                }).catch(err => { console.error(err);   response.send({"error": "Erro inesperado"}) } );    
            }else{
                response.send({"error": "Token Inválido"});                    
            }
        
        })
    
    
    }); 
}
