'use strict';

var argv = require('yargs').argv;
var calc = require('./calc');

//node main --fn add --x 4 --y 7
var actionName = argv.fn; // --fn is gewoon een naam

console.log( calc[actionName]( argv.x, argv.y ) );
