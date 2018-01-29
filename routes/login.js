let mongo = require('../infra/connectionFactory');
let crypto = require('../infra/crypto');
let jwt = require('../infra/JWT');

module.exports = (app) => {

    app.post('/api/login', (request, response) => {
        let result = request.body;
        
        let passCript = crypto.crypt(result.pass);
        mongo.connection.then(mongoDB => {
            dbo = mongoDB.db(mongo.database);
            console.log(result.user)
            dbo.collection("clients").findOne({cpf: result.user}).then( res => {
                console.log(result)
                if(passCript == res.token){
                    let token = jwt.token(result.user, result.token);
                    response.send({"token": token});
                }else{
                    response.send({'error': 'Senha incorreta'});
                }
            }).catch(err => { response.send({'error': 'Usuário não encontrado'}) });
        })
    }); 
}




    