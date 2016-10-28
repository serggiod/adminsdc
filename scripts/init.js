var angular = require('./angular');
var appname  = process.argv[2];

if(appname!=undefined) angular.appName(appname.trim());
else console.error('Debe ingresar el nombre de la aplicación.\n\n');