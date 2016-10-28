var angular = require('./angular');
var name    = process.argv[2];

if(name===undefined) console.error('Debe enviar un nombre para el controlador.');
else angular.addController(name.trim());