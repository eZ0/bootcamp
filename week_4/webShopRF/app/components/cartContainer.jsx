var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var cartStore = require('../stores/cartStore.js');
var cartActions = require('../actions/cartActions.js');

var cart = React.createClass({
    getInitialState: function(){
        return{
            items: cartStore.getCartItems(),
            price: cartStore.getTotalPrice(),
            count: cartStore.getCount(),
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
            items: cartStore.getCartItems(),
            price: cartStore.getTotalPrice(),
            count: cartStore.getCount()
        });
    },
    render: function(){
        if(this.state.items && this.state.items.length) {
        return (
            <div>
                <h3>Cart</h3>
                <table className='table table-condensed'>
                    <thead>
                    <tr>
                        <th></th>
                        <th>Artikel</th>
                        <th>Aantal</th>
                        <th>Prijs</th>
                        <th></th>
                        <th>Subtotal</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this._renderCartItems()}
                    </tbody>
                </table>
                    <h4 className="pull-right">Total: {this.state.price} €</h4>
            </div>
        )
        }else{
            return (<p>Your cart is empty</p>)
        }
    },
    _renderCartItems: function(){
        var self = this;
            return this.state.items.map(function (item, index) {
                return (
                    <tr>
                        <td>
                            <button className="btn btn-danger btn-xs"
                                    onClick={self._removeItemFromCart.bind(null, item)}>x
                            </button>
                        </td>
                        <td><Link to={`/items/${item.id}`}>{item.title}</Link></td>
                        <td>{item.qty}</td>
                        <td>{item.cost} €</td>
                        <td>
                            <button className="btn btn-primary btn-xs"
                                    onClick={self._reduceAmountOfItems.bind(null, item)}>-
                            </button>
                            <button className="btn btn-primary btn-xs"
                                    onClick={self._increaseAmountOfItems.bind(null, item)}>+
                            </button>
                        </td>
                        <td>{item.qty * item.cost} €</td>
                    </tr>
                )
            })

    },
    _removeItemFromCart: function(item){
        cartActions.removeItemFromCart(item);
    },
    _reduceAmountOfItems: function(item){
        cartActions.reduceAmountOfItems(item);
    },
    _increaseAmountOfItems: function(item){
        cartActions.increaseAmountOfItems(item);
    }
});

module.exports = cart;
