const jwt = require('jsonwebtoken');    
const secret = 'grupo3gama';

let generateJWT = ()=>{
    

    return {
        token: (user, pass) => {
            return jwt.sign({
                user: user,
                pass: pass,
                accessLevel: 'admin'
            }, 
                secret,{
                expiresIn: '1h'
            })
        
        },

        verify: (token)=> {
            return jwt.verify(token, secret, (erro, token)=>{
                return token;
            })
        }
        
    }
}


module.exports =  generateJWT();


