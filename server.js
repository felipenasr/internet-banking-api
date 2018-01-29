const cors = require('cors');


const app = require('./express-config');
const seed = require('./infra/seed_users.js')


// Habilita o CORS
app.use(cors());


// SEED DE USUARIOS
seed();


// Listen e qual porta
app.listen(3000, ()=>{
    console.log('Rodando...');
});