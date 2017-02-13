//customeroverview
app.controller('opponent_lawyersCtrl', function($scope, $rootScope, $filter, $http, $location){
	
	$rootScope.pageData.header = "Advocaten";
	$rootScope.pageData.subtitle = "Overzicht";
	$rootScope.pageData.breadcrumps = ["advocaten"];

	$http.post("server/read.php",{'subject': "lawyers"})
	.success(function (response) {
		$scope.lawyers = response.records;
		console.log($scope.opponents);
	});  

});

app.controller('opponent_lawyers_detailsCtrl', function($scope, $rootScope, $filter, $http, $location, $routeParams){
	
	$rootScope.pageData.header = "Advocaten";
	$rootScope.pageData.subtitle = "Overzicht";
	$rootScope.pageData.breadcrumps = ["advocaten"];

	$scope.lawyer = {};
	$scope.lawyer.id = "" + $routeParams.id + "";
	$scope.editCustomerDetails = true;


	$http.post("server/read.php",{'subject': "lawyers", 'args': $scope.lawyer})
	.success(function (response) {
		$scope.lawyer.data = response.records[0];
		console.log($scope.lawyer);
	});  

	$http.post("server/read.php",{'subject': "lawyers_case_details", 'args': $scope.lawyer})
	.success(function (response) {
		$scope.lawyer.case_details = response.records;
		console.log($scope.lawyer);
	});  



});