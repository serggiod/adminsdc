angular
		.module('adminadd')
		.controller('loginController',function($scope,$rootScope,$http,$alert,$location,md5){

			$scope.login = ()=>{

				if($scope.usuario===undefined || $scope.password===undefined){
					alert = $alert({
						title:'¡Error!',
						content:'Los campos usuario y password son obligatorios.',
						type:'danger',
						container:'div.alerts',
						show:true
					});
				}

				else {
					usuario  = $scope.usuario;
					password = md5.createHash($scope.password);

					$http
						.post('models/login.php/'+usuario+'/'+password)
						.success((json)=>{
							if(json.result){
								$location.path('/actividad')
								$rootScope.btnLogout = true;
							}
						})
						.error(()=>{
							alert = $alert({
								title:'¡Error!',
								content:'Error en el servidor.',
								type:'danger',
								container:'div.alerts',
								show:true
							});
						});

				}

			}
		});