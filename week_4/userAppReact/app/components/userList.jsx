var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var UserList = React.createClass({
    render: function(){
        if(this.props.users.length < 1){
            return (<p>Oops! no users:[ </p>);
        }
        return (
            <div>
                <button className="btn btn-success"><Link name='add' to="/users/add">Add New User</Link></button>
                <table className='table table-condensed'>
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Birthday</th>
                        <th>Married</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this._renderUsers()}
                    </tbody>
                </table>
            </div>
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
                    <td>
                        <button className="btn btn-danger btn-xs" onClick={self.props.onRemove.bind(null, user)}>Delete</button>
                        <button className="btn btn-primary btn-xs" onClick={self.props.onEdit.bind(null, user)}>Edit</button>
                    </td>
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
