const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://grptres:grupo3gama@ds119078.mlab.com:19078/internet_banking';
const database = 'internet_banking';



module.exports = {
    connection: MongoClient.connect(url),
    database: database
};

