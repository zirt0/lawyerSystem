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

	$http.post("server/read.php",{'subject': "customers"})
	.success(function (response) {
		console.log(response)
		$scope.customers = response.records;
		console.log($scope.customers);
	});

	$http.post("server/read.php",{'subject': "declarations", 'args': $scope.args})
	.success(function (response) {
		console.log(response)
		$scope.declaration_items = response.records
	});
	
	$http.post("server/read.php",{'subject': "subscription", 'args': $scope.args})
	.success(function (response) {
		console.log(response)
		$scope.subscriptions = response.records
	});
	
	$scope.getDashboardInfo = function(){

		$http.post("server/read.php",{'subject': "last_declarations", "args": $scope.args})
		.success(function (response) {
			console.log(response)
			$scope.dashboard = response.records[0];
			console.log($scope.dashboard);
		});

		$http.post("server/read.php",{'subject': "count_declarations", "args": $scope.args})
		.success(function (response) {
			console.log(response)
			$scope.dashboard.count_declaration = response.records[0].count_declarations;
			console.log($scope.dashboard.count_declaration);
		});
		
		$http.post("server/read.php",{'subject': "count_customers", "args": $scope.args})
		.success(function (response) {
			console.log(response.records)
			$scope.dashboard.count_customers = response.records[0].count_customers;
			//console.log($scope.dashboard.count_declaration);
		});

		$http.post("server/read.php",{'subject': "declarations_past", "args": $scope.args})
		.success(function (response) {
			console.log(response.records)
			$scope.declaration_chart(response.records);
			//$scope.dashboard.count_customers = response.records[0].count_customers;
			//console.log($scope.dashboard.count_declaration);
		});

	}
	$scope.getDashboardInfo();

	$scope.$watch('args.last_months', function() {
        console.log("changed" + $scope.args.last_months)
        $scope.getDashboardInfo();	
    });


	$scope.declaration_chart = function(declaration){

		// tel 30 dagen terug
		var line_data1 = []; 
		for (day = ($scope.args.last_months * 30); day > 0; day--) {
			var tomorrow = new Date();
		  	tomorrow.setDate(tomorrow.getDate() - day);
			var daycounter = formatDateString(tomorrow);

			var turnover = 0; 
			for(x in declaration){
				//console.log(declaration[x]["declaration_date"]);
				var date = new Date(declaration[x]["declaration_date"]);
				var month = date.getMonth()+ 1;
				var dayd = date.getDate();
				var datum = dayd + "-" + month;
				//console.log(date.getDay());
				//formatDateString(date);
				//console.log(datum + " aaaa");	
				if(daycounter == datum){
					console.log("dagen zijn zelfde");
					console.log(daycounter + " " + datum);
					var turnover = declaration[x]["total_amount"]
				}
			
			}

			var turnoverArray = [day, turnover];
			line_data1.push(turnoverArray);
			//console.log(line_data1);

			$.plot("#line-chart", [line_data1], {
            grid: {
                hoverable: true,
                borderColor: "#E2E6EE",
                borderWidth: 1,
                tickColor: "#E2E6EE"
            },
            series: {
                shadowSize: 0,
                lines: {
                    show: true
                },
                points: {
                    show: true
                }
            },
            colors: ["#333333", "#cccccc"],
            lines: {
                fill: true,
            },
            yaxis: {
                show: false,
            },
            xaxis: {
                show: true
            }
        });
        //Initialize tooltip on hover
        $("<div class='tooltip-inner' id='line-chart-tooltip'></div>").css({
            position: "absolute",
            background: "#333333",
            padding: "3px 10px",
            color: "#ffffff",
            display: "none",
            opacity: 0.9
        }).appendTo("body");
        $("#line-chart").bind("plothover", function(event, pos, item) {

            if (item) {
                var x = item.datapoint[0].toFixed(2),
                    y = item.datapoint[1].toFixed(2);

                $("#line-chart-tooltip").html( /* item.series.label + */ " of " + x + " = " + y)
                    .css({
                        top: item.pageY + 5,
                        left: item.pageX + 5
                    })
                    .fadeIn(200);
            } else {
                $("#line-chart-tooltip").hide();
            }

        });

		}

	}

	
	function formatDateString(date){
		var year = date.getYear();
		var month = date.getMonth() + 1;
		var dayd = date.getDate();
		var datum = dayd + "-" + month;
		//console.log(datum);
		return datum;
		
	}

	$scope.stats = {};
	$http.post("server/read.php",{'subject': "users_stats"})
	.success(function (response) {
		console.log(response.records)
		$scope.stats.users = response.records;
		console.log($scope.stats.users);
		//$scope.dashboard.count_customers = response.records[0].count_customers;
		//console.log($scope.dashboard.count_declaration);

		$scope.labels = [];
		$scope.data = [];
		angular.forEach($scope.stats.users, function(value, key) {
		 	
		 	$scope.data.push(value['amount']);
		 	$scope.labels.push(value['fname'] + " " + value['lname']);
		 	console.log($scope.labels);
		 	//console.log(value['amount'] + " " +key);


		});
	}); 

   //$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  //$scope.data = [300, 500, 100];

})