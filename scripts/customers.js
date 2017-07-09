//customeroverview
app.controller('customersCtrl', function($scope, $rootScope, $filter, $http, $location){
	
	$rootScope.pageData.header = "Clienten";
	$rootScope.pageData.subtitle = "Overzicht";
	$rootScope.pageData.breadcrumps = ["Clienten"];

	$scope.people = [];
	$http.post("server/read.php",{'subject': "customers"})
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

});

//customeroverview
app.controller('createCustomerCtrl', function($scope, $rootScope, $http, $location){
	
	$http.post("server/read.php",{'subject': "options", "args": "client_checklist" })
	.success(function (response) {
		
		console.log(response);
		$scope.checklist_customer = response;
		

	});
	$scope.createCustomer = function(){
		console.log("create case is pressed");

		if($scope.choices.length){
			console.log("hellooo" + $scope.choices.length);
			$scope.customerAdd.choices = $scope.choices;
		}

		console.log($scope.customerAdd);

		//return;

		$scope.submitted = true;

		$http.post("server/insert.php",{
			'subject': "createCustomer", 
			'args': $scope.customerAdd
			 })
		.success(function (response) {
			console.log(response);
			if (response){
				
				$rootScope.succesModalBox(true, "Klant is succesvol toegevoegd", "/customers/" + response)
					
			}else if(response == "false"){
				$rootScope.succesModalBox(false, "Er is een probleem ontstaan tijdens het toeveogen van klant", "")
			}
			
		});
    }
    $scope.choices =  []; 

    $scope.clickExtraBSN = function (){

    	var choiceslength = $scope.choices.length+1;

    	$scope.choices.push({'id': choiceslength});

    }

});

