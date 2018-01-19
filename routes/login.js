module.exports = (app) => {
    app.get('/api/login', (request, response) => {
        response.send({
            "post": "usuario e senha",
            "apagar": "este get"
        })
    }); 
}
