let mongoose = require('mongoose');
let Schema = mongoose.Schema;




let Transfers = mongoose.model('Tranfers', new Schema({
    account_number_origin: String,
    account_number_dest: String,
    value: Number,
    previous_balance_origin: Number,
    previous_balance_dest: Number,
    date: date
}))

module.exports = Transfers;