let mongo = require('../infra/connectionFactory');
let assert = require('assert');
let crypto = require('../infra/crypto');


// Roda o autoincrement da conta
let autoIncrement = (id, account)=>{
    let newId = id+1;
    let newAccount = account+1;

    mongo.connection.then(mongoDB =>{
        dbo.collection("counters").update({_id: "userid"}, {seq : newId,account: newAccount})
            .then(res => {
                return res;
            }).catch(err => err)
    })
}

let getAccount = (number)=>{
    let string = number.toString();
    let validation = 0;
    for(i = 0; i < string.length;i++){
        validation = validation + (parseInt(string[i]));
    }
    if(validation >= 10){
        validation = 'X';
    }
    return `00${number}-${validation}`;

}

let Dao = {

    newUser: (user)=> {
        mongo.connection.then(mongoDB => {
            dbo = mongoDB.db(mongo.database);
            dbo.collection("counters").findOne({_id: "userid"})
                
                .then(res=> {
                    user._id = res.seq;
                    user.account_number = getAccount(res.account);
                    user.token = crypto.crypt(user.token);
                    console.log(res.seq);
                    dbo.collection("clients").insertOne(user).then(res =>res).catch(err => { console.error(err)});
                    autoIncrement(res.seq, res.account);
                }).catch((err) =>{ console.error(err)});
        })
    }



}

module.exports = Dao;