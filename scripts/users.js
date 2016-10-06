app.controller('usersCtrl', function($rootScope, $scope, $http, $location, md5	) {
	$rootScope.pageData.header = "Gebruikers";
	$rootScope.pageData.subtitle = "Overzicht";
	$rootScope.pageData.breadcrumps = ["Gebruikers"];

	$scope.passwordChange = false;
	$scope.password = {};
	$scope.addUser = {};

	$scope.showPasswordModal = function(userid){

		$scope.password.user_id = userid;
		$scope.passwordChange = true;

	};
	$scope.closePasswordModal = function(userid){
		
		$scope.passwordChange = false;
		$scope.password.firstPass = "";
		$scope.password.secondPass = "";

	};

	$scope.closeUserModal = function(userid){
		
		$scope.addUser.modal = false;
		$scope.addUser.username = "";
		$scope.addUser.fname = "";
		$scope.addUser.lname = "";
		$scope.addUser.hourrate = "";
		$scope.addUser.firstPass = "";
		$scope.addUser.secondPass = "";

	};

	$scope.savePassword = function(){


		if(!$scope.password.firstPass){
			 console.log("FirstPassword is wrong");
			 $scope.password.firstPasswordError = "red";
		}else{
			$scope.password.firstPasswordError = "";
		}

		if(!$scope.password.secondPass){
			console.log("SecondPassword is wrong");
			$scope.password.secondPasswordError = "red";
		}
		else{
			$scope.password.secondPasswordError = "";
		}			

		if($scope.password.firstPass === $scope.password.secondPass){
			
			

			$scope.password.passwordmd5 = md5.createHash($scope.password.firstPass || '')

			console.log("They Are the same, make md5 " + $scope.password.passwordmd5 + " " + $scope.password.user_id	);
			$http.post("server/update.php",{'subject': "users_change_password", "args": $scope.password })
			.success(function (response) {

				$rootScope.succesModalBox(true, "Wachtwoord is succesvol gewijzigd", "/users/")

				//$rootScope.gebruikers = response.records;
				console.log(response);
				
			});	
		}

		console.log("savePassword");
	}

	$scope.showUserModal = function(){
		$scope.addUser.modal = true;
	}

	$scope.saveNewUser = function() {

		
		//username
		if(!$scope.addUser.username){
			 console.log("username is wrong");
			 $scope.addUser.usernameError = "red";
		}else{
			$scope.addUser.usernameError = "";
		}

		//fname
		if(!$scope.addUser.fname){
			 console.log("fname is wrong");
			 $scope.addUser.fnameError = "red";
		}else{
			$scope.addUser.fnameError = "";
		}

		//lname
		if(!$scope.addUser.fname){
			 console.log("lname is wrong");
			 $scope.addUser.lnameError = "red";
		}else{
			$scope.addUser.lnameError = "";
		}

		//hourrate
		if(!$scope.addUser.hourrate){
			 console.log("lname is wrong");
			 $scope.addUser.hourrateError = "red";
		}else{
			$scope.addUser.hourrateError = "";
		}

		if(!$scope.addUser.firstPassword){
			 console.log("lname is wrong");
			 $scope.addUser.firstPasswordError = "red";
		}else{
			$scope.addUser.firstPasswordError = "";
		}

		if(!$scope.addUser.secondPassword){
			 console.log("lname is wrong");
			 $scope.addUser.secondPasswordError = "red";
		}else{
			$scope.addUser.secondPasswordError = "";
		}

		if($scope.addUser.firstPassword != $scope.addUser.secondPassword){
			alert("Wachtwoorden zijn niet hetzelfde")
			$scope.addUser.firstPasswordError = "red";
			$scope.addUser.secondPasswordError = "red";

		}

		//check if alle fields are filled and password are the same
		if($scope.addUser.username && $scope.addUser.fname && $scope.addUser.lname && $scope.addUser.hourrate && $scope.addUser.firstPassword && $scope.addUser.secondPassword ){
			//alert("everything is check");

			if($scope.addUser.firstPassword != $scope.addUser.secondPassword){
				alert("Wachtwoorden zijn niet hetzelfde")
				$scope.addUser.firstPasswordError = "red";
				$scope.addUser.secondPasswordError = "red";

			}else{

				$scope.addUser.passwordmd5 = md5.createHash($scope.addUser.firstPassword || '')

				console.log("They Are the same, make md5 " + $scope.addUser.passwordmd5);
				console.log($scope.addUser);
				$http.post("server/insert.php",{'subject': "add_new_user", "args": $scope.addUser })
				.success(function (response) {

					$rootScope.succesModalBox(false, "Nieuwe gebruiker is Succesvol toegevoegd"	)

					//$rootScope.gebruikers = response.records;
					console.log(response);
					$scope.closeUserModal();
					$rootScope.getUser();

					
				});


			}
		}
	}

	$rootScope.getUser = function(){

		$http.post("server/read.php",{'subject': "users"})
		.success(function (response) {

			$rootScope.gebruikers = response.records;
			console.log($rootScope.gebruikers);
			
		});	
	}


	$rootScope.getUser();

	$scope.removeUser = function (userid){

		console.log(userid)

		var r = confirm("Weet u zeker dat u wilt verwijderen?");
		    if (r == true) {
		    	$http.post("server/remove.php",{'subject': "remove_user", 'id': userid })
		   		.success(function (response) {
		   			console.log(response);
		   			$rootScope.getUser();
		   			$rootScope.succesModalBox(true, "Gebruiker is succesvol verwijderd", "")
				});
		    }
	}

	$scope.changeUserPassword = function(userid){
		console.log(userid)
	}
   
});