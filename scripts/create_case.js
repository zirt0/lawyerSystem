app.controller('createCaseCtrl',function($scope, $rootScope, $http, $routeParams){
	
	$rootScope.pageData.header = "Dossier";
	$rootScope.pageData.subtitle = "klantoverzicht";
	$rootScope.pageData.breadcrumps = ["Dossier"];
	
	$scope.case = {};
	$scope.case.customer_id = $routeParams.id;
	$scope.case.user_id = $rootScope.userDetail.id; ///advocaat ID

	console.log($scope.case.customer_id);
	
	//get customerinfo
	$http.post("server/read.php",{
		'subject': "customer", 'id': $scope.case.customer_id
	})
	.success(function (response) {
		console.log(response);
		$scope.customer = response;
		console.log($scope.case.customer);
		///console.log($scope.customer['company']);
	});


	//create casetype
	$http.post("server/read.php",{
		'subject': "case_type"
		 })
	.success(function (response) {

		console.log(response);
		$scope.case_type_all = response.records;
	});


	$scope.case.confidential = false;
	$scope.case.office_charge = true;
	$scope.case.toevoeging = false;
	$scope.case.btw = true;
	$scope.case.eigenbijdrage = false;
	$scope.case.process = true;

	$scope.$watch('case.toevoeging', function() {
        
		if($scope.case.toevoeging == true){
			$scope.case.office_charge = false;
			$scope.case.eigenbijdrage = true;
		}else{
			$scope.case.eigenbijdrage = false;
		}
        
    });

    $scope.$watch('caseCreate.case.case_name', function() {
        
		console.log("aaaa");
        
    });

    $scope.case.opponentId = 1;

    $scope.createCase = function(){
		console.log("create case is pressed");

		$scope.submitted = true;
		console.log($scope.case);

		$http.post("server/insert.php",{
			'subject': "createCase", 
			'args': $scope.case
			 })
		.success(function (response) {
			console.log(response);
			if (response){
				
				$rootScope.succesModalBox(true, "Zaak is succesvol aangemaakt", "/cases/" + response)
					
			}else if(response == "false"){
				$rootScope.succesModalBox(false, "Er is een probleem ontstaan tijdens het toeveogen van klant", "")
			}

		});

    }


	console.log($scope.checkbox);
})
