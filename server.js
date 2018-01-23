const app = require('./express-config');


const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const SECRETKEY = "TESTE";
    
// Permite receber: application/json
app.use(bodyParser.json());

// Habilita o CORS
app.use(cors());

//
app.use(morgan('dev'));

app.set('superSecret', SECRETKEY);



// Listen e qual porta
app.listen(3000, ()=>{
    console.log('Rodando...');
});