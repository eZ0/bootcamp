var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var cartStore = require('../stores/cartStore.js');


var navBar = React.createClass({
    getInitialState: function(){
        return{
            count: cartStore.getCount(),
            price: cartStore.getTotalPrice()
        }
    },
    componentDidMount: function(){
        cartStore.addChangeListener(this._onStoreChange);
    },
    componentWillUnmount: function(){
        cartStore.removeChangeListener(this._onStoreChange);
    },
    _onStoreChange: function(){
        this.setState({
            count: cartStore.getCount(),
            price: cartStore.getTotalPrice()
        });
    },
    render: function(){
        return (
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li><h3><Link to="/">Webshop</Link></h3></li>
                    </ul>
                    <Link to="/cart">
                        <button className="pull-right btn btn-success">
                            {this.state.count} items - €{this.state.price}
                        </button>
                    </Link>
                </div>
            </nav>
        )
    }
});

module.exports = navBar;
