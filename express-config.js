// configuração
const express = require('express');
const app = express();
const bodyParser = require('body-parser');



app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));


app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");    
    next();
});

require('./routes/login')(app);
require('./routes/user')(app);
require('./routes/transfers')(app);
require('./routes/extract')(app);
require('./routes/registro')(app);

module.exports = app;