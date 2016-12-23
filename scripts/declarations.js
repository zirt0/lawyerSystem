app.controller('declarationsCtrl',function($scope, $rootScope, $http){
	$rootScope.pageData.header = "Declaraties";
	$rootScope.pageData.subtitle = "Overzicht";
	$rootScope.pageData.breadcrumps = ["Declaraties"];
	
	$scope.args = {};
	$scope.args.groupBy = 1;
	$http.post("server/read.php",{'subject': "declarations", 'decl': $scope.args})
	.success(function (response) {
		$scope.declarations = response.records;

		console.log($scope.declarations);

	});

})

app.controller('declarationDetailsCtrl',function($scope, $rootScope, $routeParams, $http, base64, $window, $http, $filter, $location){

	///for creating pdf
	createPDFfunction($scope,$rootScope, base64, $window, $http, $filter, $location);
	$scope.declarationDetail = {};
	$scope.declarationDetail.case_id = "" + $routeParams.id + "";
	$scope.declarationChange = {};
	//$scope.declarationChange.modal = true;
	$scope.caseDetails = {};
	console.log($scope.declarationDetail);
	
	var getDate = new Date();
	$scope.args = {};
	$scope.args.case_id = "" + $routeParams.id + "";
	$scope.args.from_year = "" + getDate.getFullYear() + "";
	$scope.args.from_month = getDate.getMonth() + 1 ;
	$scope.args.from_month = "" + $scope.args.from_month + "" ;
	$scope.args.fileURLs = "lala";

	$scope.start_date = moment().subtract(30, 'day');
	$scope.end_date = moment();
	//console.log($scope.args.start_date);
	///$scope.parent = {start_date:'', end_date:'' };


	$scope.invoiceInfo = {}
	$scope.invoiceInfo.case_id = $scope.declarationDetail.case_id;
	$scope.invoiceInfo.invoiceId = "";
	$scope.invoiceInfo.discountType = 'none';
	
	


	$http.post("server/read.php",{'subject': "casedetail", 'id': $scope.args.case_id})
		.success(function (response) {
			
			$scope.caseDetails = response;
			console.log($scope.caseDetails)
			$scope.invoiceInfo.customerInfo = $scope.caseDetails;
			console.log($scope.invoiceInfo);
			console.log($scope.caseDetails.adviesdossier);

	});


	console.log($scope.args);
	$scope.submitDate = function(){

		$scope.args.get_from_date = 'true';
		$scope.args.case_id = "" + $routeParams.id + "";;

		$scope.args.start_date = $scope.start_date.format('YYYY-MM-DD');
		$scope.args.end_date = $scope.end_date.format("YYYY-MM-DD");
		//console.log($scope.end_date_decl.format('YYYY-MM-DD'));
		console.log($scope.args.start_date);
		console.log($scope.args.end_date);

		//return false;

		console.log($scope.args.get_from_date);
		console.log($scope.args.from_year);
		console.log($scope.args.from_month);

		$http.post("server/read.php",{'subject': "declarations", 'decl': $scope.args})
		.success(function (response) {
			console.log(response);
			$scope.declarationDetail = response.records;
			
			if(!$scope.declarationDetail[0]){
				console.log("is leeg")
				alert("Er is geen data beschikbaar");
				//$scope.declarationDetail = {}
				return false
			}
			//check aantal abonnementminuten
			console.log($scope.declarationDetail[0]);
			subscription_minutes($scope.declarationDetail[0]['customer_id']);

			// //make an array from object
			// $scope.declarationDetail = $.map($scope.declarationDetail, function(value, index) {
			//     return [value];
			// });

			// $scope.declarationDetail = $scope.declarationDetail[0]

			// $scope.filteredList = $scope.declarationDetail;
			// console.log($scope.filteredList);

			// $scope.updateFilteredList = function() {
			//     $scope.filteredList = $filter("filter")($scope.declarationDetail, $scope.query);
			// };

			// //check totalamount
			// $scope.totalAmount($scope.filteredList);

			// $scope.config = {
			//     itemsPerPlname: 1,
			//     maxPlnames: 2,
			//     fillLastPlname: "yes"
			// };

		});

	}

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

	$scope.getDeclaration_credits = function(){

		$scope.declaration_credits = {};
		$scope.declaration_credits.case_id = "" + $routeParams.id + "";
		$scope.declaration_credits.credits = {};
		$scope.declaration_credits.total_tax = 0;
		$scope.declaration_credits.total_no_tax = 0;
		$scope.declaration_credits.invoiced = 1;
		console.log($scope.declaration_credits);
		
		$http.post("server/read.php",{'subject': "declarations_credits", 'args': $scope.declaration_credits })
		.success(function (response) {
			console.log(response);
			$scope.declaration_credits.credits = response.records;
			console.log($scope.declaration_credits.records);

			for(x in $scope.declaration_credits.credits){
				console.log($scope.declaration_credits.credits[x]['btw'])
				if($scope.declaration_credits.credits[x]['btw'] === '1'){
					
					$scope.declaration_credits.total_tax += parseFloat($scope.declaration_credits.credits[x]['price_ex_btw']);
					console.log(parseFloat($scope.declaration_credits.credits[x]['price_ex_btw']))
				}

				if($scope.declaration_credits.credits[x]['btw'] === '0'){
				
					$scope.declaration_credits.total_no_tax += parseFloat($scope.declaration_credits.credits[x]['price_ex_btw']);
					console.log(parseFloat($scope.declaration_credits.credits[x]['price_ex_btw']))
				} 
			}
			console.log($scope.declaration_credits);

		});
	}
	$scope.getDeclaration_credits();

		$scope.removeCredit = function(id){

		console.log('remove credit is removed');
		var r = confirm("Weet u zeker dat u wilt verwijderen?");
	    
	    if (r == true) {
	    	$http.post("server/remove.php",{'subject': "remove_declarations_credits", 'id': id})
			.success(function (response) {
				console.log(response)
				$scope.getDeclaration_credits();

			});
	    }

		
	}
	 
	$scope.creditChange = {};

	$scope.editCredit = function(id){
		console.log(id);

		$scope.creditChange.modal = true;

		$scope.creditChange.array = $scope.declaration_credits.credits[id];

		console.log($scope.creditChange);

	}

	$scope.saveEditCredits = function(){
		//$scope.creditChange.array
		$http.post("server/update.php",{'subject': "update_credits", 'args': $scope.creditChange.array})
		.success(function (response) {
			console.log(response);
			$scope.creditChange.modal = false;

			//$scope.closeDeclarationModal();
			$rootScope.succesModalBox(true, "Declaratie is succesvol gewijzigd")
		});

	}

	$scope.getDeclarations = function(args){

		if(args){
			$scope.declarationDetail = args;
			//console.log(args.get_date_range.fromYear)
		}

		$scope.getDeclarationfromcase = {};
		$scope.getDeclarationfromcase.case_id = "" + $routeParams.id + "";
		$scope.getDeclarationfromcase.not_invoiced = "1";

		console.log(args);
		//console.log($scope.declarationDetail.fromMonth);

		$http.post("server/read.php",{'subject': "declarations", 'decl': $scope.getDeclarationfromcase})
		.success(function (response) {
			console.log(response);
			$scope.declarationDetail = response.records;

			$scope.editingData = {};
    
		    for (var i = 0, length = $scope.declarationDetail.length; i < length; i++) {
		      $scope.editingData[$scope.declarationDetail[i].id] = false;
		    }
		    console.log($scope.editingData);
			
			//check aantal abonnementminuten
			console.log($scope.declarationDetail);
			subscription_minutes($scope.declarationDetail[0]['customer_id']);

			// //make an array from object
			// $scope.declarationDetail = $.map($scope.declarationDetail, function(value, index) {
			//     return [value];
			// });

			// $scope.declarationDetail = $scope.declarationDetail[0]

			// $scope.filteredList = $scope.declarationDetail;
			// console.log($scope.filteredList);

			// $scope.updateFilteredList = function() {
			//     $scope.filteredList = $filter("filter")($scope.declarationDetail, $scope.query);
			// };

			// //check totalamount
			 $scope.totalAmount($scope.filteredList);

			// $scope.config = {
			//     itemsPerPlname: 1,
			//     maxPlnames: 2,
			//     fillLastPlname: "yes"
			// };
		});

	}

	$scope.getDeclarations();

	function subscription_minutes(customer_id){
		$http.post("server/read.php",{'subject': "subscription_time", 'id': customer_id})
		.success(function (response) {
			console.log(response.records);
			$scope.usersubscription = {};

			if(response.records.length === 0){
				console.log("Geen abbonnement");
				console.log(response.records);
				$scope.usersubscription.abo = false;
			}else{
				console.log("WEL abbonnement");
				console.log(response.records);
				$scope.usersubscription.abo = true;
			}
			$scope.usersubscription.time = response.records;
			$scope.usersubscription.start_date = response.records[0]['start_date'];
			$scope.usersubscription.end_date = response.records[0]['end_date'];
			$scope.usersubscription.id = response.records[0]['id'];
			console.log($scope.usersubscription);

			$scope.usersubscription.minutes_left = 0;
			for(x in $scope.usersubscription.time){
				console.log()
				$scope.usersubscription.minutes_leftover = parseInt($scope.usersubscription.time[x]['minutes']) - parseInt($scope.usersubscription.time[x]['minutes_used']);
				$scope.usersubscription.minutes_left += $scope.usersubscription.minutes_leftover;
			}
			console.log($scope.usersubscription.minutes_left);
		});
	}
	$scope.totalAmount = function(object){

		$scope.totalAmountDec = 0;
		$scope.totalTimeDec = 0;

		for(i in object){
			console.log(object[i]['amount']);
			$scope.totalAmountDec += parseFloat(object[i]['amount']);
			$scope.totalTimeDec += parseFloat(object[i]['time']);
		}
		$scope.totalAmountDec = $scope.totalAmountDec.toFixed(2);
		$scope.totalTimeDec = $scope.totalTimeDec.toFixed(0);
		console.log($scope.totalAmountDec);

	}
	////selection 


	$scope.selection = [];
	$scope.totaalDeclaration = 0;

	$scope.toggleSelection = function toggleSelection(rowId) {

	     var idx = $scope.selection.indexOf(rowId);
	    
	     // is currently selected
	     if (idx > -1) {
	       	$scope.selection.splice(idx, 1);
			console.log( "Is currently selected " + rowId);
	     }
	 
	     // is newly selected
	     else {
	       	$scope.selection.push(rowId);
			console.log( "Is newely selected " + rowId);
	     }

		for(i in $scope.selection){
			console.log($scope.selection[i]);
		}

		console.log($scope.selection);
		console.log($scope.declarationDetail);
    }


	$scope.selectAll = function(){

		for(x in $scope.declarationDetail){
			
			console.log(x);
  			
  			$scope.declarationDetail[x].selected = true;
			$scope.toggleSelection($scope.declarationDetail[x].id);
			console.log($scope.declarationDetail);
			console.log($scope.selection);

		}
		
	}

	$scope.deselectAll = function(){

		for(x in $scope.declarationDetail){
			
  			
  			$scope.declarationDetail[x].selected = false;
			$scope.toggleSelection($scope.declarationDetail[x].id);
			console.log($scope.declarationDetail);
			console.log($scope.selection);

		}
		
	}

	$scope.editDeclaration = function(id){
		console.log(id);

		$scope.declarationChange.modal = true;

		$scope.declarationChange.array = $scope.declarationDetail[id];
		//$scope.declarationChange.array.declaration_date = moment($scope.declarationChange.array.declaration_date).format('DD-MM-YYYY')

		console.log($scope.declarationDetail[id]);

	}

	$scope.saveEditDeclaration = function(id){
		
		//$scope.declarationChange.array.declaration_date = moment($scope.declarationChange.array.declaration_date).format('DD-MM-YYYY');
		
		console.log(moment($scope.declarationChange.array.declaration_date, "MM-DD-YYYY").add(1, 'd'));
		$scope.declarationChange.array.declaration_date = moment($scope.declarationChange.array.declaration_date, "MM-DD-YYYY").format("YYYY-MM-DD HH:mm:ss");
		console.log($scope.declarationChange.array);
		//return false;
		///save to database
		$http.post("server/update.php",{'subject': "update_declarations", 'args': $scope.declarationChange.array})
		.success(function (response) {
			console.log(response);
			
			///$scope.closeDeclarationModal();
			$scope.declarationChange.modal = false
			$rootScope.succesModalBox(true, "Declaratie is succesvol gewijzigd")
		});

	}

	$scope.removeDeclaration = function(id){
		console.log($scope.declarationDetail[id].id)

		var r = confirm("Weet u zeker dat u deze declaratie wilt verwijderen?");
	    if (r == true) {
	    	$http.post("server/remove.php",{'subject': "declaration_remove", 'id': $scope.declarationDetail[id].id
			}).success(function (response) {
				$scope.case = response;
				console.log($scope.case);
				$scope.declarationDetail.splice(id, 1);
				$rootScope.succesModalBox(true, "Declaratie is succesvol verwijderd")
			});	
	    }
	}

    ////selection 

    $scope.getInvoicedDeclarations = function(){

    	$scope.InvoicedDeclarations = {};
		$scope.InvoicedDeclarations.case_id = "" + $routeParams.id + "";
		$scope.InvoicedDeclarations.all_invoiced = "1";

		$http.post("server/read.php",{'subject': "declarations", 'decl': $scope.InvoicedDeclarations})
		.success(function (response) {
			$scope.InvoicedDeclarations.rows = response.records;
			
			console.log($scope.InvoicedDeclarations);
	
		});

    }
    $scope.getInvoicedDeclarations();


 //filteredListInvoices
	$http.post("server/read.php",{'subject': "invoices", 'args': $scope.declarationDetail})
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

	$http.post("server/read.php",{'subject': "invoices", 'args': $scope.declarationDetail})
	.success(function (response) {
		$scope.invoiceDetail.case = response;
	});

	
	$http.post("server/read.php",{'subject': "get_invoices", 'args': $scope.declarationDetail})
	.success(function (response) {
		$scope.getinvoice = response.records;
		console.log($scope.getinvoice);
	});

	$scope.getInvoiceofUser = {};
	$scope.getInvoiceofUser.user_id = $rootScope.userDetail.id;
	console.log($scope.getInvoiceofUser);
	$http.post("server/read.php",{'subject': "get_invoices", 'args': $scope.getInvoiceofUser})
	.success(function (response) {
		$scope.getInvoiceofUser = response;
		console.log($scope.getInvoiceofUser);
	});



	
	//console.log($scope.invoiceInfo.customerInfo.customerInfo.company);
	
	$scope.downloadInvoice = function(invoiced){

		$scope.download = {};
		$scope.download['invoiced'] = invoiced;
		console.log($scope.download)
	 	$http.post("server/read.php",{'subject': "declarations", 'args': $scope.download})
		.success(function (response) {
			
			$scope.invoicedofDeclaration = response.records;
			console.log($scope.invoicedofDeclaration, '');
			$scope.loopdeclaration($scope.invoicedofDeclaration, true);
	 		pdfMake.createPdf(docDefinition).open();
	 		docDefinition.content[2]['table']['body'] = [];
	 		console.log(docDefinition.content[2])
	 		console.log(docDefinition.content)
		
		});

	}

	$scope.openInvoiceModal = function(){
	 	$scope.invoiceModal = true;
	 	$scope.invoiceInfo.invoiceId;
	 	$http.post("server/read.php",{'subject': "options", "args": 'invoice_number' })
		.success(function (response) {
			console.log(response);
			var invoice_number = parseInt(response) + 1;
			$scope.invoiceInfo.invoiceId = new Date().getFullYear() + "" + invoice_number;
		});;

	}

	$scope.closeInvoiceModal = function(){

	 	$scope.invoiceModal = false;
	 	//$scope.invoiceInfo.invoiceId = "";
	 	$scope.invoiceInfo.discountAmount = ""
	 	$scope.invoiceInfo.discountType = "none";

	}

})

