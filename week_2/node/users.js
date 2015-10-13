var express = require('express');
var router = express.Router();

router.get('/api/users', function(request, response, next){ //op url api/users/

    var user = [
        {id:1, name: "Ksenia"},
        {id:2, name: "Anna"},
        {id:3, name: "Tom"}
    ];

    response.send(user);
});

router.get('/api/users/:id', function(request, response, next){
    console.log('User id ' + request.params.id);
    var user = {id:1, name: "Ksenia"};

    response.send(user);
});

router.post('/api/users', function(request, response, next){
    var user = request.body;
    user.id = 4;

    response.send(user);
});

router.put('/api/users/:id', function(request, response, next){
    console.log(request.params.id);
    console.log(request.body);
    response.send({id:1, name: "Ksenia"});
});

router.delete('/api/users/:id', function(request, response, next){
    console.log(request.params.id);
    console.log(request.body);
    response.send({id:2, name: "Ksenia"});
});

module.exports = router;
