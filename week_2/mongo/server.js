var express = require('express');
var path = require('path'); //deel van node
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//db setup
mongoose.connect('mongodb://localhost/demo');

var Product = mongoose.model('Product', {
    name: String,
    price: Number
});

//routes
// app.get('/api/users', function(req, res, next){
//     var user = [
//         {id: 1, name: "Ksenia"},
//         {id: 2, name: "Anna"},
//         {id: 3, name: "Tom"}
//     ]
//     res.send(user);
// });

app.get('/api/products', function(req, res, next){
    Product.find(function(err, products){
        res.status(200).send(products);
    })
});

app.get('/api/products/:id', function(req, res, next){
    Product.findOne({_id: req.params.id}, function(err, product){
        if(product){
            res.status(200).send(product);
        }
        return res.status(404).send('sorry, not found');
    })
});

app.post('/api/products', function(req, res, next){
    var product = new Product({
        name:  req.body.name,
        price: req.body.price
    });
    console.log('nubm 1 ' + product);
    product.save(function(){
        console.log('nubm 2 ' + product);
        res.status(201).send(product);
    });
});

//-------------------
//constructor fn
// var Product = mongoose.model('Product', {
//     name: String,
//     price: Number
// });

// var product = new Product({
//     name: 'iPhone 6',
//     price: 800
// });

// var product = new Product({
//     name: 'One +',
//     price: 400
// });

// product.save(function(err){
//     if (err) {
//         return console.log('failed '+ err);
//     }
//     console.log('saved');
// });

//-------------------

//setup server
var port = process.env.PORT || 3000;

var server = app.listen(port, function(){
    console.log('Express server listening on port: '
        + server.address().port);
});
