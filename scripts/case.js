app.controller('caseCtrl',function($scope, $rootScope, $http, $base64){
	$rootScope.pageData.header = "Dossiers";
	$rootScope.pageData.subtitle = "Overzicht";
	$rootScope.pageData.breadcrumps = ["dossiers"];

	$scope.people = [];
	$http.post("server/read.php",{'subject': "cases"})
	.success(function (response) {
		$scope.people = response;

		//make an array from object
		$scope.people = $.map($scope.people, function(value, index) {
		    return [value];
		});

		$scope.people = $scope.people[0]

		$scope.filteredList = $scope.people;
		console.log($scope.filteredList);

		$scope.updateFilteredList = function() {
		    $scope.filteredList = $filter("filter")($scope.people, $scope.query);
		  };
		$scope.config = {
		    itemsPerPlname: 1,
		    maxPlnames: 2,
		    fillLastPlname: "yes"
		};
	});
	
})


