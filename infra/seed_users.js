const data = require('./seeds.js');
let mongo = require('./connectionFactory.js');

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
                data.forEach((value, index) => {
                    value._id = index;
                    let user_account = account+index;
                    value.account_number = getAccount(user_account);
                    dbo.collection('clients').insertOne(value).then(res => res).catch(err => err);
                })
            }
        }).catch(err => {console.error(err)});
    })
}