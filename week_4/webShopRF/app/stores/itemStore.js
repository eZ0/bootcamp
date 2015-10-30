var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var appDispatcher = require('../appDispatcher.js');
var _ = require('underscore');

/* DATA storage */
var _items = [];

for (var i=1; i<9; i++) {
    _items.push({
        'id': i,
        'title': 'Artikel #' + i,
        'summary': 'Dit is een speciaal artikel!',
        'description': 'Artikel omschrijving',
        'cost': i
    });
}

/* Setter methods */


/* Store definition */
var itemStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb){
        this.on('CHANGE_EVENT', cb);
    },
    removeChangeListener: function(cb){
        this.removeListener('CHANGE_EVENT', cb);
    },
    getItems: function(){
        return _items;
    },
    getItem: function(itemid){
        var item = _.findWhere(_items, {id: Number(itemid)});
        return item;
    }
});

/* Registration on dispatch */
appDispatcher.register(function(payload){
    var action = payload.action;

    switch(action.actionType) {

        default:
            return true;
    }
});


module.exports = itemStore;
