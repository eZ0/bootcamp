var appDispatcher = require('../appDispatcher.js');

var userActions = {
    addUser: function(user){
        appDispatcher.handleAction({
            actionType: 'ADD_USER',
            data: user
        });
    },
    removeUser: function(user){
        appDispatcher.handleAction({
            actionType: 'REMOVE_USER',
            data: user
        });
    },
    editUser: function(user){
        appDispatcher.handleAction({
            actionType: 'EDIT_USER',
            data: user
        });
    }
};

module.exports = userActions;
