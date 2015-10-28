var React = require('react');
var UserList = require('./userList.jsx');
var UserForm = require('./userForm.jsx');


var UserContainer = React.createClass({
    getInitialState: function(){
        return {
            users: [
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
            ],
            newUser: this._generateNewUser(),
            errors: {name: ''}
        }
    },
    render: function(){
        return(
            <div>
                <h2>User List</h2>
                <UserList users={this.state.users} />
                <UserForm newUser={this.state.newUser}
                          onChange={this._handleChange}
                          onSave={this._addNewUser}
                          errors={this.state.errors}
                    />
            </div>
        )
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
    _addNewUser: function(){
        if(this._isInputValid(this.state.newUser)) {
            this.state.newUser.id = this._generateUserId(this.state.users);
            this.setState({
                users: this.state.users.concat(this.state.newUser),
                newUser: this._generateNewUser()
            });
        }
    },
    _generateUserId: function(users) {
        if (users.length > 0) {
            var lastUser = users[users.length - 1];
            return lastUser.id + 1;
        }
        return 1;
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
    },
    _isInputValid: function(){
        var errors = {};
        var isValid = true;

        if(this.state.newUser.name.length<3){
            isValid = false;
            errors.name = 'New employee must be at least 3 chars';
        }
        if(!this._validateEmail(this.state.newUser.email)){
            isValid = false;
            errors.email = 'Email is not valid';
        }
        if(this.state.newUser.age<18){
            isValid = false;
            errors.age = 'User must be at least 18 y.o.';
        }
        if(!this.state.newUser.birthday){
            isValid = false;
            errors.birthday = 'You should fill in your birthday';
        }

        this.setState({
            errors: errors
        });

        return isValid;
    },
    _validateEmail: function(email) {
        var re =  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }

});

module.exports = UserContainer;
