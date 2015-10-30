var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter; //custom events uitsturen, node module
var appDispatcher = require('../appDispatcher.js');
//var _ = require('underscore');
var _ = require('lodash');


/* DATA storage */
var users = [];

/* Setter methods */
var addUser = function(user){
    users.push(user);
};

var removeUser = function(user){
    var user = _.findWhere(users, {id: user.id});
    users = _.without(users, user);
};

var getUsers = function(data){
    users = data;
};

var editUser = function(user){
    var id = user.id;
    var index = _.findIndex(users, {id: id});
    users[index] = user;
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
        return _.cloneDeep(users);
    },
    getUser: function(user){
        var user = _.findWhere(users, {id: Number(user.id)});
        return _.cloneDeep(user);
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
            editUser(action.data);
            storeUser.emit('CHANGE_EVENT');
            break;
        case 'USERS_LOADED':
            getUsers(action.data);
            storeUser.emit('CHANGE_EVENT');
            break;
        default:
            return true;
    }

});

module.exports = storeUser;
