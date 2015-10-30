var appDispatcher = require('../appDispatcher.js');

var cartActions = {
    addItemToCart: function(item){
        appDispatcher.handleAction({
            actionType: 'ADD_ITEM_TO_CART',
            data: item
        });
    },
    removeItemFromCart: function(item){
        appDispatcher.handleAction({
            actionType: 'REMOVE_ITEM_FROM_CART',
            data: item
        });
    },
    reduceAmountOfItems: function(item){
        appDispatcher.handleAction({
            actionType: 'REDUCE_AMOUNT_OF_ITEMS',
            data: item
        })
    },
    increaseAmountOfItems: function(item){
        appDispatcher.handleAction({
            actionType: 'INCREASE_AMOUNT_OF_ITEMS',
            data: item
        })
    }
};

module.exports = cartActions;
