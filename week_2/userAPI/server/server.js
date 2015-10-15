var express = require('express');
var path = require('path'); //deel van node
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var userApi = require('./routes/users');
var User = require('./model/users');
var cfg = require('./config');
var faker = require('faker');
var auth = require('./middleware/auth');
var globalErrorHandler = require('./middleware/globalErrorHandler');



var app = express();

app.use(morgan('dev'));

// Auth middelware
// app.use(auth('12345'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// db setup
mongoose.connect('mongodb://localhost/users');

// routes
app.use('/api/users', userApi);

// error handler middelware
app.use(globalErrorHandler());

createInitialData();

// setup server
var port = cfg.port;

var server = app.listen(port, function(){
    console.log('Express server listening on port: '
        + server.address().port);
});

function createInitialData() {
    User.findOne({}, function(user) {
        if (!user) {
            // transfer to config/dataGenerator
            var userList = [];
            for(var i = 0; i < 1000; i++) {
                var user = {
                    firstName: faker.name.firstName(),
                    lastName: faker.name.lastName(),
                    email: faker.internet.email(),
                    age: faker.random.number(100),
                    homeAddress: {
                        addressLine: faker.address.streetAddress(),
                        city: faker.address.city(),
                        zip: faker.random.number()
                    }
                }
                userList.push(user);
            }

            // insert into db
            User.collection.insert(userList, function (err, docs) {
               if (!err) {
                   console.info('%d users were successfully stored.', docs.length);
               }
            });
        }
    });

}

