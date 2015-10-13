var express = require('express');
var router = express.Router();
var User = require('../model/users');
var mapper = require('../mappers/users');
var _ = require('underscore');
var faker = require('faker');


router.get('/', function(req, res, next){

    User.find(function(err, users){

        var resources = _.map(users, function(user) {
           var resource = mapper.map(user);
           return resource;
        });
        res.status(200).send(resources);
    });
});

router.get('/:id', function(req, res, next){
    User.findOne({_id: req.params.id}, function(err, user){
        if(user){
            var resource = mapper.map(user);
            res.status(200).send(resource);
        }else{
            return res.status(404).send('Sorry, user not found');
        }
    })
});

router.post('/', function(req, res, next){

    if (!validateInput(req.body)) {
        return res.status(400).send('Failed to post, fill in email & name');
    }

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

router.put('/:id', function(req, res, next){
    User.findOne({_id: req.params.id}, function(err, user){

        if (!validateInput(req.body)) {
            return res.status(400).send('Failed to post, fill in email & name');
        }

        user = update(user, req.body);

        user.save(function(err){
            if (err) {
                return res.status(400).send('Bad Request');
            }
            if(!user){
                return res.status(404).send('Sorry, user not found');
            }
            console.log('saved');
            res.status(201).send(mapper.map(user));
        });
    });
});

router.delete('/:id', function(req, res, next){
    User.findOne({_id: req.params.id}, function(err, user){
        user.remove(function(err){
            if (err) {
               return res.status(500).send('Failed to delete');
            }
            console.log('deleted');
            var resource = mapper.map(user);
            res.status(200).send(resource);
        });
    });
});

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

function validateInput(resource){
     return (resource.name && resource.email );
}

module.exports = router;
