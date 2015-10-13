var mongoose = require('mongoose');

var User = mongoose.model('User', {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: Number,
    email: { type: String, required: true },
    homeAddress: {
        addressLine: String,
        city: String,
        zip: String
    }
});

module.exports = User;
