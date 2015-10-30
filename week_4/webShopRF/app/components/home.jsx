// container for rendering items list
var React = require('react');
var ItemsList = require('./itemsList.jsx');

var itemStore = require('../stores/itemStore.js');
var itemActions = require('../actions/itemActions.js');

var home = React.createClass({
    getInitialState: function(){
        return{
            items: itemStore.getItems()
        }
    },
    render: function(){
        return (
            <div className="container-fluid">
                <div className="row">
                    <ItemsList items={this.state.items} />
                </div>
            </div>
        )
    }
});

module.exports = home;
