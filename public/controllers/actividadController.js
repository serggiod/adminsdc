angular
.module('legapp')
.controller('actividadController',function($scope,$rootScope,$http,$session){
	
	$scope.routes = {
		get:{
			actividades:'/rest/ful/adminadd/index.php/actividades',
			archivos:'/rest/ful/adminadd/index.php/archivos',
			actividad:'/rest/ful/adminadd/index.php/actividad/'
		},
		post:{
			actividad:'/rest/ful/adminadd/index.php/actividad',
			archivo:'/rest/ful/adminadd/index.php/archivo'
		},
		put:{
			actividad:'/rest/ful/adminadd/index.php/actividad/'
		},
		delete:{
			actividad:'/rest/ful/adminadd/index.php/actividad/',
			archivo:'/rest/ful/adminadd/index.php/archivo/'
		}
	};

	$scope.modelo = {
		key:'',
		id:'',
		tipo:'',
		titulo:'',
		actividad:'',
		requisitos:'',
		estado:'',
		fecha:'',
		archivos:[]
	};

	$scope.lista = [];

	// Estructura de control de la presentacion.
	$scope.statusbar = {
		display:false,
		progress:'70'
	};

	$scope.dialogs = {
		autorizarModificar:{
			display:false,
			no:()=>{
				$scope.modelo.key=null;
				$scope.modelo.id=null;
				$scope.displayFalse();
				$scope.forms.actividadListar.display=true;
			},
			si:()=>{
				$scope.displayFalse();
				/*
				$http
					.get($scope.routes.get.actividad+$scope.modelo.id)
					.error(()=>{console.log($scope.routes.get.actividad+$scope.modelo.id+' : No Data');})
					.success((json)=>{if(json.result){
						$scope.modelo.tipo=json.rows.tipo;
						$scope.modelo.titulo=json.rows.titulo;
						$scope.modelo.actividad=json.rows.actividad;
						$scope.modelo.requisitos=json.rows.requisitos;
						$scope.modelo.estado=json.rows.estado;
						$scope.modelo.fecha=json.rows.fecha;
						$scope.modelo.archivos=json.rows.archivos;
						$scope.forms.actividadModificar.display=true;
					}});
				*/
				$scope.forms.actividadModificar.display=true;
			}
		},
		autorizarActivar:{
			display:false,
			no:()=>{
				$scope.displayFalse();
				$scope.forms.actividadListar.display=true;
			},
			si:()=>{
				$scope.displayFalse();
				$scope.forms.actividadListar.display=true;
			}
		},
		autorizarEliminar:{
			display:false,
			no:()=>{
				$scope.displayFalse();
				$scope.forms.actividadListar.display=true;
			},
			si:()=>{
				$scope.displayFalse();
				$scope.forms.actividadListar.display=true;
			}
		},
		autorizarSubirArchivo:{
			display:false,
			no:()=>{
				if($scope.dialogs.autorizarSubirArchivo.tmp) delete $scope.dialogs.autorizarSubirArchivo.tmp;
				if($scope.dialogs.autorizarSubirArchivo.input) $scope.dialogs.autorizarSubirArchivo.input.value='';
				$scope.dialogs.autorizarSubirArchivo.display=false;
			},
			si:()=>{
				if($scope.dialogs.autorizarSubirArchivo.input && $scope.dialogs.autorizarSubirArchivo.tmp){
					for(i in $scope.dialogs.autorizarSubirArchivo.tmp){
						$scope.modelo.archivos.push($scope.dialogs.autorizarSubirArchivo.tmp[i]);
					}
					$scope.dialogs.autorizarSubirArchivo.input.value='';
					delete $scope.dialogs.autorizarSubirArchivo.tmp;
				}
				$scope.dialogs.autorizarSubirArchivo.display=false;
			},
			onchange:(input)=>{
				$scope.dialogs.autorizarSubirArchivo.input = input;
				$scope.dialogs.autorizarSubirArchivo.tmp = [];
				for(i in input.files){
					if(input.files[i].type.toString().substring(0,5)==='image'){
						reader = new FileReader();
						reader.readAsDataURL(input.files[i]);	
						reader.onload = (img)=>{
							archivo = img.target.result.toString(); 
							x = archivo.indexOf(';');
							tipo = img.target.result.substring(5,x);
							archivo = {
								id:null,
								archivo:archivo,
								tipo:tipo,
								resource:'local'
							};
							$scope.dialogs.autorizarSubirArchivo.tmp.push(archivo);
						};
					}
				}
			},
		},
		autorizarEliminarArchivo:{
			id:null,
			display:false,
			no:()=>{
				$scope.dialogs.autorizarEliminarArchivo.id=null;
				$scope.dialogs.autorizarEliminarArchivo.display=false;
			},
			si:()=>{
				index = $scope.dialogs.autorizarEliminarArchivo.id;
				console.log($scope.modelo.archivos[index].id,$scope.modelo.archivos[index].resource);
				if($scope.modelo.archivos[index].id===null && $scope.modelo.archivos[index].resource==='local'){
					$scope.modelo.archivos.splice(index,1);
				}
				if($scope.modelo.archivos[index].resurce=='remote'){
					id = $scope.modelo.archivos[index].id;
					alert('Implementar con el modelo de datos rest.');
					/*
					$http
						.delete($scope.routes.delete.archivo+id)
						.error(()=>{console.log($scope.routes.delete.archivo+id+' : No Data');})
						.success((json)=>{if(json.result){
							$scope.modelo.archivos.splice(index,1);
							$scope.dialogs.autorizarEliminarArchivo.display=false;
						}});
					*/
				}
				$scope.dialogs.autorizarEliminarArchivo.display=false;
			}
		}
	};

	$scope.forms  = {
		actividadNuevo:{
			display:false,
			cancelar:()=>{
				$scope.modelo.key=null;
				$scope.modelo.id=null;
				$scope.displayFalse();
				$scope.forms.actividadListar.display=true;
			},
			aceptar:()=>{
				$scope.displayFalse();
				alert('Implementar con el modelo de datos.');
				/*
				$http
					.post($scope.routes.post.actividad,$scope.modelo)
					.error(()=>{console.log($scope.routes.post.actividad+' : No Data');})
					.success((json)=>{if(json.result){
						$scope.lista.push({
							id:json.rows.id,
							titulo:$scope.modelo.titulo,
							fecha:$scope.modelo.fecha,
							requisitos:$scope.modelo.requisitos,
							estado:'INACTIVO'
						});
					}});
				*/
				$scope.forms.actividadListar.display=true;
			},
			subirArchivos:()=>{
				$scope.dialogs.autorizarSubirArchivo.display=true;
			},
			eliminarArchivos:(id)=>{
				$scope.dialogs.autorizarEliminarArchivo.id=id;
				$scope.dialogs.autorizarEliminarArchivo.display=true;
			}
		},
		actividadModificar:{
			display:false,
			cancelar:()=>{
				$scope.modelo.id=null;
				$scope.displayFalse();
				$scope.forms.actividadListar.display=true;
			},
			aceptar:()=>{
				$scope.displayFalse();
				/*
				$http
					.put($scope.routes.put.actividad+$scope.modelo.id)
					.error(()=>{console.log($scope.routes.put.actividad+$scope.modelo.id+' : No Data');})
					.success((json)=>{if(json.result){
						$scop.lista.splice($scope.modelo.key,1);
						$scope.lista.push({
							id:$scope.modelo.id,
							titulo:$scope.modelo.titulo,
							fecha:$scope.modelo.fecha,
							requisitos:$scope.modelo.requisitos,
							estado:$scope.modelo.estado
						});

					}});
				*/
				$scope.forms.actividadListar.display=true;
			},
			subirArchivos:()=>{
				$scope.dialogs.autorizarSubirArchivo.display=true;
			},
			eliminarArchivos:(id)=>{
				$scope.modelo.archivo=id;
				$scope.dialogs.autorizarEliminarArchivo.display=true;
			}
		},
		actividadVisualizar:{
			display:false,
			aceptar:()=>{
				$scope.displayFalse();
				$scope.forms.actividadListar.display=true;
			},
		
		},
		actividadListar:{
			display:false,
			nuevaActividad:()=>{
				d = new Date();
				$scope.displayFalse();
				$scope.modelo.id='';
				$scope.modelo.tipo='';
				$scope.modelo.titulo='';
				$scope.modelo.actividad='';
				$scope.modelo.requisitos='';
				$scope.modelo.estado='';
				$scope.modelo.fecha='';
				$scope.modelo.fecha += d.getFullYear().toString()+'-';
				$scope.modelo.fecha += (d.getMonth() +1).toString()+'-';
				$scope.modelo.fecha += d.getDate().toString()+' ';
				$scope.modelo.fecha += d.getHours().toString()+':';
				$scope.modelo.fecha += d.getMinutes().toString()+':';
				$scope.modelo.fecha += d.getSeconds().toString();
				$scope.modelo.archivos=[];
				$scope.forms.actividadNuevo.display=true;
			},
			visualizarActividad:(k)=>{
				id = $scope.lista[k].id;
				$scope.displayFalse();
				/*
				$http
					.get($scope.routes.get.actividad+id)
					.error(()=>{console.log($scope.routes.get.actividad+id+' : No Data');})
					.success((json)=>{if(json.result){
						$scope.modelo.id=json.rows.id=;
						$scope.modelo.tipo=json.rows.tipo;
						$scope.modelo.titulo=json.rows.titulo;
						$scope.modelo.actividad=json.rows.actividad;
						$scope.modelo.requisitos=json.rows.requisitos;
						$scope.modelo.estado=json.rows.estado;
						$scope.modelo.fecha=json.rows.fecha;
						$scope.modelo.archivos=json.rows.fecha.archivos;
						$scope.forms.actividadVisualizar.display=true;
					}});
				*/
				$scope.forms.actividadVisualizar.display=true;
			},
			modificarActividad:(k)=>{
				$scope.modelo.key=k;
				$scope.modelo.id=$scope.lista[k].id;
				$scope.displayFalse();
				$scope.dialogs.autorizarModificar.display=true;
			},
			activarActividad:(k)=>{
				$scope.modelo.key=k;
				$scope.modelo.id=$scope.lista[k].id
				$scope.displayFalse();
				/*
				uri $scope.rutes.put.actividad+$scope.modelo.id+'/activar';
				$http
					.put(uri)
					.error(()=>{console.log(uri+' : No Data'));})
					.success((json)=>{if(json.result){
						$scope.lista[$scope.modelo.key].estado=json.rows;
						$scope.modelo.key=null;
						$scope.modelo.id=null;ss
					}});
				*/
				$scope.dialogs.autorizarActivar.display=true;
			},
			eliminarActividad:(k)=>{
				$scope.modelo.key=k;
				$scope.modelo.id=$scope.lista[k].id
				$scope.displayFalse();
				/*
				uri = $scope.routes.delete.actividad+$scope.modelo.id;
				$http
					.delete(uri)
					.error(()=>{console.log(uri+' : No Data')})
					.success((json)=>{if(json.result){
						$scope.lista.splice($scope.modelo.key,1);
						$scope.modelo.key=null;
						$scope.modelo.id=null;
						$scope.dialogs.autorizarEliminar.display=true;
					}});
				*/
				$scope.dialogs.autorizarEliminar.display=true;
			}
		},
	};

	$scope.displayFalse = ()=>{
		$scope.statusbar.display=false;
		$scope.dialogs.autorizarModificar.display=false;
		$scope.dialogs.autorizarActivar.display=false;
		$scope.dialogs.autorizarEliminar.display=false;
		$scope.dialogs.autorizarSubirArchivo.display=false,
		$scope.dialogs.autorizarEliminarArchivo.display=false;
		$scope.forms.actividadNuevo.display=false;
		$scope.forms.actividadModificar.display=false;
		$scope.forms.actividadVisualizar.display=false;
		$scope.forms.actividadListar.display=false;
	};

	$scope.init = ()=>{
		data = $session.get('user');
		$scope.user = JSON.parse(data);
		$rootScope.usuario = $scope.user.usuario;
		$rootScope.stage=true;
		$scope.displayFalse();
		uri = $scope.routes.get.actividades;
		$http
			.get(uri)
			.error(()=>{console.log(uri+' : No Data');})
			.success((json)=>{if(json.result){
				$scope.lista=json.rows;
				$scope.forms.actividadListar.display=true;
			}});
	};

	$session.autorize(()=>{
		$scope.init();
	});	

});