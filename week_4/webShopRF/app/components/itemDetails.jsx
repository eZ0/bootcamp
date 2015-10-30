var React = require('react');

var itemStore = require('../stores/itemStore.js');
var itemActions = require('../actions/itemActions.js');

var itemDetails = React.createClass({
    getInitialState: function(){
        console.log(this.props.params.id);
        return {
            item: itemStore.getItem(this.props.params.id)
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
            items: cartStore.getCartItems()
        });
    },
    render: function(){
        console.log(this.state);
        return (
            <div>
                <h3>Details of {this.state.item.title}</h3>
                <p>{this.state.item.summary}</p>
                <p>{this.state.item.description}</p>
                <p>€ {this.state.item.cost}</p>
            </div>
        )
    }
});

module.exports = itemDetails;
