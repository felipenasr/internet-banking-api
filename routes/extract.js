module.exports = (app) => {
    app.get('/api/extract', (request, response) => {
        response.send({
            "post": "usuario e token",
            "apagar": "este get"
        })
    }); 
    app.post('/api/extract', (request, response) => {
        
        response.send({
            "teste": "teste"
        })
    });
    
}
