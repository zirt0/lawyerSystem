app.controller('settingsCtrl',function($scope, $rootScope, $http){
	
	$rootScope.pageData.header = "Instellingen";
	$rootScope.pageData.subtitle = "overzicht";
	$rootScope.pageData.breadcrumps = ["Instellingen"];
	
	console.log("settings")
	$scope.args = {};
	$scope.webTabs = [true, 0, 0, 0 ]
	$scope.tabs = function(tab){
		console.log(tab);
		//console.log($scope.webTabs[2]);

		for(var x in $scope.webTabs){
			
			console.log(x + " = " + tab);
			if(x == tab){
					console.log(x + " is tab")
					$scope.webTabs[x] = 1;
			}else{
					console.log(x + " is not tab")
					$scope.webTabs[x] = 0;
			}
		}
		//$scope.webTabs[2] = 1;
		console.log($scope.webTabs);
	}

	function get_declarartion_type(){
		$http.post("server/read.php",{'subject': "declaration_type"})
		.success(function (response) {
			$scope.declarations = response.records;
			console.log($scope.declarations);

		});
	}
	get_declarartion_type();
	


	$scope.remove_declartion = function(id){
		console.log(id)
		$http.post("server/remove.php",{'subject': "declaration_remove", "id": id})
		.success(function (response) {
			
			console.log(response);
			get_declarartion_type();

		});
	}

	$scope.add_declartion =  function(){
		console.log($scope.declaration_add);

		if($scope.declaration_add == "" || $scope.declaration_add == undefined || $scope.declaration_add == false){
			console.log("is leeg");
			return false;
		}
		console.log()
		$scope.args.declaration_name_new = $scope.declaration_add;
		$http.post("server/insert.php",{'subject': "declaration_type_add", "args": $scope.args})
		.success(function (response) {

            $scope.declaration_add = "";
			console.log(response);
			get_declarartion_type();

		});
	}
	$scope.client_checklist = [];
	
	 $scope.getClientChecklist = function(){
		$http.post("server/read.php",{'subject': "options", "args": "client_checklist" })
		.success(function (response) {
			
			console.log(response);
			$scope.client_checklist = response;
			

		});
	}
	$scope.getClientChecklist();

	
	$scope.add_client_checklist =  function(){
		console.log($scope.client_checklist_add);

		if($scope.client_checklist_add == "" || $scope.client_checklist_add == undefined || $scope.client_checklist_add == false){
			console.log("is leeg");
			return false;
		}
		console.log()
		var newItem = {name:$scope.client_checklist_add}; //make new item an object
		$scope.client_checklist.push(newItem); //voeg toe aan de arrayy
		$scope.client_checklist_addDB = JSON.stringify($scope.client_checklist); //make json to send to databse
		console.log($scope.client_checklist);
		$rootScope.update_option("client_checklist", $scope.client_checklist_addDB);
		
	}

	$scope.remove_client_checklist =  function(index){
		console.log(index);

		$scope.client_checklist.splice(index);
		console.log()
		// var newItem = {name:$scope.client_checklist_add}; //make new item an object
		// $scope.client_checklist.push(newItem); //voeg toe aan de arrayy
		$scope.client_checklist_addDB = JSON.stringify($scope.client_checklist); //make json to send to databse
		// console.log($scope.client_checklist);
		$rootScope.update_option("client_checklist", $scope.client_checklist_addDB);
		
	}

	$scope.settings = {};

	$http.post("server/read.php",{'subject': "options", "args": 'invoice_number' })
		.success(function (response) {
			console.log(response);
			$scope.settings.invoice_number =  response;
		});
	$http.post("server/read.php",{'subject': "options", "args": 'case_number' })
		.success(function (response) {
			console.log(response);
			$scope.settings.case_number =  response;
		});

	// $http.post("server/read.php",{'subject': "get_options"})
	// .success(function (response) {
	// 	console.log(response);
	// 	//$scope.settings.invoice_number =  response;
	// });

	
})