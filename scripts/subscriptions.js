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

//:id

app.controller('subscriptionsDetailsCtrl',function($scope, $rootScope, $http, $routeParams){
	$rootScope.pageData.header = "Abonnement";
	$rootScope.pageData.subtitle = "Geschiedenis";
	$rootScope.pageData.breadcrumps = ["Abonnement","Geschiedenis"];

	$scope.args = {};
	$scope.args.subscription_id = "" + $routeParams.id + "";
	console.log($scope.args.subscription_id);

	$http.post("server/read.php",{'subject': "subscription", 'args': $scope.args})
	.success(function (response) {
		console.log(response)
		$scope.subscriptions = response.records
	});

	$http.post("server/read.php",{'subject': "subscription_history", 'args': $scope.args})
	.success(function (response) {
		
		$scope.subscriptions.declarations = response.records
		console.log($scope.subscriptions.declarations);
	});



});