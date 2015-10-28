var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var navBar = React.createClass({
    getInitialState: function(){
        return { active: '' }
    },
    render: function(){
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li className={(this.state.active === 'home' ? 'active':'')}><Link name='home' onClick={this._toggleActiveItem} to="/">Home</Link></li>
                        <li className={(this.state.active === 'users' ? 'active' : '')}><Link name='users' onClick={this._toggleActiveItem} to="/users">Users</Link></li>
                    </ul>
                </div>
            </nav>
        )
    },
    _toggleActiveItem: function(e){
        this.setState({
            active: e.target.name
        });
    }

});

module.exports = navBar;
