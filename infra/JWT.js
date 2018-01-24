const jwt = require('jsonwebtoken');    
const secret = 'grupo3gama';

let generateJWT = ()=>{
    

    return {
        token: (user, pass) => {
            return jwt.sign({
                login: 'teste',
                senha: '123456',
                accessLevel: 'admin'
            }, 
                secret,{
                expiresIn: '3h'
            })
        
        },

        verify: (token)=> {
            return jwt.verify(token, secret, (erro, token)=>{
                console.log(token);
            })
        }
        
    }
}


module.exports =  generateJWT();


