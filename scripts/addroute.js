var angular = require('./angular');
var routename   = process.argv[2];
var routeparams = process.argv[3];

if(routename!=undefined) {
    if(routeparams!=undefined) angular.addRoute(routename.trim(),routeparams.trim());
    else angular.addRoute(routename.trim(),undefined);
}
else console.error('Debe enviar un nombre para la ruta.');