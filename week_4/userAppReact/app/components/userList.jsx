var React = require('react');

var UserList = React.createClass({
    render: function(){
        return (
            <table className='table table-condensed'>
                <thead>
                <tr>
                    <th>id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Birthday</th>
                    <th>Married</th>
                </tr>
                </thead>
                <tbody>
                {this._renderUsers()}
                </tbody>
            </table>
        )
    },
    _renderUsers: function(){
        var self = this;
        return this.props.users.map(function(user, index){
            return (
                <tr>
                    <td key={index}>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>{user.birthday}</td>
                    <td>{self._renderStatus(user.married)}</td>
                </tr>
            )
        })
    },
    _renderStatus: function(isMarried){
        if(isMarried) {
            return <span className="glyphicon glyphicon-check"></span>
        }else{
            return  <span className="glyphicon glyphicon-unchecked"></span>
        }
    }
});

module.exports = UserList;
