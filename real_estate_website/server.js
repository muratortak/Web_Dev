/*
SIBEREMLAK.COM
*/

const express = require("express");
const fs = require('fs');
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const cryptoJS = require('crypto-js');
const multer = require('multer');
const {mongoose} = require('./db/mongoose');

var Sales = require('./models/sales');
var Rental = require('./models/rental');
var upload = multer ({dest: 'uploads/'});

const app = express();
const path = require("path");

const HTTP_PORT = process.env.PORT || 8085;

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
    res.send("IT WORKS");
});

app.post("/postSale", upload.any(), url, (req, res, next) => {
    var sale = new Sales();
    // sale.img.contentType = "image/jpg";
    sale.type = req.body.type;
    sale.price = req.body.price;
    sale.rooms = req.body.rooms;
    sale.squareFeet = req.body.square;
    sale.age = req.body.age;
    sale.totalStory = req.body.story;
    sale.floor = req.body.floor;
    sale.heatStyle = req.body.heat;
    sale.city = req.body.city;
    sale.neighbor = req.body.neighbor;
    // var imgs = [];
    var len = req.files.length;
    for(var i = 0; i < len; i++){
        sale.img.push({destination: req.files[i].destination, filename: req.files[i].filename});
    }

    res.send(req.files);
    sale.save().then((sale) => {
        res.send(sale);
    }).catch((e) => {
        res.send(e);
    })
});

app.get('/pics', (req, res) => {
    res.render('pics');
});

app.get('/getImages', (req, res) => {
    Sales.findById('59e2cd545bcbcbd9a4b89fa2').then((Sales) => {
        res.send(Sales.img[0].path);
    })
});


app.get('/getSale', (req, res) => {
    Sales.find().then((Sales) => {
        //  var total = Sales.length();
         console.log("length is: ", Sales.length);
        res.render('get_sale', {sales: Sales});
    }).catch((e) => {
        res.send(e);
    });
});



app.listen(HTTP_PORT, () => {
    console.log("Started on port ", HTTP_PORT);
});