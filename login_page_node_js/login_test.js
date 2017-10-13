
/** 

THE CODE IS MESSY. THE FIRST GOAL HERE IS TO LEARN AND
SUCCESSFULLY IMPLEMENT THE RIGHT TOOLS TO ACCOMPLISH
NEW USER REGISTRATION AND LOGIN SYSTEM.

CODE REVIEW WILL BE DONE SOON.

 **/

const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const cryptoJS = require('crypto-js');
const {mongoose} = require('./db/mongoose');

const app = express();
const path = require("path");

var User = require('./models/user');
const HTTP_PORT = process.env.PORT || 8082;

function onHttpStart() {
    console.log("Express http server listening on" + HTTP_PORT);
}
app.use(express.static("./"));
app.engine('.hbs', hbs({extname: '.hbs', deafultLayout: 'layout', layoutsDir: __dirname + '/views'}));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(cookieParser());

//To get input in correct form from login and register form.
var url = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json());

//simple middleware to understand middleware concept.
app.use((req, res, next) => {
    console.log('Something is happening');
    next();
});

//Get the main page.
app.get("/", (req, res) => {
    // res.sendFile(path.join(__dirname, "index.html"));
    res.render('index');
});

//New user registration
app.post("/login_test", url,(req, res) => {
    var user = new User();
    user.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email;
    console.log('email is: ', user.email);
    var head = res.header.Date;
    console.log('Crypto is: ', cryptoJS.HmacSHA256(user.password, "key").toString());
    user.crypto = cryptoJS.HmacSHA256(user.password, "key").toString();
    console.log('user crypto is: ', user.crypto);
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.cookie('token', token,  { maxAge: 900000, httpOnly: true });
        console.log('token in login_test is: ', token);
        res.send();
    }).catch((e) => {
        res.status(400).send(e);
    });
});

//Login page.
app.get('/login', (req, res) => {
    res.render('login');
});

//Conducting login process
//still under building.
app.post('/login_confirm', url, (req, res) => {
    var email = req.body.email;
    console.log('email is: ', email);
    var pwd = req.body.password;
    console.log('password is: ', pwd);
    User.findOne({email}).then((user) => {
        if(!user){
            return Promise.reject();
        }
        console.log('user found', user);
        //careful with pwd or this.pwd
        console.log('the pwd is: ', pwd);
        var hash = cryptoJS.HmacSHA256(pwd, "key").toString()
        console.log('hash is ', hash);
        console.log('user.hash is: ', user.crypto);
        if(user.crypto === hash){
            console.log('returned user');
            return user;
        }else {
            console.log('no hash');
        }
    }).then((user) => {
        console.log('inside the then(user) and user tokens are: ', user.tokens);
        // user.tokens.pop();
        // user.tokens.splice(0, 10);
        // user.tokens[0]
        var access = 'auth';
        var token1 = user.generateAuthTokenForLogin();

        console.log('token in first then: ', token1);
        user.tokens[0].token = token1;
        user.save();
        console.log('user token is: ', user.tokens[0].token);
        res.cookie('token', token1,  { maxAge: 900000, httpOnly: true });
        res.send('successful');
    })  
    .catch((e) => {
        res.status(401).send(e);
    });
});

//Get all the users.
app.get('/login_test', url, (req, res) => {
    User.find().then((User) => {
        res.send(User);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

//Get the profile page for logged in user.
//Can't be reached by anyone other than the user itself.
//Authentication through token stored in cookie.
app.get('/login_test/me', (req, res) => {
    var token = req.cookies.token;
    console.log("token is  ", token);

    User.findByToken(token).then((user) => {   
        if(!user) {
            return Promise.reject();
        }
        console.log("Success");
        // res.send(user);
        res.render('index_hbs', {title: user.name, id: user._id});
    }).catch((e) => {
        res.status(401).send();
    });
});

//Test page for authentication.
//Only logged in users can see.
app.get('/login_test/settings', (req, res) => {
    var token = req.cookies.token;
    User.findByToken(token).then((user) => {
        if(!user) {
            return Promise.reject();
        }
        res.send('Welcome to the Settings');
    }).catch((e) => {
        res.status(401).send();
    });
});

//Logout page.
app.get('/login_test/logout', (req, res) => {
    var token = req.cookies.token;
    User.findByToken(token).then((user) => {
        if(!user) {
            return Promise.reject();
        }
        user.tokens[0].token = "";
        res.cookie('token', 0, { maxAge: 10, httpOnly: true });
        res.send('Logout successful');
    }).catch((e) => {
        res.status(401).send();
    });
});

//Test page for updating user information.
app.put('/login_test/:id', (req, res) => {
    var id = req.params._id;
    User.findById(id).then((user) => {
        user.email = 'testing@testing.com';
        res.send(user);
    });
});

//Delete a user.
app.delete('/login_test/:id', (req, res) => {
    var id = req.params.id;
    User.findByIdAndRemove(id).then((user) => {
        res.send(user);
    });
});

app.listen(HTTP_PORT, () => {
    console.log("Started on port ", HTTP_PORT);
});
