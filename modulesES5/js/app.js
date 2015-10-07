$( document ).ready(function() {
    'use strict';

    var $calc = $('#calc');
    var $elem1 = $calc.find('#val1');
    var $elem2 = $calc.find('#val2');

    $( "#add" ).on('click',function() {

        var values = getValues();

        var result = myCalc.add(values.x, values.y);

        showResult("#result", result);

    });


    $( "#mult" ).on('click',function() {

        var values = getValues();

        var result = myCalc.mult(values.x, values.y);

        showResult("#result", result);

    });

    function getValues(){

        var x = $elem1.val()*1;
        var y = $elem1.val()*1;

        return {
            x: x,
            y: y
        }

    }

    function showResult(showElid, result) {

        $( showElid ).empty();

        $( showElid ).append( result );

    }


});

