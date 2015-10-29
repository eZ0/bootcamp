var React = require('react');

var UserForm = require('./userForm.jsx');

var userStore = require('../stores/userstore.js');
var userAction = require('../actions/useraction.js');

var AddUserContainer = React.createClass({
    getInitialState: function(){
        return {
            users: userStore.getUsers(),
            newUser: userStore.getUser(this.props.params.id)
        }
    },
    render: function(){
        return(
            <UserForm newUser={this.state.newUser}
                      onChange={this._handleChange}
                      errors={this.state.errors}
                      onSave={this._saveUser}
                />
        )
    },
    _saveUser: function(){
        userAction.editUser(this.state.newUser);
        this.props.history.pushState(null, '/users');
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
    }
});

module.exports = AddUserContainer;
