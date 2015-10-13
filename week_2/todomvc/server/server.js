var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

var taskApi = require('./tasks');

var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'src')));

app.use('/api', taskApi);


//Config
var port = process.env.PORT || 3000;

var server = app.listen(port, function(){
    console.log('Express server listening on port: '
        + server.address().port);
});
