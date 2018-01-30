// configuração
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

require('./routes/login')(app);
require('./routes/user')(app);
require('./routes/acc_info')(app);
require('./routes/transfers')(app);
require('./routes/extract')(app);

module.exports = app;