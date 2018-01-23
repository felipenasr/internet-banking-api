const db = require('./connectionFactory');

db.connection.then( (res)=>{

    dbo = res.db(db.database);

   return dbo.collection("clients").findOne({_id: 13}, function(err, result) {
      if (err) throw err;
      console.log(result);
      res.close();
    });
    
})

