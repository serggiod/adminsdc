var angular  = require('./angular');
var name     = process.argv[2];
var injector = process.argv[3];

if(name===undefined || injector===undefined) console.error('Debe enviar el nombre del modulo y el injector.');
else angular.addNgModule(name.trim(),injector.trim());