var express = require('express');
var router = express.Router();
var User = require('../model/users');
var mapper = require('../mappers/users');
var _ = require('underscore');
var inspector = require('schema-inspector');
var userController = require('../controllers/userController');

var usersSchema = {
    type: 'object',
    properties: {
        name: {type: 'string', minLength:4, optional: false},
        age: {type: 'number'},
        email: {type: 'string', pattern: 'email', optional: false},
        addressLine: {type: 'string'},
        city: {type: 'string'},
        zip: {type: 'string'}
    }
}

// api/users/?page=1&pageSize=20
router.get('/', userController.findAll);

router.get('/:id', userController.findOne);

// '/?page=1&pageSize=20'
// router.get('/', function(req, res, next){

//     console.log('Username: ' + req.username);

//     User.find().exec(function(err, users){

//         var resources = _.map(users, function(user) {
//            var resource = mapper.map(user);
//            return resource;
//         });
//         res.status(200).send(resources);
//     });
// });

// router.get('/:id', function(req, res, next){
//     User.findOne({_id: req.params.id}, function(err, user){
//         // if (err) return next(err);
//         if( err || !user) return next(error(404));

//         var resource = mapper.map(user);
//         res.status(200).send(resource);
//     })
// });


router.post('/', validate, function(req, res, next){

    var user = new User();
    user = update(user, req.body);

    user.save(function(err){
        if (err) {
           return res.status(500).send('Failed to post');
        }
        console.log('saved');
        res.set('location', `http://localhost:4000/api/users/${user.id}`);
        res.status(201).send(mapper.map(user));
    });
});

router.put('/:id', userController.update);

router.delete('/:id', userController.destroy);

// router.put('/:id', function(req, res, next){
//     User.findOne({_id: req.params.id}, function(err, user){

//         if (!validateInput(req.body)) {
//             return res.status(400).send('Failed to post, fill in email & name');
//         }

//         user = update(user, req.body);

//         user.save(function(err){
//             if (err) {
//                 return res.status(400).send('Bad Request');
//             }
//             if(!user) return next(error(404));

//             console.log('saved');
//             res.status(201).send(mapper.map(user));
//         });
//     });
// });

// router.delete('/:id', function(req, res, next){
//     User.findOne({_id: req.params.id}, function(err, user){
//         user.remove(function(err){
//             if (err) {
//                return res.status(500).send('Failed to delete');
//             }
//             var resource = mapper.map(user);
//             res.status(200).send(resource);
//         });
//     });
// });

function update(user, resource) {
    var name = resource.name;
    var index = name.indexOf(" ");

    user.firstName = name.substr(0, index);
    user.lastName  = name.substr(index + 1);
    user.email = resource.email;
    user.age = resource.age;
    user.homeAddress.addressLine = resource.addressLine;
    user.homeAddress.city = resource.city;
    user.homeAddress.zip = resource.zip;

    return user;
}

function validate(req, res, next){
    var resource = req.body;

    var result = inspector.validate(usersSchema, resource);
    if (!result.valid) {
        console.log(result);
        return next(error(400));
    }
    next();
}

function error(status){
    var error = new Error("An error occured");
    error.status = status;
    return error;
}


module.exports = router;
