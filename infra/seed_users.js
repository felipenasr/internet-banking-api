const data = require('./seeds.js');
let mongo = require('./connectionFactory.js');
let crypt = require('./../infra/crypto.js')

let account = 3000;


let getAccount = (number) => {
    let string = number.toString();
    let validation = 0;
    for (i = 0; i < string.length; i++) {
        validation = validation + (parseInt(string[i]));
    }
    if (validation >= 10) {
        validation = 'X';
    }
    return `00${number}-${validation}`;

}




module.exports = () => {
    mongo.connection.then(MongoDB => {
        dbo = MongoDB.db(mongo.database);

        dbo.collection('seed').findOne({hasData: true}).then(res=>{
            if(res){
                return res;
            }else{
                dbo.collection('counters').insertOne({ "_id" : "userid", "seq" : 0, "account" : 3000 }).then(res=>res).catch(err=>err);
                data.forEach((value, index) => {
                    value._id = index;
                    let user_account = account+index;
                    value.token = crypt.crypt(value.token);
                    value.account_number = getAccount(user_account);
                    dbo.collection('clients').insertOne(value).then(res => res).catch(err => err);
                })
            }
        }).catch(err => {console.error(err)});
    })
}