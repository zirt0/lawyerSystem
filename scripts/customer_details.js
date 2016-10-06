app.controller('customerCtrl', ['$scope', '$rootScope', '$routeParams', '$http', function ($scope, $rootScope, $routeParams, $http) {
	
	$rootScope.pageData.header = "Client";
	$rootScope.pageData.subtitle = "Clientoverzicht";
	$rootScope.pageData.breadcrumps = ["Client"];

	$args = {};
	$scope.subscription = {};
	$scope.customerId = "" + $routeParams.id + "";
	$args.customer_id = $scope.customerId;
	console.log($args);
	console.log("customerjs " + $scope.customerId);


	$http.post("server/read.php",{'subject': "customer_cases", 'id': $scope.customerId})
	.success(function (response) {
		$scope.customerCases = response.records;
		console.log(response);
	});

	//get information of customers
	$http.post("server/read.php",{'subject': "customer", 'id': $scope.customerId})
	.success(function (response) {

		$scope.customerDetails = response;

		$rootScope.pageData.breadcrumps.push($scope.customerDetails.fname + " " + $scope.customerDetails.lname )
		console.log(response);
	});

	$http.post("server/read.php",{'subject': "subscription", "id": $scope.customerId  })
	.success(function (response) {
		console.log(response)
		$scope.subscriptions = response.records
	});

	//get information of customers
	$http.post("server/read.php",{'subject': "subscription_time", 'id': $scope.customerId})
	.success(function (response) {
			console.log(response.records);
			$scope.subscription_time = response.records;

			$scope.subscription_minutes_total = 0;
			$scope.subscription_minutes_used = 0;
			$scope.subscription_minutes_left = 0;
			for(x in $scope.subscription_time){
				$scope.subscription_minutes_leftover = parseInt($scope.subscription_time[x]['minutes']) - parseInt($scope.subscription_time[x]['minutes_used']);
				$scope.subscription_minutes_left += $scope.subscription_minutes_leftover
				$scope.subscription_minutes_used += parseInt($scope.subscription_time[x]['minutes_used']);
				$scope.subscription_minutes_total += parseInt($scope.subscription_time[x]['minutes']);
			}
			console.log($scope.subscription_minutes_used + " " +  $scope.subscription_minutes_total);
			$scope.subscription_minutes_percentage = $scope.subscription_minutes_used / $scope.subscription_minutes_total * 100;
			console.log( parseInt($scope.subscription_minutes_percentage));
	});

	$('.circlestat').circliful();

	$( ".circlestat" ).data( "percent", $scope.subscription_minutes_percentage );

	$scope.add_subscription_panel = false;
	$scope.add_subscription = function(event){
		
		$scope.add_subscription_panel = true;

	}

	$scope.cancel_subscription = function(event){
		console.log("Cancel");
		console.log($scope.subscription);

		for(x in $scope.subscription ){
			$scope.subscription[x] = "";
			console.log(x);
		}
		
		$scope.add_subscription_panel = false;
	}
	
	$scope.subscription.customer_id = $scope.customerId;
	$scope.subscription.minutes = "";
	$scope.subscription.amount = "";
	$scope.subscription.start_date = "";
	$scope.subscription.end_date = "";

	$scope.save_subscription = function(event){
		console.log("Save");
		

		for(x in $scope.subscription){
			if($scope.subscription[x] == ""){
				console.log(x + " leeg" + $scope.subscription[x])
				alert("Vul alle velden in");
				return false
			}else{
				console.log(x + " niet leeg" + $scope.subscription[x])
			}
		}

		console.log($scope.subscription);

		$http.post("server/insert.php",{'subject': "insert_subscription", "args": $scope.subscription })
		.success(function (response) {
			console.log(response)
			$scope.subscriptions = response.records
		});
		
	}
	
	///case
}]);
