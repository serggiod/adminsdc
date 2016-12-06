angular 
.module('legapp')
.controller('comisionesController',function($scope,$rootScope,$http,$session,$alert,$location){
	
	$scope.init = ()=>{
		$rootScope.stage=true;
		$rootScope.usuario=JSON.parse($session.get('user')).usuario;
		uri = '/rest/ful/adminsdc/index.php/comisiones';
		$http
			.get(uri)
			.error(()=>{console.log(uri+' : No Data');})
			.success((json)=>{if(json.result) $scope.modelo=json.rows;});
		uri = '/rest/ful/adminsdc/index.php/departamentos';
		$http
			.get(uri)
			.error(()=>{console.log(uri+' : No Data')})
			.success((json)=>{if(json.rows) $scope.departamentos=json.rows;});
		uri = '/rest/ful/adminsdc/index.php/tipos';
		$http
			.get(uri)
			.error(()=>{console.log(uri+' : No Data')})
			.success((json)=>{if(json.rows) $scope.tipos=json.rows;});
		$scope.formularios.listar.display=true;
	};

	$scope.comision={};

	$scope.displayReset=()=>{
		$scope.formularios.ingresar.display=false;
		$scope.formularios.visualizar.display=false;
		$scope.formularios.modificar.display=false;
		$scope.formularios.listar.display=false;
	};

	$scope.comisionReset = ()=>{
		$scope.comision = {
			key:'',
			id:'',
			id_dpto:'',
			nombre:'',
			tipo_id:'',
			competencias:'',
			estado:'INACTIVO',
			departamento:'',
			tipo:''
		};
	};

	$scope.formularios = {
		ingresar:{
			display:false,
			cancelar:()=>{
				$scope.displayReset();
				$scope.comisionReset();
				$scope.formularios.listar.display=true;
			},
			aceptar:()=>{
				if($scope.comision.departamento=='' || $scope.comision.tipo=='') alert('Los campos son obigatorios.');
				else{
					$scope.comision.departamento = JSON.parse($scope.comision.departamento);
					$scope.comision.tipo    = JSON.parse($scope.comision.tipo);
					$scope.comision.id_dpto = $scope.comision.departamento.id_dpto;
					$scope.comision.tipo_id = $scope.comision.tipo.id;
					$scope.comision.nombre  = $scope.comision.departamento.dpto_detalle.toLowerCase().replace(/ /g,'-');
					uri = '/rest/ful/adminsdc/index.php/comision';
					$http
						.post(uri,$scope.comision)
						.error(()=>{console.log(uri+' : No Data');})
						.success((json)=>{if(json.result){
							$scope.comision.id = json.rows;
							$scope.modelo.unshift($scope.comision);
						}});
				}
				$scope.displayReset();
				$scope.formularios.listar.display=true;
			}
		},
		visualizar:{
			display:false,
			aceptar:()=>{
				$scope.displayReset();
				$scope.comisionReset();
				$scope.formularios.listar.display=true;
			}
		},
		modificar:{
			display:false,
			cancelar:()=>{
				$scope.displayReset();
				$scope.comisionReset();
				$scope.formularios.listar.display=true;
			},
			aceptar:()=>{
				$scope.comision.departamento = JSON.parse($scope.comision.departamento);
				$scope.comision.tipo    = JSON.parse($scope.comision.tipo);
				$scope.comision.id_dpto = $scope.comision.departamento.id_dpto;
				$scope.comision.tipo_id = $scope.comision.tipo.id;
				$scope.comision.nombre  = $scope.comision.departamento.dpto_detalle.toLowerCase().replace(/ /g,'-');
				uri = '/rest/ful/adminsdc/index.php/comision/'+$scope.comision.id;
				$http
					.put(uri,$scope.comision)
					.error(()=>{console.log(uri+' : No Data');})
					.success((json)=>{if(json.result){
						$scope.modelo[$scope.modelo.key].nombre=$scope.comision;
						$scope.modelo[$scope.modelo.key].id_dpto=$scope.modelo.id_dpto;
						$scope.modelo[$scope.modelo.key].nombre=$scope.modelo.nombre;
						$scope.modelo[$scope.modelo.key].tipo_id=$scope.modelo.tipo_id;
						$scope.modelo[$scope.modelo.key].competencias=$scope.modelo.competencias;
						$scope.modelo[$scope.modelo.key].estado=$scope.modelo.estado;
						$scope.modelo[$scope.modelo.key].departamento=$scope.modelo.departamento;
						$scope.modelo[$scope.modelo.key].tipo=$scope.modelo.tipo;
						$scope.displayReset();
						$scope.comisionReset();
						$scope.formularios.listar.display=true;
					}});				
			}
		},
		listar:{
			display:false,
			nuevo:()=>{
				$scope.displayReset();
				$scope.formularios.ingresar.display=true;
			},
			eliminar:(k)=>{
				if(confirm('¿Esta seguro que desea eliminar este registro?')){
					uri = '/rest/ful/adminsdc/index.php/comision/'+$scope.modelo[k].id;
					$http
						.delete(uri)
						.error(()=>{console.log(uri+' : No Data');})
						.success((json)=>{if(json.result) $scope.modelo.splice(k,1);});
				}
			},
			activar:(k)=>{
				if(confirm('¿Esta seguro que desea activar/inactivar este registro?')){
					uri = '/rest/ful/adminsdc/index.php/comision/'+$scope.modelo[k].id+'/'+$scope.modelo[k].estado;
					$http
						.put(uri)
						.error(()=>{console.log(uri+' : No Data');})
						.success((json)=>{if(json.result) $scope.modelo[k].estado=json.rows});
				}
			},
			visualizar:(k)=>{
				$scope.comision.key=k;
				$scope.comision.id=$scope.modelo[k].id;
				$scope.comision.id_dpto=$scope.modelo[k].id_dpto;
				$scope.comision.nombre=$scope.modelo[k].nombre;
				$scope.comision.tipo_id=$scope.modelo[k].tipo_id;
				$scope.comision.competencias=$scope.modelo[k].competencias;
				$scope.comision.estado=$scope.modelo[k].estado;
				$scope.comision.departamento=JSON.stringify($scope.modelo[k].departamento);
				$scope.comision.tipo=JSON.stringify($scope.modelo[k].tipo);
				$scope.displayReset();
				$scope.formularios.visualizar.display=true;
			},
			autoridades:(k)=>{
				id = $scope.modelo[k].id;
				$location.path('/comisiones-autoridades/'+id);
			},
			modificar:(k)=>{
				if(confirm('¿Esta seguro que desea modificar este registro?')){
					$scope.comision.key=k;
					$scope.comision.id=$scope.modelo[k].id;
					$scope.comision.id_dpto=$scope.modelo[k].id_dpto;
					$scope.comision.nombre=$scope.modelo[k].nombre;
					$scope.comision.tipo_id=$scope.modelo[k].tipo_id;
					$scope.comision.competencias=$scope.modelo[k].competencias;
					$scope.comision.estado=$scope.modelo[k].estado;
					$scope.comision.departamento=JSON.stringify($scope.modelo[k].departamento);
					$scope.comision.tipo=JSON.stringify($scope.modelo[k].tipo);
					$scope.displayReset();
					$scope.formularios.modificar.display=true;
				}
			}
		}
	};

	$session.autorize(()=>{$scope.init()});		

});