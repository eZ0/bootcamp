var _ = require('underscore');
var UserModel = require('../models/user');
var userRepository = require('../data/userRepository');
var randomString = require('random-string');
var sha256 = require('js-sha256');

module.exports = {
    create: function(req, res, next){

        var keyName;
        var apiKeyRandom;
        // find user based on id
         userRepository.findOne({ _id: req.params.id})
            .then(function(user) {

                if (!user)
                    return next(new HttpError(404));

                keyName = req.body.name;

                // create new key
                apiKeyRandom = randomString({length: 10});
                // encrypt key
                var apiKeyEncrypted = sha256(apiKeyRandom);

                // store key to db
                user.apiKeys.push({
                    name: keyName,
                    encryptedKey: apiKeyEncrypted
                });

                return userRepository.save(user);
            })
            .then(function(user){

                var resource = {
                    name: keyName,
                    encryptedKey: apiKeyRandom
                };

                return res.status(200).send(resource);
            })
            .catch(function(err) {
                next(err);
            });
    },

    delete: function(req, res, next) {
        var keyName;
        userRepository.findOne({ _id: req.params.id })
            .then(function(user) {
                if (!user)
                    return next(new HttpError(404));

                //find in user - apiKeys - name
                keyName = _.findWhere(user.apiKeys, {
                    name: req.params.name
                });

                //delete apiKey - name
                user.apiKeys = _.without(
                    user.apiKeys,
                    keyName
                );

                return userRepository.save(user);
            })
            .then(function(user){

                var resource = {
                    name: keyName
                };
                return res.status(200).send(resource.name.name);
            })
            .catch(function(err) {
                next(err);
            });
    },

    findAll: function(req, res, next) {
        userRepository.findOne({ _id: req.params.id })
            .then(function(user) {
                if (!user)
                    return next(new HttpError(404));

                // find all apiKey names
                var apiKeys = user.apiKeys;

                // save names to an object
                var resource = _.pluck(apiKeys, 'name');

                // return an object
                return res.status(200).send(resource);
            })
            .catch(function(err) {
                next(err);
            });
    }
}
