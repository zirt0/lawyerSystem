    app.controller('loginCtrl', function($scope, $http, $rootScope, $location, $cookies, md5){
		
		$scope.login = {};
		$scope.loginError = {};
		
		console.log($cookies.get('loggedIn'));		

		//submit the code 
		$scope.submitLogin = function(){
			
			if(!$scope.login.username && !$scope.login.password ){
				console.log("Gebruikersnaam en wachtwoord zijn leeg");
				$scope.loginError.username = "red"
				$scope.loginError.password = "red"
				$scope.loginError.notification = true;
				$scope.loginError.notificationText = "<strong>Gebruikersnaam en Wachtwoord</strong> zijn leeg";

				return false;
			}


			if(!$scope.login.username ){
				console.log("Gebruikersnaam is leeg");
				$scope.loginError.username = "red"
				$scope.loginError.notification = true;
				$scope.loginError.notificationText = "<strong>Gebruikersnaam</strong> is leeg";
				return false;
			}


			if(!$scope.login.password ){
				console.log("Wachtwoord is leeg");
				$scope.loginError.pasword = "red"
				$scope.loginError.notification = true;
				$scope.loginError.notificationText = "<strong>Wachtwoord</strong> is leeg";
				return false;
			}


			//make password md5
			$scope.login.password = md5.createHash($scope.login.password || '');

			$http.post("server/read.php",{'subject': "login", 'args': $scope.login })
	        	.success(function (response) {

		   			console.log(response);
		   			if(response == false){
		   				$rootScope.loggedIn = false;
		   				$scope.login.password = "";
		   				$scope.loginError.notification = true;
						$scope.loginError.notificationText = "<strong>Gebruikersnaam of wachtwoord</strong> is incorrect";
		   				console.log("Wachtwoord of loginnaam incorrect");
		   				//console.log($rootScope.loggedIn);
		   				
		   			}else{

		   				$rootScope.loggedIn = true;
		   				$rootScope.userDetailsFnc(response);

		   				$cookies.put('loggedIn', 'true');
		   				$cookies.put('username', response["username"]);
		   				$cookies.put('password', response["password"]);
		   				
		   				$location.path( "/dashboard" );
						console.log($rootScope.userRole);
		   				
		   			}

		   	});

		}
	});