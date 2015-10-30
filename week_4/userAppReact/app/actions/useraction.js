var appDispatcher = require('../appDispatcher.js');
var userApi = require('../api/userApi.js');

var userActions = {
    getUsers: function(){
        userApi.getUsers(function(err, res){
            if (res && res.status === 200){
                appDispatcher.handleAction({
                    actionType: 'USERS_LOADED',
                    data: JSON.parse(res.text)
                });
            }
        })
    },
    addUser: function(user){
        userApi.addUser(user, function(err, res){
            if (res && res.status === 200){
                appDispatcher.handleAction({
                    actionType: 'ADD_USER',
                    data: JSON.parse(res.text)
                });
            }
        })
    },
    removeUser: function(user){
        userApi.removeUser(user, function(err, res){
            if (res && res.status === 200) {
                var deletedUser = JSON.parse(res.text);
                appDispatcher.handleAction({
                    actionType: 'REMOVE_USER',
                    data: deletedUser
                });
            }
        })
    },
    editUser: function(user){
        appDispatcher.handleAction({
            actionType: 'EDIT_USER',
            data: user
        });
    }
};

module.exports = userActions;
