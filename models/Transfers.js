let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//implementar o date
let tempo = new Date().toString();
let date = new Date(tempo);


let Transfers = mongoose.model('Tranfers', new Schema({
    account_number_origin: String,
    account_number_dest: String,
    value: Number,
    previous_balance_origin: Number,
    previous_balance_dest: Number,
    date: date
}))

module.exports = Transfers;