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