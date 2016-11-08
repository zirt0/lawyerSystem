//customeroverview
app.controller('opponentsCtrl', function($scope, $rootScope, $filter, $http, $location){
	
	$rootScope.pageData.header = "Wederpartijen";
	$rootScope.pageData.subtitle = "Overzicht";
	$rootScope.pageData.breadcrumps = ["wederpartijen"];

	$scope.people = [];
	$http.post("server/read.php",{'subject': "opponents"})
	.success(function (response) {
		$scope.opponents = response.records;
		console.log($scope.opponents);
	});  

});