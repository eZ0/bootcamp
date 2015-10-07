var myModule = (function(myModule){
    'use strict'

    function _private(){
    }

    myModule.action(){
        _private();
    }

    return myModule;

})(myModule || {});

myModule.action();
myModule.extentionMethod();
