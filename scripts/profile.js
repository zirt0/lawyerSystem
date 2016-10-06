app.controller('profileCtrl',function($scope, $rootScope, $http, md5){

	$rootScope.pageData.header = "Profiel";
	$rootScope.pageData.subtitle = "Overzicht";
	$rootScope.pageData.breadcrumps = ["Profiel"];

	$scope.editProfileDetails = true;

	var args = {};
	args.user_id = $rootScope.userDetail.id;
	console.log(args.user_id);

	$http.post("server/read.php",{'subject': "users", 'args': args})
	.success(function (response) {
		$scope.userDetails = response.records[0];
		console.log($scope.userDetails);

	});

	$scope.editProfile = function(){
		//console.log("edit");
		$scope.editProfileDetails = false;

	}

	$scope.cancelProfile = function(){
		//console.log("cancel");
		$scope.editProfileDetails = true;
		
	}

	$scope.saveProfile = function(){
		//console.log("save");
		$http.post("server/update.php",{'subject': "users_edit", 'args': $scope.userDetails})
		.success(function (response) {
			console.log(response);
			$scope.editProfileDetails = true;
			$rootScope.succesModalBox("true", "Uw profiel is succesvol bijgewerkt");
		});
		
	}

	//password
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

	
})