const express = require('express');
const morgan = require('morgan');

const app = express();

// Middleware Morgan, logging request library
app.use(morgan('dev'));

app.get('/', function(req, res) {
    const name = 'daniel';
    res.json('my name is ' + name);
});

app.post('/', function(req,res) {
    
});

app.put('/', function(req,res) {
    
});

app.delete('/', function(req, res) {
    
});

app.listen(3000, function(error) {
    if(error) throw error;
    console.log('Server is Running on 3000');
});