//creditsCtrl
app.controller('creditsCtrl',function($scope, $rootScope, $http){
	$rootScope.pageData.header = "Uitgaves";
	$rootScope.pageData.subtitle = "Overzicht";
	$rootScope.pageData.breadcrumps = ["uitgaves"];
	console.log("creditsCtrl");
	
	$scope.declaration_credits = {};
	$scope.declaration_credits.groupBy = 1;
	$http.post("server/read.php",{'subject': "declarations_credits", 'args': $scope.declaration_credits})
	.success(function (response) {
		console.log(response)
		$scope.declaration_credits.credits = response.records;

	});





})