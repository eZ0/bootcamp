var _ = require('underscore');
var UserModel = require('../models/user');
var jwt = require('jwt-simple');
var userRepository = require('../data/userRepository');
var sha256 = require('js-sha256');
var HttpError = require('../httpError');

module.exports = {
    create: function(req, res, next){

        // get key
        // var apiKey = req.body.apiKey;

        // encode key
        // var encrKey = sha256(apiKey);

        var encrKey = '8e2d6f815d85350e885691e43b2232a82a545cd444e855b252763decee5e7508';

        // look at db if this key exists
        userRepository.findOne({
                'apiKeys.encryptedKey': encrKey
            })
            .then(function(user) {
                console.log('asdasda '+user);
                if (!user)
                    return next(new HttpError(404));

                // get user name and id
                var id = user._id;
                var name = user.firstName + ' ' + user.lastName

                // create token payload
                var payload = {
                    "sub": 12242344,
                    "iat": 1232312,
                    "iis": "euri:bootcamp",
                    "name": name,
                    "userId": id
                };
                var secret = '~~~pony~~~';

                var token = jwt.encode(payload, secret);

                return res.status(200).send({"accessToken": token, "tokenType": "bearer"});
            })
            .catch(function(err) {
                next(err);
            });
    }
}
