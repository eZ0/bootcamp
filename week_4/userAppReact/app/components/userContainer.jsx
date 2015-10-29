var React = require('react');
var UserList = require('./userList.jsx');
var UserForm = require('./userForm.jsx');
var UserAdd = require('./userAdd.jsx');

var userStore = require('../stores/userstore.js');
var userAction = require('../actions/useraction.js');


var UserContainer = React.createClass({
    getInitialState: function(){
        return {
            users: userStore.getUsers()
        }
    },
    // Invoked once after the first render
    componentDidMount: function(){
        // You now have access to this.getDOMNode()
        userStore.addChangeListener(this._onStoreChange);
    },
    componentWillUnmount: function(){
        userStore.removeChangeListener(this._onStoreChange);
    },
    _onStoreChange: function(){
        this.setState({
            users: userStore.getUsers()
        });
    },
    render: function(){
        return(
            <div>
                <h2>User List </h2>
                <UserList users={this.state.users}
                          onRemove={this._removeUser}
                          onEdit={this._editUser}
                    />
            </div>
        )
    },
    _removeUser: function(userid){
        userAction.removeUser(userid);
    },
    _editUser: function(userid){
        this.props.history.pushState(null, '/users/'+ userid);

    }
});

module.exports = UserContainer;
