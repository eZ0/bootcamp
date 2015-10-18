var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');


var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// db setup
mongoose.connect('mongodb://localhost/products');

var port = process.env.PORT;

var server = app.listen(port, function(){
    console.log('Express server listening on port: '
        + server.address().port);
});
