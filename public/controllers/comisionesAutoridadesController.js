angular
.module('legapp')
.controller('comisionesAutoridadesController',function($scope,$rootScope,$http,$session,$location,$routeParams){
	
	$scope.init = ()=>{
		$rootScope.stage=true;
		$rootScope.usuario=JSON.parse($session.get('user')).usuario;
		$scope.autoridades = ['PRESIDENTE','VICEPRESIDENTE','SECRETARIO','MIEMBRO'];
		$scope.modeloReset();
		$scope.displayReset();
		uri='/rest/ful/adminsdc/index.php/comision/'+$routeParams['id'];
		$http
			.get(uri)
			.error(()=>{console.log(uri+' : No Data')})
			.success((json)=>{if(json.result)$scope.modelo.comision=json.rows;});
		uri='/rest/ful/adminsdc/index.php/comision/'+$routeParams['id']+'/autoridades';
		$http
			.get(uri)
			.error(()=>{console.log(uri+' : No Data')})
			.success((json)=>{if(json.result)$scope.lista=json.rows;})
		uri='/rest/ful/adminsdc/index.php/diputados';
		$http
			.get(uri)
			.error(()=>{console.log(uri+' : No Data');})
			.success((json)=>{if(json.result) $scope.diputados=json.rows;})
		$scope.formularios.listar.display=true;
	};

	$scope.modeloReset = ()=>{
		$scope.modelo = {
			id:null,
			comision_id:$routeParams['id'],
			diputado_id:null,
			autoridad:null,
			competencias:null,
			orden:null,
			estado:'INACTIVO'
		};
	};

	$scope.displayReset = ()=>{
		$scope.formularios.nuevo.display=false;
		$scope.formularios.listar.display=false;
	};

	$scope.formularios={
		nuevo:{
			display:false,
			cancelar:()=>{$scope.displayReset();$scope.formularios.listar.display=true;},
			aceptar:()=>{
				uri='/rest/ful/adminsdc/index.php/comision/autoridad';
				$http
					.post(uri,$scope.modelo)
					.error(()=>{uri+' : No Data'})
					.success((json)=>{if(json.result){
						$scope.displayReset();
						$scope.modeloReset();
						$scope.lista.push(json.rows);
						$scope.formularios.listar.display=true;
					}});
			}
		},
		listar:{
			display:false,
			volver:()=>{$location.path('/comisiones');},
			activar:(k)=>{
				if(confirm('¿Esta seguro que desea activar/inactivar este registro?')){
					id=$scope.lista[k].id;
					estado=$scope.lista[k].estado;
					uri='/rest/ful/adminsdc/index.php/comision/'+$routeParams['id']+'/autoridad/'+id+'/'+estado;
					$http
						.put(uri)
						.error(()=>{console.log(uri+' : No Data')})
						.success((json)=>{if(json.result)$scope.lista[k].estado=json.rows;})
				}
			},
			eliminar:(k)=>{
				if(confirm('¿Esta seguro de que desea eliminar este regisro?')){
					id=$scope.lista[k].id;
					uri='/rest/ful/adminsdc/index.php/comision/'+$routeParams['id']+'/autoridad/'+id;
					$http
						.delete(uri)
						.error(()=>{console.log(uri+' : No Data');})
						.success((json)=>{if(json.result)$scope.lista.splice(k,1);});
				}
			},
			nuevo:()=>{
				$scope.displayReset();
				$scope.modeloReset();
				$scope.formularios.nuevo.display=true;
			}
		}
	};

	$session.autorize(()=>{$scope.init();});	

});