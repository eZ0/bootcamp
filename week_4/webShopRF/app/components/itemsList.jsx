var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var cartStore = require('../stores/cartStore.js');
var cartActions = require('../actions/cartActions.js');


var ItemsList = React.createClass({

    render: function(){
        return (
            <ul>{this._renderItems()}</ul>
        )
    },
    componentDidMount: function(){
        cartStore.addChangeListener(this._onStoreChange);
    },
    componentWillUnmount: function(){
        cartStore.removeChangeListener(this._onStoreChange);
    },
    _onStoreChange: function(){
        this.setState({
            items: cartStore.getCartItems()

        });
    },
    _renderItems: function(){
        var self = this;
        return this.props.items.map(function(item, index){
            return (
                <div className="col-xs-4" key={index}>
                   <h4><Link to={`/items/${item.id}`}>{item.title}</Link>
                       <button className="btn btn-success btn-xs pull-right" onClick={self._addItemToCart.bind(null, item)}>
                           <span className="glyphicon glyphicon-heart-empty" aria-hidden="true"></span>
                            Add
                       </button>
                   </h4>
                    <p>{item.description}</p>
                    <div>
                        <p>€ {item.cost}</p>

                        {self._showAmountOfAddedItems(item.qty)}

                    </div>

                </div>
            )
        })
    },
    _addItemToCart: function(item){
        cartActions.addItemToCart(item);
    },
    _showAmountOfAddedItems: function(qty){
        if(qty){
            return  <p className="text-success">{qty} added</p>;
        }
    }
});

module.exports = ItemsList;
