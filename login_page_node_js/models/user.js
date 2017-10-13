const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name:{
       type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
       type: String, 
       required: true,
       minglength: 1
    },
    crypto: {
        type: String,
        required: true,
        trim: true
    },
    //tokens will have their own _id object for their object
    tokens: [{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
    }]
});

//Generate token for user authentication.
UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({email: user.email, access}, '1234').toString();
    user.tokens.push({access, token});
    return user.save().then(() => {
        return token;
    });
};

//Authentication through token. 
UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, '1234');
    }catch(e) {
        return Promise.reject();
    }
    
    return User.findOne({
        email: decoded.email,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.methods.generateAuthTokenForLogin = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({email: user.email, access}, '1234').toString();
    // user.tokens.push({access, token});
//     return user.save().then(() => {
//    console.log(token);
//         return token;
//     });
    return token;
};


var User = mongoose.model('User', UserSchema);
module.exports = (User);