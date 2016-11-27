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
		id:'id',
		tipo:'tipo',
		titulo:'titulo',
		actividad:'actividad',
		requisitos:'requisitos',
		estado:'estado',
		fecha:'2016-10-02 11:30:15',
		archivos:[
			{id:1,archivo:'actividad1.jpg',tipo:'image/jpg'},
			{id:2,archivo:'actividad1.jpg',tipo:'image/jpg'},
			{id:3,archivo:'actividad1.jpg',tipo:'image/jpg'}
		],
		archivo:''
	};

	$scope.lista = [
		{id:'1',titulo:'Hoy en un lugar 1',fecha:'21-12-1975 11:11:11',requisitos:'Traer invitacion 1',estado:'ACTIVO'},
		{id:'2',titulo:'Hoy en un lugar 2',fecha:'21-12-1975 11:11:11',requisitos:'Traer invitacion 2',estado:'INACTIVO'},
		{id:'3',titulo:'Hoy en un lugar 3',fecha:'21-12-1975 11:11:11',requisitos:'Traer invitacion 3',estado:'INACTIVO'}
	];

	// Estructura de control de la presentacion.
	$scope.statusbar = {
		display:false,
		progress:'70'
	};

	$scope.dialogs = {
		autorizarModificar:{
			display:false,
			no:()=>{
				$scope.displayFalse();
				$scope.forms.actividadListar.display=true;
			},
			si:()=>{
				$scope.displayFalse();
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
				$scope.dialogs.autorizarSubirArchivo.display=false;
			},
			si:()=>{
				$scope.dialogs.autorizarSubirArchivo.display=false;
			}
		},
		autorizarEliminarArchivo:{
			display:false,
			no:()=>{
				$scope.dialogs.autorizarEliminarArchivo.display=false;
			},
			si:()=>{
				$scope.dialogs.autorizarEliminarArchivo.display=false;
			}
		}
	};

	$scope.forms  = {
		actividadNuevo:{
			display:false,
			cancelar:()=>{
				$scope.displayFalse();
				$scope.forms.actividadListar.display=true;
			},
			aceptar:()=>{
				$scope.displayFalse();
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
		actividadModificar:{
			display:false,
			cancelar:()=>{
				$scope.displayFalse();
				$scope.forms.actividadListar.display=true;
			},
			aceptar:()=>{
				$scope.displayFalse();
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
				$scope.displayFalse();
				$scope.forms.actividadNuevo.display=true;
			},
			visualizarActividad:(id)=>{
				$scope.modelo.id=id;
				$scope.displayFalse();
				$scope.forms.actividadVisualizar.display=true;
			},
			modificarActividad:(id)=>{
				$scope.modelo.id=id;
				$scope.displayFalse();
				$scope.dialogs.autorizarModificar.display=true;
			},
			activarActividad:(id)=>{
				$scope.modelo.id=id;
				$scope.displayFalse();
				$scope.dialogs.autorizarActivar.display=true;
			},
			eliminarActividad:(id)=>{
				$scope.modelo.id=id;
				$scope.displayFalse();
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
		$scope.forms.actividadListar.display=true;
	};

	$session.autorize(()=>{
		$scope.init();
	});	

});