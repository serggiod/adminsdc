angular.module('legapp',[
		'ngRoute'
		,'mgcrea.ngStrap'
		//addmodule.
	])
	.config(function($routeProvider,$httpProvider){
		if(!$httpProvider.defaults.headers.get) $httpProvider.defaults.headers.get = {};
		$httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
		$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
		$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

	    $routeProvider
	    	.when('/',{
	    		redirectTo:'/comisiones'
	    	})
			.when('/comisiones',{
				templateUrl:'views/comisionesView.html',
				controller:'comisionesController'
			})
			.when('/comisiones-autoridades/:id',{
				templateUrl:'views/comisionesAutoridadesView.html',
				controller:'comisionesAutoridadesController'
			})
			.otherwise({redirectTo:'/comisiones'});
	});