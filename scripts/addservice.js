var angular = require('./angular');
var name    = process.argv[2];

if(name===undefined) console.error('Debe enviar un nombre para el servicio.');
else angular.addService(name.trim());