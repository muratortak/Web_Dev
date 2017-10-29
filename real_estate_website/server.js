/*
SIBEREMLAK.COM
*/
const request = require('request');
const express = require("express");
const fs = require('fs');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const cryptoJS = require('crypto-js');
const multer = require('multer');
const {mongoose} = require('./db/mongoose');
const maps = require('@google/maps');

var Sales = require('./models/sales');
var Rental = require('./models/rental');
var Admin = require('./models/admin');
var upload = multer ({dest: 'uploads/'});
var googleMap = maps.createClient({
    key: 'AIzaSyB6FcN5eFuxc5LQUEuwLNzsX2q-NQX4sYc'
});


const app = express();
const path = require("path");

const HTTP_PORT = process.env.PORT || 8085;

app.use(cookieParser());
app.use(bodyParser.json());
var url = bodyParser.urlencoded({extended: false});

app.use(express.static("./"));


app.engine('.hbs', hbs({extname: '.hbs', 
                        deafultLayout: 'layout', 
                        layoutsDir: __dirname + '/views',
                        helpers: require("./js/helpers.js").handle.helpers}));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');


app.get("/", (req, res) => {
    res.render("emlak");
});

app.get('/adminMain', (req, res) => {
    var token = req.cookies.token;
    Admin.findByToken(token).then((admin) => {
    res.render('adminMain');
    }).catch((e) => {
        res.send(e);
    });
});

app.post("/postSale", upload.any(), url, (req, res, next) => {
    var token = req.cookies.token;
    Admin.findByToken(token).then((admin) => {
    var type = req.body.type;
    if(type === "sale"){
        var real = new Sales();
    }else if(type === "rental"){
        var real = new Rental();
    }
    real.type = req.body.type;
    real.price = req.body.price;
    real.rooms = req.body.rooms;
    real.squareFeet = req.body.square;
    real.age = req.body.age;
    real.totalStory = req.body.story;
    real.floor = req.body.floor;
    real.heatStyle = req.body.heat;
    real.city = req.body.city;
    real.neighbor = req.body.neighbor;
    real.details = req.body.details;
    real.location.lat = req.body.lat;
    real.location.lng = req.body.lng;
    // var imgs = [];
    var len = req.files.length;
    for(var i = 0; i < len; i++){
        real.img.push({destination: req.files[i].destination, filename: req.files[i].filename});
    }

    // res.send(req.files);
    real.save().then(() => {
        res.render('postAfter');
    }).catch((e) => {
        res.send(e);
    })
}).catch((e) => {
    res.send(e);
});
});

app.get('/pics', (req, res) => {
    var token = req.cookies.token;
    Admin.findByToken(token).then((admin) => {
        if(!admin){
            return Promise.reject();
        }
        res.render('pics');        
    }).catch((e) => {
        res.status(401).send(e);
    });
});


app.get('/deleteMain', (req, res) => {
    var token = req.cookies.token;
    Admin.findByToken(token).then((admin) => {
    res.render('deleteMain');
    }).catch((e) => {
        res.send(e);
    });
});

app.get('/deleteRental', (req, res) => {
    var token = req.cookies.token;
    Admin.findByToken(token).then((admin) => {
    Rental.find().then((Rental) => {
        res.render('deleteRental', {rental: Rental});
    }).catch((e) => {
        res.send(e);
    });
    }).catch((e) => {
        res.send(e);
    });
});

//delete ads
app.get("/delete", (req, res) => {
    var token = req.cookies.token;
    Admin.findByToken(token).then((admin) => {
    Sales.find().then((Sales) => {
        res.render('delete', {sales:Sales})
    }).catch((e) => {
        res.send(e);
    });
    }).catch((e) => {
        res.send(e);
    });
});

app.get('/deleteOne/:id&:type', (req, res) => {
    var token = req.cookies.token;

    var id = req.params.id;
    var type = req.params.type
    Admin.findByToken(token).then((admin) => {
    if(type === "sale"){
    console.log("id is", id);
        Sales.findByIdAndRemove(id).then((Sales)=>{
            res.render('deleteAfter');
        }).catch((e) => {
            res.send(e);
        });
    }else if(type === "rental"){
        Rental.findByIdAndRemove(id).then((Rental)=>{
            res.render('deleteAfter');
        }).catch((e) => {
            res.send(e);
        });
    }
    }).catch((e) => {
        res.send(e);
    });
});


// app.get('/getImages', (req, res) => {
//     Sales.findById('59e2cd545bcbcbd9a4b89fa2').then((Sales) => {
//         res.send(Sales.img[0].path);
//     })
// });


app.get('/getSale', (req, res) => {
    Sales.find().then((Sales) => {
        //  var total = Sales.length();
         console.log("length is: ", Sales.length);
        res.render('get_sale', {sales: Sales});
    }).catch((e) => {
        res.send(e);
    });
});

app.get('/getRental', (req, res) => {
    Rental.find().then((Rental) => {
        res.render('get_rental', {rental: Rental});
    }).catch((e) => {
        res.send(e);
    });
});


app.get('/admin', (req, res) => {

    res.render('admin');
});

app.post('/admin_reg', url, (req, res) => {
    var admin = new Admin();

    admin.name = req.body.name;
    admin.password = req.body.password;
    var access ='auth';
    var token1 = admin.generateAuthTokenForLogin();
    admin.tokens.access = access;
    admin.tokens.token = token1;
    admin.save();
    console.log('token', token1);
    res.cookie('token', token1,  { maxAge: 900000, httpOnly: true });
    res.render('adminMain');
    admin.save().then(() => {
        res.send('reg success');
    }).catch((e) => {
        res.send(e);
    });
});

app.post('/admin_login', url, (req, res) => {
    var name = req.body.name;
    var pwd = req.body.password;
    Admin.findOne({name}).then((admin) => {
        if(admin.password === pwd){
            var access ='auth';
            var token1 = admin.generateAuthTokenForLogin();
            admin.tokens.access = access;
            admin.tokens.token = token1;
            admin.save();
            console.log('token', token1);
            res.cookie('token', token1,  { maxAge: 900000, httpOnly: true });
            res.render('adminMain');
        }else {
            res.send('no pass');
        }
    }).catch((e) => {
        res.status(401).send(e);
    });
});

app.get('/maps', (req, res) => {
    console.log('inside map');
    googleMap.geocode({
        address: '1600 Amphitheatre Parkway, Mountain View, CA'
    }, (err, resp) => {
        if(!err){
            console.log('not error');
            console.log(resp.json.results);
        }else{
            console.log(err);
        }
    });
});

app.get('/modify', (req, res) => {
    Sales.find().then((sales) => {
        
        res.send(sales);
    });
});


app.listen(HTTP_PORT, () => {
    console.log("Started on port ", HTTP_PORT);
});