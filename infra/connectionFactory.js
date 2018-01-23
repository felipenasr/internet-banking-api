const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';
const database = 'internet_banking';


module.exports = {
    connection: MongoClient.connect(url),
    database: database
};

