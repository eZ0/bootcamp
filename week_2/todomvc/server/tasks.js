var express = require('express');
var _ = require('underscore');

var router = express.Router();

var tasks = [
        {id:1, title: "Buy apples", completed: false},
        {id:2, title: "Feed the guinea pig", completed: true},
        {id:3, title: "Take a nap", completed: false},
        {id:4, title: "Take a walk", completed: false}
    ];

// http://localhost:3000/api/tasks/12?filter=active
router.get('/tasks', function(request, response, next){
    var filter = request.query.filter;

    response.send(tasks);
});

router.get('/tasks/:id', function(request, response, next){
    var id = request.params.id;
    var findTask = _.find(tasks, function(task){ return task.id == id });

    if(! findTask){
        return response.status(404).send("Resource not found " + request.params.id);
    }

    response.send(findTask);

});

router.post('/tasks', function(request, response, next){
    var newtask = request.body;
    var task = _.max(tasks, function(task){ return task.id });
    var maxid = task.id + 1;
    newtask.id = maxid;

    response.set('loaction', `http://localhost:4040/api/tasks/${task.id}`);

    tasks.push(newtask);
    response.send(newtask);
});

router.put('/tasks/:id', function(request, response, next){
    var id = request.params.id;

    console.log(request.body);

    var taskToUpdate = _.find(tasks, function(task){ return task.id == id });

    taskToUpdate.title = request.body.title;
    taskToUpdate.completed = request.body.completed;

    response.send(taskToUpdate);
});

router.delete('/tasks/:id', function(request, response, next){
    var deletedId = request.params.id;
    var deletedTask = _.find(tasks, function(task){ return task.id == deletedId });

    // if (deletedTask) {
    //     return response.status(204).send("No content. Deleted: " + request.params.id);
    // }

    tasks = _.without(tasks, deletedTask);
    response.send(deletedTask);
});

module.exports = router;
