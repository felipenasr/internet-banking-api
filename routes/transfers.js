module.exports = (app) => {
    app.get('/api/transfers', (request, response) => {
        response.send({
            "post": "usuario e senha",
            "apagar": "este get"
        })
    }); 
}
