// configuração
const express = require('express');
const app = express();


app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");    
    next();
});

require('./routes/login')(app);
require('./routes/user')(app);
require('./routes/transfers')(app);
require('./routes/extract')(app);

module.exports = app;