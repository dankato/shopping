const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/user');
const ejs = require('ejs');
const ejsmate = require('ejs-mate');


const app = express();

mongoose.connect('mongodb://dev:devdev@ds147265.mlab.com:47265/shopping', function(error) {
    if(error) {
        console.log(error);
    } else {
        console.log('Connected to the database');
    }
});

// Middleware Morgan, logging request library
app.use(morgan('dev'));

// Middleware Body Parser, Express can now parse data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// EJS, setting the engine
app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');


app.post('/create-user', function(req,res) {
    const user = new User();

    user.profile.name = req.body.name;
    user.password = req.body.password;
    user.email = req.body.email; 
    
    user.save(function(err) {
        if(err) throw (err);
        res.json('New User Has Successfully Been Created!')
    })
});


app.get('/', function(req, res) {
    res.render('main/home');
})

app.get('/about', function(req, res) {
    res.render('main/about');
})

app.put('/', function(req,res) {
    
});

app.delete('/', function(req, res) {
    
});

app.listen(3000, function(error) {
    if(error) throw error;
    console.log('Server is Running on 3000');
});