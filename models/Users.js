let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let User = mongoose.model('Client', new Schema({
    _id: Number,
    account_number: String,
    name: String,
    alias: String,
    gender: String,
    birth: String,
    cpf: String,
    email: String,
    token: String,
    balance: Number
  
}))

module.exports = User;