var React = require('react');

var UserForm = React.createClass({
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
                <div className={this._checkError(this.props.errors.name)}>
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name='name' id="name" placeholder="Name" value={this.props.newUser.name} onChange={this.props.onChange}/>
                    <div className="text-danger">{this.props.errors.name}</div>
                </div>
                <div className={this._checkError(this.props.errors.email)}>
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" name='email' id="email" placeholder="Email" value={this.props.newUser.email} onChange={this.props.onChange}/>
                    <div className="text-danger">{this.props.errors.email}</div>
                </div>
                <div className={this._checkError(this.props.errors.age)}>
                    <label htmlFor="age">Age</label>
                    <input type="text" className="form-control" name='age' id="age" placeholder="Age" value={this.props.newUser.age} onChange={this.props.onChange}/>
                    <div className="text-danger">{this.props.errors.age}</div>
                </div>
                <div className={this._checkError(this.props.errors.birthday)}>
                    <label htmlFor="bday">Birthday</label>
                    <input type="text" className="form-control" name='birthday' id="bday" placeholder="dd/mm/yyyy" value={this.props.newUser.birthday} onChange={this.props.onChange}/>
                    <div className="text-danger">{this.props.errors.birthday}</div>
                </div>
                <div className="checkbox">
                    <label>
                        <input type="checkbox" name='married' checked={this.props.newUser.married} onChange={this.props.onChange}/> Married
                    </label>
                </div>
                <button type="button" className="btn btn-success" onClick={this.props.onSave}>Add New</button>
            </div>
        )
    },

    _checkError: function(field) {
        return field ? 'form-group has-error' : 'form-group';
    }
});

module.exports = UserForm;
