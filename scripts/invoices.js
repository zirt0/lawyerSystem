//invoicesCtrl
app.controller('invoicesCtrl',function($scope, $rootScope, $http, $base64, $window){
	$rootScope.pageData.header = "Facturen";
	$rootScope.pageData.subtitle = "Overzicht";
	$rootScope.pageData.breadcrumps = ["Facturen"];

	// $http.post("server/read.php",{'subject': "invoices", 'args': $scope.declarationDetail})
	// .success(function (response) {
	// 	$scope.invoiceDetail = response;

	// 	//make an array from object
	// 	$scope.invoiceDetail = $.map($scope.invoiceDetail, function(value, index) {
	// 	    return [value];
	// 	});

	// 	$scope.invoiceDetail = $scope.invoiceDetail[0]

	// 	$scope.filteredListInvoices = $scope.invoiceDetail;
	// 	console.log($scope.filteredListInvoices);

	// 	$scope.updateFilteredList = function() {
	// 	    $scope.filteredListInvoices = $filter("filter")($scope.invoiceDetail, $scope.query);
	// 	  };
	// 	$scope.config = {
	// 	    itemsPerPlname: 1,
	// 	    maxPlnames: 2,
	// 	    fillLastPlname: "yes"
	// 	};
	// });

	$http.post("server/read.php",{'subject': "get_invoices"})
	.success(function (response) {
		$scope.getinvoice = response.records;
		console.log(response);
	});

	$scope.download_invoice = function(content){
		console.log(content);
		var dataURL = $base64.decode(content)
		console.log(dataURL);
		var file = new Blob([dataURL], {type: 'application/pdf; charset=utf-8'});
        console.log(file);
 		$scope.fileURL = URL.createObjectURL(file);
 		console.log($scope.fileURL);
 		$window.open($scope.fileURL, 'test', file);
	}

});

//invoicesCtrl
app.controller('invoicesDetailCtrl',function($scope, $rootScope, $routeParams, $http){
	$rootScope.pageData.header = "Facturen";
	$rootScope.pageData.subtitle = "Overzicht";
	$rootScope.pageData.breadcrumps = ["Facturen"];

	$scope.declarationDetail = {};
	$scope.declarationDetail.customer_id = "" + $routeParams.id + "";
	console.log($scope.declarationDetail.customer_id)

	$http.post("server/read.php",{'subject': "invoices", 'decl': $scope.declarationDetail})
	.success(function (response) {
		$scope.invoiceDetail = response;

		//make an array from object
		$scope.invoiceDetail = $.map($scope.invoiceDetail, function(value, index) {
		    return [value];
		});

		$scope.invoiceDetail = $scope.invoiceDetail[0]

		$scope.filteredListInvoices = $scope.invoiceDetail;
		console.log($scope.filteredListInvoices);

		$scope.updateFilteredList = function() {
		    $scope.filteredListInvoices = $filter("filter")($scope.invoiceDetail, $scope.query);
		  };
		$scope.config = {
		    itemsPerPlname: 1,
		    maxPlnames: 2,
		    fillLastPlname: "yes"
		};
	});
});

app.controller('paymentDetailCtrl',function($scope, $rootScope, $routeParams, $http){
	$rootScope.pageData.header = "Factuur betalen";
	$rootScope.pageData.subtitle = "factuur betalen";
	$rootScope.pageData.breadcrumps = ["Facturen", "Betalen"];

	$scope.payment = {};
	$scope.payment.payment_id = "" + $routeParams.id + "";
	console.log($scope.payment);

	$http.post("server/read.php",{'subject': "get_paymentinfo", 'args': $scope.payment})
	.success(function (response) {
		console.log(response)
		$scope.payment.payemntinfo = response.records[0]
		console.log($scope.payment.payemntinfo);
		$scope.payment.amount = $scope.payment.payemntinfo.total;
	});


	$scope.payment.pay_invoice = function(){
		console.log($scope.payment.amount);
		console.log($scope.payment);
		if(!$scope.payment.amount){
			alert("Vul het totale bedrag in")
			return false;
		}
		$http.post("server/insert.php",{'subject': "add_payment", 'args': $scope.payment})
		.success(function (response) {
			console.log(response)
			$rootScope.succesModalBox(true, "Betaling is succesvol opgeslagen", "/invoices/")

		});

	}
});