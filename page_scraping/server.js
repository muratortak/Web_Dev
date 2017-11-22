const request = require('request');
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const cryptoJS = require('crypto-js');
const multer = require('multer');
const cheerio = require('cheerio');
const maps = require('@google/maps');
const async = require('async.js');
const app = express();
const path = require('path');
const HTTP_PORT = process.env.PORT || 8010;

var api_url = "http://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=0d87e3caf5f54d1bb24a5c1f7e97d078";

var url = bodyParser.urlencoded({extended: true});
app.use(express.static("./"));
app.engine('.hbs', hbs({extname: '.hbs', 
                        deafultLayout: 'layout', 
                        layoutsDir: __dirname + '/views',
                        helpers: require("./js/helpers.js").handle}));
app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');



// app.use(bodyParser.json()); 


app.get("/bbc", (req, res, next) => {
    var parag = [];
    request.
    get(api_url, (err, requ, body, next) => {
       
        var p2;
        var len = 10;
        var api = JSON.parse(body);
        var container = [];
        var completed_requests = 0;
        var story_url = [];
        var story = [];
        for(var j = 0; j < 10; j++) {
            console.log("THE I RIGHT AFTER FOR LOOP IS: " + j);
            console.log(api.articles[j].url);
            story_url.push(api.articles[j].url);
        }
         console.log(story_url.length);
        for (i in story_url) {
            request.get(story_url[i], function(err, request, html) {
                var $ = cheerio.load(html);
                        var elem2 = $('.story-body__inner > p');
                        
                        var title = $('title').text();
                        var cut_title = title.slice(0, -11);
                        var img = $('.js-image-replace').attr('src');

                             p2 = elem2.text();
                             obj = {titles: cut_title, text: p2, imgs: img};
                             
                             parag.push(obj);
                completed_requests++;
                if (completed_requests == story_url.length) {
                    console.log('completed\n' + parag[0].titles);
                    res.render('index', {articles_story: container, parag_story: parag});
                }
            });
            
        }
       
    })
    
});
    

app.listen(HTTP_PORT, () => {
    console.log("Started on port asdsa ", HTTP_PORT);
});
