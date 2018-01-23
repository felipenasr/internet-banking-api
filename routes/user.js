let db = require('../infra/connectionFactory');

module.exports = (app) => {
    app.get('/api/user', (request, response) => {
        db.connection.then(mongoDB => {
            dbo = mongoDB.db(db.database);
            dbo.collection("clients").findOne({_id: 36}).then( res => {
                console.log(res);
                response.send(res);
            }).catch(err => { console.error(err)});
        })
    }); 
}
