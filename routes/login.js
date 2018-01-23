let mongo = require('../infra/connectionFactory');
let crypto = require('../infra/crypto');

module.exports = (app) => {
    app.get('/api/login', (request, response) => {
        response.send({
            "post": "usuario e senha",
            "apagar": "este get"
        })
    }); 
    app.post('/api/login', (request, response) => {
        let result = request.body;
        let passCript = crypto.crypt(result.pass);


        mongo.connection.then(mongoDB => {
            dbo = mongoDB.db(mongo.database);
            
            dbo.collection("clients").findOne({cpf: result.user}).then( res => {
                if(passCript == res.token){
                    response.send({"token": "token"});
                }else{
                    response.send({'error': 'Senha incorreta'});
                }
            }).catch(err => { response.send({'error': 'Usuário não encontrado'}) });
        })
    }); 
}




    