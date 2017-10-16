const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sales', {
    useMongoClient: true
});

module.exports = {mongoose};