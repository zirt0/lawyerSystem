//creditsCtrl
app.controller('userDetailsCtrl',function($scope, $rootScope, $http, $routeParams){
	$rootScope.pageData.header = "Gebruiker";
	$rootScope.pageData.subtitle = "Overzicht";
	$rootScope.pageData.breadcrumps = ["Gebruiker"];
	console.log("userDetailsCtrl");
	$scope.systemUserDetail = {};
	$scope.systemUserDetail.user_id = $routeParams.id;

	$scope.getUserDeclarationDetails = function(){
		$http.post("server/read.php",{'subject': "user_declarations_details", 'args': $scope.systemUserDetail})
		.success(function (response) {
			console.log(response)
			$scope.systemUserDetail.array = response.records;
			console.log($scope.systemUserDetail);

		});
	}

	$scope.getUserDeclarationDetails();


	$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Series A', 'Series B'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
  $scope.options = {
    scales: {
      yAxes: [
        {
          id: 'y-axis-1',
          type: 'linear',
          display: true,
          position: 'left'
        },
        {
          id: 'y-axis-2',
          type: 'linear',
          display: true,
          position: 'right'
        }
      ]
    }
  };

})