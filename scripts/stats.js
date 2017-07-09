app.controller('statsCtrl',function($scope, $rootScope, $http){
	
	$rootScope.pageData.header = "Statistieken";
	$rootScope.pageData.subtitle = "Overzicht";
	$rootScope.pageData.breadcrumps = ["Statistieken"];

	$scope.args = {};
	$scope.args.limit = 5
	$scope.args.orderBy = "DESC"
	$scope.args.last_months = "1";//check last month
	$scope.args.valid_date = "1";//check last month
	$scope.dashboard = {};


	$http.post("server/read.php",{'subject': "declarations", 'args': $scope.args})
	.success(function (response) {
		console.log(response)
		$scope.declaration_items = response.records
	});
	
	
	function formatDateString(date){
		var year = date.getYear();
		var month = date.getMonth() + 1;
		var dayd = date.getDate();
		var datum = dayd + "-" + month;
		//console.log(datum);
		return datum;
		
	}

	$scope.stats = {};
	$scope.start_date = moment().subtract(30, 'day');
	$scope.end_date = moment();
	
	$scope.getStatsofUser = function(){

		$scope.stats.start_date = $scope.start_date.format('YYYY-MM-DD');
		$scope.stats.end_date = $scope.end_date.format("YYYY-MM-DD");
		console.log($scope.stats.start_date);

		$http.post("server/read.php",{'subject': "users_stats", "args": $scope.stats})
		.success(function (response) {
			console.log(response);
			console.log(response.records)
			$scope.stats.users = response.records;
			console.log($scope.stats.users);
			//$scope.dashboard.count_customers = response.records[0].count_customers;
			//console.log($scope.dashboard.count_declaration);

			$scope.labels = [];
			$scope.data = [];
			$scope.data_time = [];
			angular.forEach($scope.stats.users, function(value, key) {
			 	
			 	$scope.data_time.push(value['time']);
			 	$scope.data.push(value['amount']);
			 	$scope.labels.push(value['fname'] + " " + value['lname']);
			 	console.log($scope.labels);


			});
		});

		$http.post("server/read.php",{'subject': "user_declarations_details_for_chart", 'args': $scope.stats})
		.success(function (response) {
			$scope.stats.chartdetails = response.records;
			console.log($scope.stats.chartdetails)
			$scope.decl_data_labels = [];
			$scope.decl_total_time = [];
			$scope.decl_total_amount = [];
			$scope.decl_data_time = [];
			$scope.decl_data_amount = [];
			$scope.decl_data_labels = [];
			for(x in $scope.stats.chartdetails){
				
				$scope.decl_data_labels.push($scope.stats.chartdetails[x]['DATE']);
				$scope.decl_total_time.push($scope.stats.chartdetails[x]['total_time']);
				$scope.decl_total_amount.push($scope.stats.chartdetails[x]['total_amount']);
			}


			$scope.decl_data_time.push($scope.decl_total_time);
			$scope.decl_data_amount.push($scope.decl_total_amount);
			$scope.decl_data_amount_max = Math.max.apply(null, $scope.decl_total_amount);
			$scope.decl_data_amount_min = Math.min.apply(null, $scope.decl_total_amount);
			$scope.decl_data_amount_avg = $scope.calculateAverage($scope.decl_total_amount);
			$scope.decl_data_amount_total = $scope.calculateTotal($scope.decl_total_amount);
			console.log($scope.decl_data_amount_max);
		});
	}


	$scope.calculateAverage = function(MyData){ 
	    var sum = 0;
			for( var i = 0; i < MyData.length; i++ ){
			    sum += parseInt( MyData[i], 10 ); //don't forget to add the base
			}

			var avg = sum/MyData.length;
			return avg;
	};
	$scope.calculateTotal = function(MyData){ 
	    var sum = 0;
			for( var i = 0; i < MyData.length; i++ ){
			    sum += parseInt( MyData[i], 10 ); //don't forget to add the base
			}

			var avg = sum;
			return avg;
	};

	$scope.getStatsofUser();

	$scope.series_time = ['Tijd in minuten'];
	  $scope.series_amount = ['€'];
	  $scope.colors = ["rgba(139,195,74,1)"];
	 
	  $scope.onClick = function (points, evt) {
	    console.log(points, evt);
	  };
	  $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }];
	  $scope.options_time = {
	    scales: {
	      yAxes: [
	        {
	          id: 'y-axis-1',
	          type: 'linear',
	          display: true,
	          position: 'left'
	        }
	      ]
	    }
	  };
	  $scope.options_amount = {
	    scales: {
	      yAxes: [
	        {
	          id: 'y-axis-1',
	          type: 'linear',
	          display: true,
	          position: 'left'
	        }
	      ]
	    }
	  };


	$scope.submitDate = function(){
		console.log("submit date");
		$scope.getStatsofUser();

	}


   //$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  //$scope.data = [300, 500, 100];

})