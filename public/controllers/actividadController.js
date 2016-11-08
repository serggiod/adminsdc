angular
		.module('adminadd')
		.controller('actividadController',function($scope,$rootScope,$http){
			$scope.init = ()=>{
				$rootScope.btnLogout=true;
			};

			$scope.init();
		});