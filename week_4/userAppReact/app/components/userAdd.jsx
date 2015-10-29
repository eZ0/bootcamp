var React = require('react');

var UserForm = require('./userForm.jsx');

var userStore = require('../stores/userstore.js');
var userAction = require('../actions/useraction.js');

var AddUserContainer = React.createClass({
    getInitialState: function(){
        return {
            users: userStore.getUsers(),
            newUser: this._generateNewUser()
        }

    },
    render: function(){
        return(
            <UserForm newUser={this.state.newUser}
                      onChange={this._handleChange}
                      onSave={this._addNewUser}
                      errors={this.state.errors}
                />
        )
    },
    _addNewUser: function(){
            this.state.newUser.id = this._generateUserId(this.state.users);
            userAction.addUser(this.state.newUser);
            this.props.history.pushState(null, '/users');
    },
    _generateUserId: function(users) {
        if (users.length > 0) {
            var lastUser = users[users.length - 1];
            return lastUser.id + 1;
        }
        return 1;
    },
    _handleChange: function(e){
        var newUser = this.state.newUser;
        if (e.target.type === 'checkbox') {
            newUser[e.target.name] = e.target.checked;
        } else {
            newUser[e.target.name] = e.target.value;
        }
        this.setState({
            newUser: newUser
        })
    },
    _generateNewUser: function(){
        return {
            id: null,
            name: "",
            email: "",
            age: null,
            birthday: "",
            married: false
        }
    }
});

module.exports = AddUserContainer;
