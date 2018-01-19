module.exports = (app) => {
    app.get('/api/user', (request, response) => {
        response.send({
            "post": "conta, valor, senha",
            "apagar": "este get"
        })
    }); 
}
