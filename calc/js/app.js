$( document ).ready(function() {
    'use strict';

    $( "#add" ).on('click',function() {

        var values = getValues('#val1', '#val2');

        var result = myCalc.add(values.x, values.y);

        $( "#result" ).append( result );

    });


    $( "#mult" ).on('click',function() {


        var values = getValues('#val1', '#val2', "#result");

        var result = myCalc.mult(values.x, values.y);

        $( "#result" ).append( result );

    });

    function getValues(fieldid_1, filedid_2, showElid){

        $( showElid ).empty();

        var x = $(fieldId_1).val()*1;
        var y = $(filedid_2).val()*1;

        return {
            x: x,
            y: y
        }

    }

    function showResult(showElid) {

    }


});

