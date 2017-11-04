const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const ejsmate = require('ejs-mate');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const User = require('./models/user');

const app = express();

mongoose.connect('mongodb://dev:devdev@ds147265.mlab.com:47265/shopping', function(error) {
    if(error) {
        console.log(error);
    } else {
        console.log('Connected to the database');
    }
});

// serving static files so express knows to use it
app.use(express.static(__dirname + '/public'));

// Middleware Morgan, logging request library
app.use(morgan('dev'));

// Middleware Body Parser, Express can now parse data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// using a cookie to store a session id
app.use(cookieParser());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'secret!',
}));
app.use(flash());

// EJS, setting the engine
app.engine('ejs', ejsmate);
app.set('view engine', 'ejs');

// 
const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/user')
app.use(mainRoutes);
app.use(userRoutes);

app.listen(3000, function(error) {
    if(error) throw error;
    console.log('Server is Running on 3000');
});