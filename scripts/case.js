app.controller('caseCtrl',function($scope, $rootScope, $filter, $http, $base64){
	$rootScope.pageData.header = "Dossiers";
	$rootScope.pageData.subtitle = "Overzicht";
	$rootScope.pageData.breadcrumps = ["dossiers"];

	$scope.people = [];
	$http.post("server/read.php",{'subject': "cases"})
	.success(function (response) {
		$scope.people = response.records;

	});

	$scope.filterBy = "";

	console.log($scope.filterBy);
	
})


