var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var appDispatcher = require('../appDispatcher.js');

var userStore = require('../stores/userstore.js');


/* Setter methods */
var count;

var decrement = function(){
    count = count-1;
};
var increment = function(){
    count = count+1;
};

var setUserCounter = function(users){
    if (users) {
        count = users.length;
    }

};


/* Store definition */
var UserCounterStore =  objectAssign({}, EventEmitter.prototype,{
    addChangeListener: function(cb){
        this.on('CHANGE_EVENT', cb);
    },
    removeChangeListener: function(cb){
        this.removeListener('CHANGE_EVENT', cb);
    },
    getUserCount: function(){
        return count;
    }
});


/* Registration on dispatch */
appDispatcher.register(function(payload) {
    var action = payload.action;
    switch(action.actionType){
        case 'ADD_USER':
            increment();
            UserCounterStore.emit('CHANGE_EVENT');
            break;
        case 'REMOVE_USER':
            decrement();
            UserCounterStore.emit('CHANGE_EVENT');
            break;
        case 'USERS_LOADED':
            setUserCounter(action.data);
            UserCounterStore.emit('CHANGE_EVENT');
            break;
        default:
            return true;
    }
});


module.exports = UserCounterStore;
