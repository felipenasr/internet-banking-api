// TESTE

let dao = require('../dao/ApiDAO');

let felipe = {
    name: "leticia martin",
    alias: "lelekona 2000",
    gender: "leticinha",
    birth: "21/06/1993",
    cpf: "5645456445646",
    email: "lele_doidera@chatdauol.net",
    token: "ertyuiokjhgfdcvbnm",
    balance: 9000000
}

module.exports = (app) => {
    app.get('/registro', (request, response) => {
        dao.newUser(felipe);
        response.send({
            "post": "usuario e senha",
            "apagar": "este get"
        })
    });
    
    // app.post('/registro', (request, response) => {
    // }); 
}
