var express = require('express');
var path = require('path'); //deel van node
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public'))); //alles in public folder

app.get('/api/users', function(request, response, next){ //op url api/users/

    var user = [
        {id:1, name: "Ksenia"},
        {id:2, name: "Anna"},
        {id:3, name: "Tom"}
    ];

    response.send(user);
});

app.get('/api/users/:id', function(request, response, next){
    console.log('User id ' + request.params.id);
    var user = {id:1, name: "Ksenia"};

    response.send(user);
});

app.post('/api/users', function(request, response, next){
    var user = request.body;
    user.id = 4;

    response.send(user);
});

app.get('/api/products', function(request, response, next){ //op url api/products
    response.send('products from sample');
});

app.put('/api/users/:id', function(request, response, next){
    console.log(request.params.id);
    console.log(request.body);
    response.send({id:1, name: "Ksenia"});
});

app.delete('/api/users/:id', function(request, response, next){
    console.log(request.params.id);
    console.log(request.body);
    response.send({id:2, name: "Ksenia"});
});

var port = process.env.PORT || 3000;

var server = app.listen(port, function(){
    console.log('Express server listening on port: '
        + server.address().port);
});
