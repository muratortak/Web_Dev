const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
mongoose.Promise = global.Promise;

var Schema = mongoose.Schema;           

var AdminSchema = new Schema({
    name : {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    tokens: {
        token:{
            type: String,
            required: true
        },
        access: {
            type: String,
            required: true
        }
    }

});

AdminSchema.methods.generateAuthTokenForLogin = function() {
    var admin = this;
    var access = 'auth';
    var token = jwt.sign({name: admin.name, access}, '1234').toString();
  
    return token;
};

AdminSchema.statics.findByToken = function(token) {
    var Admin = this;
    var decoded;

    try {
        decoded = jwt.verify(token, '1234');
    }catch(e) {
        return Promise.reject();
    }
    
    return Admin.findOne({
        name: decoded.name,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

var Admin = mongoose.model('Admin', AdminSchema);

module.exports = (Admin);