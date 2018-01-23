let crypto = require('../infra/crypto');

let cri = crypto.crypt('felipe');
console.log("CRIPOTOGRAFADO:", cri);
console.log(crypto.decrypt(cri));

module.exports = (app) => {
    app.get('/api/login', (request, response) => {
        response.send({
            "post": "usuario e senha",
            "apagar": "este get"
        })
    }); 
    app.post('/api/login', (request, response) => {
        console.log(request.headers.body);
        response.send({
        })
    }); 
}
