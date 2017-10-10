const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/login_user', {
    useMongoClient: true
});

module.exports = {mongoose};