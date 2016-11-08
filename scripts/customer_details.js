app.controller('customerCtrl', ['$scope', '$rootScope', '$routeParams', '$http', function ($scope, $rootScope, $routeParams, $http) {
	
	$rootScope.pageData.header = "Client";
	$rootScope.pageData.subtitle = "Clientoverzicht";
	$rootScope.pageData.breadcrumps = ["Client"];

	$args = {};
	$scope.subscription = {};
	
	console.log($scope.subscription.minutes);
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

	//get_customer_financial_details

	$http.post("server/read.php",{'subject': "get_customer_financial_details", 'id': $scope.customerId})
	.success(function (response) {

		$scope.customerDetails.financial_info = response.records[0];

		console.log($scope.customerDetails);

	});
	//check totaal facturen uitgedraaid
	$http.post("server/read.php",{'subject': "total_invoice", 'id': $scope.customerId})
	.success(function (response) {
		console.log(response);
		$scope.customerDetails.financial_info.total_invoice = response.records[0].total_invoice;
		

	});

	//total_invoice_payed
	//check hoeveel facturen er zijn betaald
	$http.post("server/read.php",{'subject': "total_invoice_payed", 'id': $scope.customerId})
	.success(function (response) {
		console.log(response);
		if(response.records[0].total_payed){
		$scope.customerDetails.financial_info.total_payed = response.records[0].total_payed;
		}else{
			$scope.customerDetails.financial_info.total_payed = 0;

		}

		$scope.percentage = parseInt(($scope.customerDetails.financial_info.total_payed / $scope.customerDetails.financial_info.total_invoice) * 100);
		console.log($scope.percentage);
		$( ".circlestat" ).data( "text", $scope.percentage +"%" );
		$( ".circlestat" ).data( "percent", $scope.percentage );
		$('.circlestat').circliful();
	});

	$scope.getSubscriptionList = function(){
		$http.post("server/read.php",{'subject': "subscription", "id": $scope.customerId  })
		.success(function (response) {
			console.log(response)
			$scope.subscriptions = response.records
		});	
	}
	$scope.getSubscriptionList();
	

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

	//$('.circlestat').circliful();

	
	
	//$( ".circlestat" ).data( "percent", $scope.subscription_minutes_percentage );

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
	$scope.subscription.hours = 5; 
	$scope.subscription.minutes = $scope.subscription.hours * 60;
	$scope.subscription.amount = "";
	$scope.subscription.start_date = moment();
	$scope.subscription.end_date = moment().subtract(30, 'day');

	$scope.start_date = moment();
	$scope.end_date = moment().add(1, 'year');

	$scope.save_subscription = function(event){
		console.log("Save");
		$scope.subscription.start_date = $scope.start_date;
		$scope.subscription.end_date = $scope.end_date;
		

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
			//$scope.subscriptions = response.records
		
			$scope.add_subscription_panel = false;
			$scope.getSubscriptionList();
			$rootScope.succesModalBox(true,'Abonnement is succesvol opgelsagen in onze database')
		});
		
	}

	$scope.remove_subscription = function(id, index){
		var r = confirm(id + "Weet u zeker dat u deze abonnement wilt verwijderen? Deze kunt u niet meer ongedaan maken.");
		if (r == true) {

		   	$http.post("server/remove.php",{'subject': "remove_subscription", 'id': id
			}).success(function (response) {
				
				
				$scope.subscriptions.splice(index,1)

				$rootScope.succesModalBox(true,'Abonnement is succesvol verwijderd');

			});	


		} else {

		}
	}

	$scope.editCustomerDetails = true;

	$scope.editCustomer = function(){

		$scope.editCustomerDetails = false;
	}

	$scope.cancelCustomer = function(){

		$scope.editCustomerDetails = true;
	}
	$scope.saveCustomer = function(){

		$http.post("server/update.php",{'subject': "update_customer", 'args': $scope.customerDetails
		}).success(function (response) {
			//$scope.case = response;
			console.log(response);
			console.log("Case is saved");
			$rootScope.succesModalBox(true,'Uw mutaties zijn succesvol opgeslagen')
		});	
		console.log("savecaseee");

		$scope.editCustomerDetails = true;
	}

	$scope.addHours = function(hours){

		$scope.subscription.hours =  $scope.subscription.hours + hours ;
		$scope.subscription.minutes = $scope.subscription.hours * 60;

	}
	$scope.changeHours = function(){

		$scope.subscription.hours =  $scope.subscription.hours ;
		$scope.subscription.minutes = $scope.subscription.hours * 60;

	}
	
	///case
}]);
