//creditsCtrl
app.controller('userDetailsCtrl',function($scope, $rootScope, $http, $routeParams){
	$rootScope.pageData.header = "Gebruiker";
	$rootScope.pageData.subtitle = "Overzicht";
	$rootScope.pageData.breadcrumps = ["Gebruiker"];
	console.log("userDetailsCtrl");
	$scope.systemUserDetail = {};

	

	if($routeParams.id === 'you'){
		//$rootScope.userDetail.id

		console.log("Its me and i am no admin ");
		var user_id = $rootScope.userDetail.id;
	
	}else if ($routeParams.id != $rootScope.userDetail.id && $rootScope.userDetail.userRole != 'admin'){

		var user_id = $rootScope.userDetail.id;
		console.log("Its me and i am NOT ADMIN ");
	
	}else if ($routeParams.id != $rootScope.userDetail.id && $rootScope.userDetail.userRole === 'admin'){

		console.log("Its me and i am THE ADMIN ");

		var user_id = $routeParams.id;

	}else{

		var user_id = $rootScope.userDetail.id;
	}

	$scope.systemUserDetail.user_id = user_id;

	$http.post("server/read.php",{'subject': "users", 'args': $scope.systemUserDetail})
	.success(function (response) {
		$scope.systemUserDetail.user_fname = response.records[0]['fname'];
		$scope.systemUserDetail.user_lname = response.records[0]['lname'];
		$scope.systemUserDetail.user_role = response.records[0]['role'];

		//console.log($scope.userDetails);

	});


	$scope.start_date = moment().subtract(30, 'day');
	$scope.end_date = moment();

	
	//$scope.data_time = [];
	//$scope.data_amount = [];
	$scope.total_time = [];
	$scope.total_amount = [];

	$scope.submitDate = function(){

		$scope.systemUserDetail.start_date = $scope.start_date.format('YYYY-MM-DD');
		$scope.systemUserDetail.end_date = $scope.end_date.format('YYYY-MM-DD');
		$scope.getUserDeclarationDetails();
	}

	$scope.getUserDeclarationDetails = function(){
		$http.post("server/read.php",{'subject': "user_declarations_details", 'args': $scope.systemUserDetail})
		.success(function (response) {
			console.log(response)
			$scope.systemUserDetail.array = response.records;
			console.log($scope.systemUserDetail);

		});

		$http.post("server/read.php",{'subject': "user_declarations_details_for_chart", 'args': $scope.systemUserDetail})
		.success(function (response) {
			console.log(response)
			$scope.systemUserDetail.chartdetails = response.records;
			
			$scope.data_time = [];
			$scope.data_amount = [];
			$scope.labels = [];
			for(x in $scope.systemUserDetail.chartdetails){
				$scope.labels.push($scope.systemUserDetail.chartdetails[x]['DATE']);
				$scope.total_time.push($scope.systemUserDetail.chartdetails[x]['total_time']);
				
				$scope.total_amount.push($scope.systemUserDetail.chartdetails[x]['total_amount']);
			}
			$scope.data_time.push($scope.total_time);
			$scope.data_amount.push($scope.total_amount);
			console.log($scope.data);
		});
	}


	$scope.throwBack = function(days){
		$scope.start_date = moment().subtract(days, 'day');
	}

	$scope.getUserDeclarationDetails();
	

  $scope.series_time = ['Tijd in minuten'];
  $scope.series_amount = ['€'];
  $scope.colors = ["rgba(139,195,74,1)"];
 
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
  $scope.options_time = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }
      ]
    }
  };
  $scope.options_amount = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        }
      ]
    }
  };

})