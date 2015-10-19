var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cfg = require('./config');
var cors = require('cors');


var app = express();

app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// db setup
mongoose.connect('mongodb://localhost:27017/shop');

var productSchema = {
    name: String,
    price: Number
};

var Product = mongoose.model('Product', productSchema, 'products');

// routes
app.get('/api/products', function(req, res, next){
    Product.find(function(err, products){
        res.send(products);
    });
});



// config
var port = cfg.port;

var server = app.listen(port, function(){
    console.log('Express server listening on port: '
        + server.address().port);
});
