var express = require('express');
var path = require('path'); //deel van node
var morgan = require('morgan');
var bodyParser = require('body-parser');
var productApi = require('./products');
var userApi = require('./users');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); //alles in public folder

// routes
app.use('/api/products', productApi);
app.use('/api/users', userApi);

//setup
var port = process.env.PORT || 3000;

var server = app.listen(port, function(){
    console.log('Express server listening on port: '
        + server.address().port);
});
