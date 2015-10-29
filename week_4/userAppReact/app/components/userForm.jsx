var React = require('react');


var UserForm = React.createClass({
    getInitialState: function(){
        return {
            errors: {}
        }
    },
    propTypes: {
        newUser: React.PropTypes.shape({
            id: React.PropTypes.number,
            name: React.PropTypes.string.isRequired,
            email: React.PropTypes.string.isRequired,
            age: React.PropTypes.number,
            birthday: React.PropTypes.string,
            married: React.PropTypes.bool.isRequired
        })
    },
    render: function(){
        return (
            <div>
                <div className={this._checkError(this.state.errors.name)}>
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name='name' id="name" placeholder="Name" value={this.props.newUser.name} onChange={this.props.onChange}/>
                    <div className="text-danger">{this.state.errors.name}</div>
                </div>
                <div className={this._checkError(this.state.errors.email)}>
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" name='email' id="email" placeholder="Email" value={this.props.newUser.email} onChange={this.props.onChange}/>
                    <div className="text-danger">{this.state.errors.email}</div>
                </div>
                <div className={this._checkError(this.state.errors.age)}>
                    <label htmlFor="age">Age</label>
                    <input type="text" className="form-control" name='age' id="age" placeholder="Age" value={this.props.newUser.age} onChange={this.props.onChange}/>
                    <div className="text-danger">{this.state.errors.age}</div>
                </div>
                <div className={this._checkError(this.state.errors.birthday)}>
                    <label htmlFor="bday">Birthday</label>
                    <input type="text" className="form-control" name='birthday' id="bday" placeholder="dd/mm/yyyy" value={this.props.newUser.birthday} onChange={this.props.onChange}/>
                    <div className="text-danger">{this.state.errors.birthday}</div>
                </div>
                <div className="checkbox">
                    <label>
                        <input type="checkbox" name='married' checked={this.props.newUser.married} onChange={this.props.onChange}/> Married
                    </label>
                </div>

                <button type="button" className="btn btn-success" onClick={this._save}>Save</button>
            </div>
        )
    },

    _save: function() {
        if(this._isInputValid()) {
            this.props.onSave();
        }
    },

    _checkError: function(field) {
        return field ? 'form-group has-error' : 'form-group';
    },

    _isInputValid: function(){

        var errors = {};
        var isValid = true;

        if(this.props.newUser.name.length<3){
            isValid = false;
            errors.name = 'New employee must be at least 3 chars';
        }
        if(!this._validateEmail(this.props.newUser.email)){
            isValid = false;
            errors.email = 'Email is not valid';
        }
        if(this.props.newUser.age<18){
            isValid = false;
            errors.age = 'User must be at least 18 y.o.';
        }
        if(!this.props.newUser.birthday){
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

module.exports = UserForm;
