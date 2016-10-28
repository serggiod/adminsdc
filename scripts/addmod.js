var angular = require('./angular');
var modname  = process.argv[2];

if(modname!=undefined) angular.addMod(modname.trim());
else console.error('Debe enviar un nombre para el modulo.');