var angular = require('./angular');
var name    = process.argv[2];

if(name===undefined) console.error('Debe enviar un nombre para la vista.');
else angular.addView(name.trim());