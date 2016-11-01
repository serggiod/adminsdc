angular.module('adminadd',
	[
		'ngRoute'
		,'mgcrea.ngStrap'
		,'angular-md5'
		//addmodule.
	])
	.config(function($routeProvider,$httpProvider){
		if(!$httpProvider.defaults.headers.get) $httpProvider.defaults.headers.get = {};
		$httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
		$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
		$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
		
	    $routeProvider
	    	.when('/',{
	    		redirectTo:'/login'
	    	})
			.when('/login',{
				templateUrl:'views/loginView.html',
				controller:'loginController'
			})
			.when('/logout',{
				templateUrl:'views/logoutView.html',
				controller:'logoutController'
			})
			.when('/actividad',{
				templateUrl:'views/actividadView.html',
				controller:'actividadController'
			})
			//addroute.
			.otherwise({redirectTo:'/login'});
	});