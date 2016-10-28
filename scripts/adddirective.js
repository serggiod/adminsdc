var angular = require('./angular');
var name    = process.argv[2];

if(name===undefined) console.error('Debe enviar un nombre para la directiva.');
else angular.addDirective(name.trim());