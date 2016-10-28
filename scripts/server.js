var basePath     = __dirname.replace('scripts','');
var nodeModules  = basePath+'node_modules';
var documentRoot = basePath+'public';
var serverPort   = 8080;
var serverHost	 = 'localhost';
var StaticServer = require(nodeModules+'/static-server');

var server = new StaticServer({
  rootPath: documentRoot,
  name: 'legislaturaweb',
  port: serverPort,
  host: serverHost,
  cors: '*',
  followSymlink: false,
  templates: {
    index: 'index.html',
    notFound: '404.html'
  }
});

server.start(function () {
  console.log('Servidor web iniciado en el puerto ', server.port);
});

server.on('request', function (req, res) {
	console.log(req.elapsedTime+' '+req.path);
});