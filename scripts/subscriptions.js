app.controller('subscriptionsCtrl',function($scope, $rootScope, $http){
	$rootScope.pageData.header = "Abonnementen";
	$rootScope.pageData.subtitle = "Overzicht";
	$rootScope.pageData.breadcrumps = ["Abonnementen"];

	$http.post("server/read.php",{'subject': "subscription", 'args': $scope.args})
	.success(function (response) {
		console.log(response)
		$scope.subscriptions = response.records
	});

});