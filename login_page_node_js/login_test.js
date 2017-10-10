const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
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
    var head = res.header.Date;
    user.save().then(() => {
        return user.generateAuthToken();
    }).then((token) => {
        res.cookie('token', token,  { maxAge: 900000, httpOnly: true });
        console.log('token is: ', token);
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
    User.findOne({email}).then((User) => {
        console.log(User);
        if(pwd === User.password){
            return User.generateAuthToken();
        }
    }).then((token) => {
        res.cookie('token', token, { maxAge: 900000, httpOnly: true });
        console.log('token for login is: ', token);
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
