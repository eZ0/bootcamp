'use strict';

require.config({
    paths:{
        'jquery'   :'bower_components/jquery/dist/jquery',
        'domready' : 'bower_components/requirejs-domready/domReady'
    }
});

// async, callback is opgeroepen als module is geladen
require(['./mod', 'jquery', 'domready'], function(mod, $, domready){

    var $elem1;
    var $elem2;

    domready(function() {

        var $calc = $('#calc');
        $elem1 = $calc.find('#val1');
        $elem2 = $calc.find('#val2');

        $calc.on('click', 'button' ,function() {

            var id = $(this).attr('id');

            var values = getValues();
            var result = calculate(id, values);

            showResult( "#result", result );

        });

    });

    function getValues(){

        var x = $elem1.val()*1;
        var y = $elem2.val()*1;

        return {
            x: x,
            y: y
        }

    }

    function showResult(showElid, result) {

        $( showElid ).empty();
        $( showElid ).append( result );

    }

    function calculate(action, values) {
        return  mod[ action ](values.x, values.y);
    }


});


// commonJS
// synchr

// var = mod.require('./mod');
// mod.action();
