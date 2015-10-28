var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var navBar = React.createClass({
    render: function(){
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Euricom</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/employees">Employees</Link></li>
                    </ul>
                </div>
            </nav>
        )
    }
});

module.exports = navBar;
