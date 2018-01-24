let mongo = require('../infra/connectionFactory');
let crypto = require('../infra/crypto');
let jwt = require('../infra/JWT');

module.exports = (app) => {
    app.get('/api/login', (request, response) => {
        response.send()
    }); 

    app.post('/api/login', (request, response) => {
        let result = request.body;
        let passCript = crypto.crypt(result.pass);
        console.log(result);

        mongo.connection.then(mongoDB => {
            dbo = mongoDB.db(mongo.database);
            
            dbo.collection("clients").findOne({cpf: result.user}).then( res => {
                if(passCript == res.token){
                    let token = jwt.token(result.user, result.token);
                    response.send({"token": token});
                }else{
                    response.send({'error': 'Senha incorreta'});
                }
            }).catch(err => { console.error(err); response.send({'error': 'Usuário não encontrado'}) });
        })
    }); 
}




    