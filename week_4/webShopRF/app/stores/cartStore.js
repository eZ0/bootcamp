var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var appDispatcher = require('../appDispatcher.js');
var _ = require('underscore');

/* DATA storage */
var _cartItems = [];

if(localStorage.getItem('cart')){
    _cartItems = JSON.parse(localStorage.getItem('cart'));
}

/* Setter methods */
var addItemToCart = function (item) {
    var addedItem = _.contains(_cartItems, item);

    if (addedItem) {
        item.qty += 1;

    } else {
        item.qty = 1;
        _cartItems.push(item);
    }
    saveToLocalStorage(_cartItems);
};

var saveToLocalStorage = function(data){
    localStorage.cart = JSON.stringify(data);
}

var removeItemFromCart = function (item) {
    var item = _.findWhere(_cartItems, {id: item.id});
    _cartItems = _.without(_cartItems, item);
    saveToLocalStorage(_cartItems);
};

var reduceAmountOfItems = function (item) {
    item.qty -= 1;
    saveToLocalStorage(_cartItems);
};

var increaseAmountOfItems = function (item) {
    item.qty += 1;
    saveToLocalStorage(_cartItems);
};


var getTotal = function () {
    var total = 0;
    _.forEach(_cartItems, function(item) {
        total += (item.qty*item.cost);
    });
    return total;
};

var getCount = function() {
    var count = 0;
    _.forEach(_cartItems, function(item) {
        count += item.qty;
    });
    return count;
};


/* Store definition */
var cartStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function (cb) {
        this.on('CHANGE_EVENT', cb);
    },
    removeChangeListener: function (cb) {
        this.removeListener('CHANGE_EVENT', cb);
    },
    getCartItems: function () {
        return _cartItems;
    },
    getCount: function () {
        return getCount();
    },
    getTotalPrice: function () {
        return getTotal();
    }
});

/* Registration on dispatch */
appDispatcher.register(function (payload) {
    var action = payload.action;

    switch (action.actionType) {
        case 'ADD_ITEM_TO_CART':
            addItemToCart(action.data);
            cartStore.emit('CHANGE_EVENT');
            break;
        case 'REMOVE_ITEM_FROM_CART':
            removeItemFromCart(action.data);
            cartStore.emit('CHANGE_EVENT');
            break;
        case 'REDUCE_AMOUNT_OF_ITEMS':
            reduceAmountOfItems(action.data);
            cartStore.emit('CHANGE_EVENT');
            break;
        case 'INCREASE_AMOUNT_OF_ITEMS':
            increaseAmountOfItems(action.data);
            cartStore.emit('CHANGE_EVENT');
            break;
        default:
            return true;
    }
});

module.exports = cartStore;
