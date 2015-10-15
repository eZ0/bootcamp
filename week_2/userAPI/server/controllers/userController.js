var _ = require('underscore');
var Q = require('q');

var User = require('../model/users');
var mapper = require('../mappers/users');


var repository = {
    findAll: function(query, page, pageSize) {
        var deferred = Q.defer();
        var page = page || 0;
        var pageSize = pageSize || 20;
        User.find(query)
            .limit(pageSize)
            .skip(pageSize * page)
            .exec(query, function(err, users) {
                if (err)
                    return deferred.resolve(null);
                deferred.resolve(users);
            });
        return deferred.promise;
    },

    findOne: function(query) {
        var deferred = Q.defer();

        User.findOne(query, function(err, user) {
            if (err)
                return deferred.resolve(null);
            deferred.resolve(user);
        });

        return deferred.promise;
    },

    save: function(model) {
        var deferred = Q.defer();
        model.save(function(err) {
            if (err)
                return deferred.reject(err);
            deferred.resolve();

            return deferred.promise;
        });
    },

    destroy: fucntion(query){
        var deferred = Q.defer();

        User.findOne(query, function(err, user) {
            if (err)
                return deferred.resolve(null);
            deferred.resolve(user);
        });

        return deferred.promise;
    }
}


module.exports = {
    findAll: function(req, res, next) {
        repository.findAll({
                page: req.query.page,
                pageSize: req.query.pageSize
            })
            .then(function(users) {
                if (!users)
                    return next(error(404));
                console.log('Users ' + users);

                var resources = _.map(users, function(user) {
                    return mapper.map(user);
                });
                return res.status(200).send(resources);
            })
            .catch(function(err) {
                next(err);
            });
    },

    findOne: function(req, res, next) {
        User.findOne({
            _id: req.params.id
        })
        .then(function(user) {

            if (!user)
                return next(error(404));

            var resource = mapper.map(user);
            return res.status(200).send(resource);
        })
        .catch(function(err){
            next(err);
        });
    },

    update: function(req, res, next) {
        var resource = req.body;
        var updatedUser;

        repository.findOne({
                _id: req.params.id
            })
            .then(function(user) {

                if (!user)
                    return next(error(404));

                console.log(resource.email);

                var name = resource.name;
                var index = name.indexOf(" ");

                user.firstName = name.substr(0, index);
                user.lastName = name.substr(index + 1);
                user.email = resource.email;
                user.age = resource.age;
                user.homeAddress.addressLine = resource.addressLine;
                user.homeAddress.city = resource.city;
                user.homeAddress.zip = resource.zip;

                updatedUser = user;

                return repository.save(user);
            })
            .then(function() {
                //called after save is done
                var resource = mapper.map(updatedUser)
                res.status(201).send(resource);
            })
            .catch(function(err) {
                next(err);
            });
    },

    destroy: function(req, res, next) {
        User.findOne({
                _id: req.params.id
            })
            .then(function(user) {
                if (!user)
                    return next(error(404));
                return repository.remove(user)
            })
            .then(function(user) {
                var resource = mapper.map(user);
                res.status(200).send(resource);
            })
            .catch(function(err) {
                next(err);
            });
    }


}
