var mongoose = require('mongoose');
var faker = require('faker');


var User = mongoose.model('User', {
    name: faker.name.findName(),
    email: faker.internet.email(),
    age: faker.random.number(),
    addressLine: faker.address.streetAddress(),
    city: faker.address.city(),
    zip: faker.address.country()
});

module.exports = User;
