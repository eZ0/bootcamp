var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var userStore = require('../stores/userstore.js');
var userAction = require('../actions/useraction.js');

var userCounterStore = require('../stores/userCounterStore.js');

var navBar = React.createClass({
    getInitialState: function(){
        return {
            active: '',
            count: userCounterStore.getUserCount()
        }
    },
    // Invoked once after the first render
    componentDidMount: function(){
        // You now have access to this.getDOMNode()

        userCounterStore.addChangeListener(this._onStoreChange);
    },
    componentWillUnmount: function(){
        userCounterStore.removeChangeListener(this._onStoreChange);

    },
    _onStoreChange: function(){
        this.setState({
            count: userCounterStore.getUserCount()
        });
    },
    render: function(){
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li className={(this.state.active === 'home' ? 'active':'')}>
                            <Link name='home' onClick={this._toggleActiveItem} to="/">Home</Link>
                        </li>
                        <li className={(this.state.active === 'users' ? 'active' : '')}>
                            <Link name='users' onClick={this._toggleActiveItem} to="/users">Users ({this.state.count}) </Link>
                        </li>
                        <li className={(this.state.active === 'add' ? 'active' : '')}>
                            <Link name='add'onClick={this._toggleActiveItem} to="/users/add">Add</Link>
                        </li>
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
