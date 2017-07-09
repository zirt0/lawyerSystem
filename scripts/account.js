app.controller('accountCtrl',function($scope, $rootScope, $http, $routeParams){

	$rootScope.pageData.header = "Account";
	$rootScope.pageData.subtitle = "Account details";
	$rootScope.pageData.breadcrumps = ["Account"];

	$scope.args = {}
	$scope.args.user_id = $rootScope.userDetail.id;
	$scope.args.order_decl = "DESC";
	console.log("THIS IS THE USERDETAIL");
	console.log($rootScope.userDetail.id);

	if($routeParams.id != 'notifications'){
		console.log("THERE IS A USER ID" + $routeParams.id);
		if($rootScope.userDetail.userRole === "admin"){
			console.log("USER IS ADMIN");
			$scope.args.user_id = $routeParams.id;
		}	
	}
	
	$scope.args.readed = true;
	console.log($scope.args);
	
	$http.post("server/read.php",{'subject': "users", 'args': $scope.args})
	.success(function (response) {
		$scope.userDetails = response.records[0];
		console.log($scope.userDetails);

	});

	$http.post("server/read.php",{'subject': "cases", 'args': $scope.args})
	.success(function (response) {
		$scope.customerCases = response.records;
		console.log($scope.customerCases);
	});

	$http.post("server/read.php",{'subject': "declarations", 'decl': $scope.args})
	.success(function (response) {
		console.log("declaration_items")
		console.log(response)
		$scope.declaration_items = response.records
		console.log("END declaration_items")

	});

	$rootScope.get_option('declaration_items').success(function (response) {
		$scope.args.groupBy = 1;
		$scope.args.order_decl = false;
		console.log("getoption");
		console.log($scope.args);
		$http.post("server/read.php",{'subject': "declarations", 'decl': $scope.args})
		.success(function (response) {
			console.log(response)
			$scope.declaration_items.case_sorted = response.records
		});


	});
	
	///get readed notes
	$scope.getNotes = function(){

		//$scope.args.readed = 1; 
		$http.post("server/read.php",{'subject': "notes", 'args': $scope.args})
		.success(function (response) {
			console.log(response)
			$scope.notes = response.records
		});

	}

	$scope.markasRead = function(id, x){
		console.log(id + " " + x);
		$scope.notes.splice(x,1)

		$http.post("server/update.php",{'subject': "mark_as_read", 'id': id})
		.success(function (response) {
			console.log(response);
			$rootScope.getNotification();

		});

	}

	$scope.$watch('args.readed', function() {
        console.log('hey, myVar has changed!' + $scope.args.readed);
        $scope.getNotes();
    });


	
})