'use strict'

require("./style/style.scss");


var userService = require('./services/userService');
// var $ = require('jquery');

var users = userService.getAll();
users.forEach(user => {
    $('#list').append('<li>' + user.name + '</li>');
    console.log(user.id, user.name);
});


$('#img').attr('src', require("./img/happy_cat.jpg"));
