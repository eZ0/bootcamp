var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter; //custom events uitsturen, node module
var appDispatcher = require('../appDispatcher.js');
var _ = require('underscore');

/* DATA storage */
var users = [
        {
            id: 1,
            name: "Frederik",
            email: "frederik.bouillon@euri.com",
            age: 28,
            birthday: "16/04/1987",
            married: false
        },
        {
            id: 2,
            name: "Peter",
            email: "peter.cosemans@euri.com",
            age: 51,
            birthday: "06/10/1964",
            married: true
        }
    ];

/* Setter methods */
var addUser = function(user){
    users.push(user);
};

var removeUser = function(userid){
    var user = _.findWhere(users, {id: userid});
    users = _.without(users, user);
};


/* Store definition */
var storeUser =  objectAssign({}, EventEmitter.prototype,{
    addChangeListener: function(cb){
        this.on('CHANGE_EVENT', cb);
    },
    removeChangeListener: function(cb){
        this.removeListener('CHANGE_EVENT', cb);
    },
    getUsers: function(){
        return users;
    },
    getUser: function(userid){
        var user = _.findWhere(users, {id: Number(userid)});
        return user;
    }
});

/* Registration on dispatch */
appDispatcher.register(function(payload){
    var action = payload.action;

    switch(action.actionType){
        case 'ADD_USER':
            addUser(action.data);
            storeUser.emit('CHANGE_EVENT');
            break;
        case 'REMOVE_USER':
            removeUser(action.data);
            storeUser.emit('CHANGE_EVENT');
            break;
        case 'EDIT_USER':
            storeUser.emit('CHANGE_EVENT');
            break;
        default:
            return true;
    }

});

module.exports = storeUser;
