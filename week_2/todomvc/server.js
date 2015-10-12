var express = require('express');
var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'src')));

 var tasks = [
        {id:1, title: "Buy apples", completed: false},
        {id:2, title: "Feed the guinea pig", completed: true},
        {id:3, title: "Take a nap", completed: false},
        {id:4, title: "Take a walk", completed: false}
    ];

app.get('/api/tasks', function(request, response, next){
    response.send(tasks);
});

app.get('/api/tasks/:id', function(request, response, next){
    var id = request.params.id;
    id = id -1 ;
    var findTask = _.find(tasks, function(task){ return task.id == id });
    response.send(tasks[id]);
});

app.post('/api/tasks', function(request, response, next){
    var newtask = request.body;
    var task = _.max(tasks, function(task){ return task.id });
    var maxid = task.id + 1;
    newtask.id = maxid;
    tasks.push(newtask);
    response.send(newtask);
});

app.put('/api/tasks/:id', function(request, response, next){
    var id = request.params.id;
    console.log(request.body);
    var taskToUpdate = _.find(tasks, function(task){ return task.id == id });
    taskToUpdate.title = request.body.title;
    taskToUpdate.completed = request.body.completed;

    response.send(taskToUpdate);
});

app.delete('/api/tasks/:id', function(request, response, next){
    var deletedId = request.params.id;
    var deletedTask = _.find(tasks, function(task){ return task.id == deletedId });
    tasks = _.without(tasks, deletedTask);
    response.send(deletedTask);
});

var port = process.env.PORT || 3000;

var server = app.listen(port, function(){
    console.log('Express server listening on port: '
        + server.address().port);
});
