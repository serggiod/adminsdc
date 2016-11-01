var angular = require('./angular');
var name    = process.argv[2];

if(name===undefined) console.error('Debe enviar un nombre para la factoria.');
else angular.addFactory(name.trim());