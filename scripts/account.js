app.controller('accountCtrl',function($scope, $rootScope, $http){

	$rootScope.pageData.header = "Account";
	$rootScope.pageData.subtitle = "Account details";
	$rootScope.pageData.breadcrumps = ["Account"];

	$scope.args = {}
	$scope.args.user_id = $rootScope.userDetail.id;
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
		console.log(response)
		$scope.declaration_items = response.records
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