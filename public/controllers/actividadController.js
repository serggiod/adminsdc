angular
.module('legapp')
.controller('actividadController',function($scope,$rootScope,$http,$session){
	
	$scope.routeToActividades = '/rest/ful/adminadd/index.php/actividades';

	$scope.init = ()=>{
		data = $session.get('user');
		$scope.user = JSON.parse(data);
		$rootScope.usuario = $scope.user.usuario;
		$rootScope.stage=true;
		$scope.lista=true;
		$scope.formulario=false;
		$scope.fnuevo=false;
		$scope.getActividades();
	};

	$scope.getActividades = ()=>{
		$session.autorize(()=>{
			$http
				.get($scope.routeToActividades)
				.error(()=>{console.log($scope.routeToActividades+' : No Data');})
				.success((json)=>{if(json.result)$scope.actividades=json.rows});
		});
	};

	$scope.nuevo = ()=>{
		$scope.formulario=true;
		$scope.lista=false;
		$scope.fnuevo=true;
	};

	$scope.ncancel = ()=>{
		$scope.formulario=false;
		$scope.lista=true;
		$scope.fnuevo=false;
	};

	$scope.nacept = ()=>{
		$scope.formulario=false;
		$scope.lista=true;
		$scope.fnuevo=false;
	};

	$session.autorize(()=>{
		$scope.init();
	});	

});