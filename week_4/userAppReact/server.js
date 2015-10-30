// node
// server.js
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var _ = require('underscore');
var httpProxy = require('http-proxy');

// setup server
var app = express();
var proxy = httpProxy.createProxyServer();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var users = [
    {
        id: 1,
        name: "Frederik",
        email: "frederik.bouillon@euri.com",
        age: 28,
        birthday: "16/04/1987",
        married: false
    }, {
        id: 2,
        name: "Peter",
        email: "peter.cosemans@euri.com",
        age: 51,
        birthday: "06/10/1964",
        married: true
    },
    {
        id: 3,
        name: "Ksenia",
        email: "ksenia.karelskaya@euri.com",
        age: 26,
        birthday: "17/02/1988",
        married: true
    }
];

var generatePersonId = function() {
    if (users.length > 0) {
        var lastPerson = users[users.length - 1];
        return lastPerson.id + 1;
    }
    return 1;
};

// 'GET api/users' - get all users
app.get('/api/users', function(req, res, next) {
    res.send(users);
});

// 'GET api/users/:id' - get one user
app.get('/api/users/:id', function(req, res, next) {
    var user = _.findWhere(users, { id: Number(req.params.id)});

    if (user) {
        return res.send(user);
    }

    res.status(404).send('Not found');
});

// 'POST api/users' - create a new user
app.post('/api/users', function(req, res, next) {

    var resource = req.body;
    resource.id = generatePersonId();
    users.push(resource);
    res.status(200).send(resource);

});

// 'PUT api/users' - update an existing users
app.put('/api/users/:id', function(req, res, next) {

    var resource = req.body;

    var user = _.findWhere(users, { id: Number(req.params.id)});
    if (user) {
        user.name = resource.name;
        user.email = resource.email;
        user.age = resource.age;
        user.birthDate = resource.birthDate;
        user.married = resource.married;
        return res.status(200).send(user);
    }

    res.status(404).send('not found');
});

// 'DELETE api/users/:id' - delete a user
app.delete('/api/users/:id', function(req, res, next) {
    console.log('server DEL');
    var user = _.findWhere(users, { id: Number(req.params.id)});
    users = _.without(users, user);
    res.status(200).send(user);
});

// static content to host our app
app.use(express.static(__dirname + '/app'));

var webpackServer = require('./webpackServer.js');
webpackServer();

// Any requests to localhost:3000 is proxied
// to webpack-dev-server
app.all('/*', function (req, res) {
    proxy.web(req, res, {
        target: 'http://localhost:8080'
    });
});

//catch any errors from the proxy or the server will crash
proxy.on('error', function(e) {
    console.log('Could not connect to proxy, please try again...');
});

// Start server
app.listen(3000, 'localhost', function () {
    console.log('Express server listening on %d, in %s mode', 8080, 'localhost');
});

