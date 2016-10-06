app.controller('declarationsCtrl',function($scope, $rootScope, $http){
	$rootScope.pageData.header = "Declaraties";
	$rootScope.pageData.subtitle = "Overzicht";
	$rootScope.pageData.breadcrumps = ["Declaraties"];
	
	$scope.declarations = {};
	$scope.declarations.groupBy = 1;
	$http.post("server/read.php",{'subject': "declarations", 'decl': $scope.declarations})
	.success(function (response) {
		$scope.declarations = response;

		//make an array from object
		$scope.declarations = $.map($scope.declarations, function(value, index) {
		    return [value];
		});

		$scope.declarations = $scope.declarations[0]

		$scope.filteredList = $scope.declarations;
		console.log($scope.filteredList);

		$scope.updateFilteredList = function() {
		    $scope.filteredList = $filter("filter")($scope.declarations, $scope.query);
		  };
		$scope.config = {
		    itemsPerPlname: 1,
		    maxPlnames: 2,
		    fillLastPlname: "yes"
		};
	});





})

app.controller('declarationDetailsCtrl',function($scope, $routeParams, $http){

	$scope.declarationDetail = {};
	$scope.declarationDetail.case_id = "" + $routeParams.id + "";
	console.log($scope.declarationDetail);
	
	var getDate = new Date();
	$scope.args = {};
	$scope.args.from_year = "" + getDate.getFullYear() + "";
	$scope.args.from_month = getDate.getMonth() + 1 ;
	$scope.args.from_month = "" + $scope.args.from_month + "" ;
	
	$scope.submitDate = function(){

		$scope.args.get_from_date = 'true';
		$scope.args.case_id = "" + $routeParams.id + "";

		console.log($scope.args.get_from_date);
		console.log($scope.args.from_year);
		console.log($scope.args.from_month);

		$http.post("server/read.php",{'subject': "declarations", 'decl': $scope.args})
		.success(function (response) {
			console.log(response);
			$scope.declarationDetail = response;
			
			//check aantal abonnementminuten
			console.log($scope.declarationDetail);
			subscription_minutes($scope.declarationDetail.records[0]['customer_id']);

			//make an array from object
			$scope.declarationDetail = $.map($scope.declarationDetail, function(value, index) {
			    return [value];
			});

			$scope.declarationDetail = $scope.declarationDetail[0]

			$scope.filteredList = $scope.declarationDetail;
			console.log($scope.filteredList);

			$scope.updateFilteredList = function() {
			    $scope.filteredList = $filter("filter")($scope.declarationDetail, $scope.query);
			  };

			//check totalamount
			$scope.totalAmount($scope.filteredList);

			$scope.config = {
			    itemsPerPlname: 1,
			    maxPlnames: 2,
			    fillLastPlname: "yes"
			};

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


	$scope.getDeclarations = function(args){

		if(args){
			$scope.declarationDetail = args;
			//console.log(args.get_date_range.fromYear)
		}

		console.log(args);
		//console.log($scope.declarationDetail.fromMonth);

		$http.post("server/read.php",{'subject': "declarations", 'decl': args})
		.success(function (response) {
			$scope.declarationDetail = response;
			
			//check aantal abonnementminuten
			console.log($scope.declarationDetail);
			subscription_minutes($scope.declarationDetail.records[0]['customer_id']);

			//make an array from object
			$scope.declarationDetail = $.map($scope.declarationDetail, function(value, index) {
			    return [value];
			});

			$scope.declarationDetail = $scope.declarationDetail[0]

			$scope.filteredList = $scope.declarationDetail;
			console.log($scope.filteredList);

			$scope.updateFilteredList = function() {
			    $scope.filteredList = $filter("filter")($scope.declarationDetail, $scope.query);
			  };

			//check totalamount
			$scope.totalAmount($scope.filteredList);

			$scope.config = {
			    itemsPerPlname: 1,
			    maxPlnames: 2,
			    fillLastPlname: "yes"
			};
		});

	}

	$scope.getDeclarations();

	function subscription_minutes(customer_id){
		$http.post("server/read.php",{'subject': "subscription_time", 'id': customer_id})
		.success(function (response) {
			console.log(response.records);
			$scope.subscription_time = response.records;

			$scope.subscription_minutes_left = 0;
			for(x in $scope.subscription_time){
				$scope.subscription_minutes_leftover = parseInt($scope.subscription_time[x]['minutes']) - parseInt($scope.subscription_time[x]['minutes_used']);
				$scope.subscription_minutes_left += $scope.subscription_minutes_leftover
			}
			console.log($scope.subscription_minutes_left);
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
	console.log($scope.filteredList);
   };


	$scope.selectAll = function(){

		for(x in $scope.filteredList){
			
  			
  			$scope.filteredList[x].selected = true;
			$scope.toggleSelection($scope.filteredList[x].id);
			console.log($scope.filteredList);
			console.log($scope.selection);

		}

		// angular.forEach($scope.filteredList, function (x) {
  //           console.log(x);
  //           var object = $scope.filteredList[x];
		// 	console.log(object['id']);
  //           //item.Selected = $scope.selectedAll;
  //  //          $scope.filteredList[x].selected = true;
		// 	// $scope.toggleSelection($scope.filteredList[x].id);
  //       });

		

	}

    ////selection 

	///creeer pdf
	var tableex = {table: {
					widths: [150, 'auto', 'auto', 'auto', 'auto', 'auto'],
					body: [ 
						[{ text: 'Datum', bold: true }, { text: 'Artikel', bold: true }, { text: 'Info', bold: true }, { text: 'Minuten', bold: true }, { text: 'Tarief', bold: true }, { text: 'Totaal', bold: true }]
						
						]
					},	layout: 'lightHorizontalLines'
				};
	var resume = {table: {body: [ 
						//['1', '2', '3', '4', '5']
						
						]
					}, margin: [0 ,30 ],	layout: 'lightHorizontalLines'
				};

	function subscription_minutes_check(time){

		///subscription_minutes_check minutes left in subscription
		// totaltime that is used to invoice

		//precheck if there are minutes are left
	 	var calculateTime = $scope.subscription_minutes_left - $scope.totaltime;

		
	 	if($scope.subscription_minutes_left == 0){

	 		return "Geen reductie";

	 	}else{

	 		
	 		if($scope.subscription_minutes_left >= time){ //if there are more subscription minutes that total amount on the invoice

	 			var reduction_amount = (time / 60) * 190;

	 			return reduction_amount.toFixed(2) + "m";

	 		
	 		}else{ //if there are less minutes on subscription minutes than total amount on the invoice
	 			
	 			var reduction_amount = ($scope.subscription_minutes_left / 60) * 190;

	 			return reduction_amount.toFixed(2) + "l";

	 		}

	 			
	 		// if(calculateTime == false){
	 		// 	//if there are no subscription minutes left
	 		// 	return Math.abs(calculateTime) + "over minutes" //
	 		// }

	 		// return $scope.subscription_minutes_left + " zijn over"
	 	}


	}

	$scope.loopdeclaration = function(declarationDetail, selectall){
		
		if(!declarationDetail){
			var declarationDetail = $scope.declarationDetail
		}
		console.log(declarationDetail);
		$scope.honorarium = 0;
		$scope.minutes = 0;
		
		for(x in declarationDetail){
			console.log("it is looping")
			//arrValues.contains("Sam"
			
			if(selectall){
				console.log(selectall + "is waarde");

			}else if($scope.selection.indexOf($scope.declarationDetail[x]['id']) < 0){
				console.log("Yes it contains value " + $scope.declarationDetail[x]['id'] )
				console.log($scope.selection);
				continue;
				
			}

			//subscription reduced amount

			//subscription time
			$scope.subscription_minutes_left = $scope.subscription_minutes_left - parseFloat($scope.declarationDetail[x]['time']);

			if($scope.subscription_minutes_left >= 0){

				$scope.reduced_hourrate = 130; //reduced hourrate get from database
				$scope.hourrate = $scope.reduced_hourrate + " (a)";
				$scope.amount = parseFloat($scope.declarationDetail[x]['time']) / 60 * $scope.reduced_hourrate ;  //calculate amount with reduced
				$scope.honorarium += $scope.amount; //calculate total amount 

				console.log($scope.amount);
			}else{
				
				$scope.amount = declarationDetail[x]['amount']
				$scope.hourrate = declarationDetail[x]['hourrate']
				$scope.honorarium += parseFloat($scope.declarationDetail[x]['amount']);
			
			}
			
			//count all minutes
			$scope.minutes += parseFloat($scope.declarationDetail[x]['time']);

			var declartion_row = 	[declarationDetail[x]['declaration_date'], 
									declarationDetail[x]['declaration_name'], 
									declarationDetail[x]['comment'], 
									declarationDetail[x]['time'],
									"€ " + $scope.hourrate, 
									"€ " + $scope.amount + ""]
			console.log("it is looping END")
			tableex.table.body.push(declartion_row);
		}

		$scope.office_charge = $scope.honorarium * 0.06;
		$scope.subtotal = $scope.honorarium + $scope.office_charge;
		$scope.btw = $scope.subtotal * 0.21;
		$scope.total = $scope.subtotal * 1.21;

		resume.table.body.push([{ text: 'Honorarium', bold: true }, " ", $scope.minutes + " minuten ", " " , "€ " + $scope.honorarium.toFixed(2) + ""]);
		resume.table.body.push([{ text: 'Abonn. reductie', bold: true }, " ", $scope.subscription_minutes_left + " ", " " , "- € " + subscription_minutes_check($scope.minutes) + ""]);
		resume.table.body.push([{ text: 'Kantoorkosten', bold: true }, "6%", " van ", "€ " + $scope.honorarium.toFixed(2)  + "" , "€ " + $scope.office_charge.toFixed(2) + ""]);
		resume.table.body.push([{ text: 'Subtotaal', bold: true }, " ", " ", " " , "€ " + $scope.subtotal.toFixed(2) + ""]);
		resume.table.body.push([{ text: 'BTW', bold: true }, "21%", " van ", "€ " + $scope.subtotal.toFixed(2) + "" , "€ " + $scope.btw.toFixed(2) + ""]);
		resume.table.body.push([{ text: 'Totaal', bold: true }, " ", " ", " " , "€ " + $scope.total.toFixed(2) + ""]);


		console.log($scope.office_charge + " " + $scope.subtotal + " " + $scope.btw + " " + $scope.total + " ");

		console.log($scope.honorarium);

	}
	


var docDefinition = {
	// a string or { width: number, height: number }
  	pageSize: 'A4',

  	// by default we use portrait, you can change it to landscape if you wish
  	pageOrientation: 'landscape',

  	// [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
  	pageMargins: [ 40, 10, 40, 20 ],

   header: function(page, pages) { 
	    return { 
	        columns: [ 
	            'Left part of footer',
	            { 
	                alignment: 'right',
	                text: [
	                    { text: page.toString(), italics: true },
	                    ' of ',
	                    { text: pages.toString(), italics: true }
	                ]
	            }
	        ],
	        margin: [10, 0]
	    };
	},
   footer: function(page, pages) { 
	    return { 
	        columns: [ 
	            {
			       text: [
			         
			         { text: 'Mail: info@kokeradvocaten.nl | Web: www.kokeradvocaten.nl | Tel: (020) - 441 11 92 ', fontSize: 8 }
			       ]
			    },
	            { 
	                alignment: 'right',
	                text: [
	                    { text: page.toString(), italics: true },
	                    ' of ',
	                    { text: pages.toString(), italics: true }
	                ]
	            }
	        ],
	        margin: [40, 0]
	    };
	},
	content: [
     	// if you don't need styles, you can use a simple string to define a paragraph
     	// 'Tussentijdse PDF',

    	 // using a { text: '...' } object lets you set styling properties
     	{ text: 'HONORARIUM', fontSize: 15, bold: true },
     	// if you set pass an array instead of a string, you'll be able
     	// to style any fragment individually
     	{
	       text: [
	         { text: 'Uren registratie ', fontSize: 14 }
	       ], margin: [0 ,30 ]
	    }
   ]
 };

 docDefinition.content.push(tableex);
 docDefinition.content.push(resume);
 console.log(docDefinition.content);

 $scope.downloadPDF = function(){
 	$scope.loopdeclaration();
 	pdfMake.createPdf(docDefinition).open();
 	docDefinition.content[2]['table']['body'] = [];
 	docDefinition.content[3]['table']['body'] = [];
 	console.log(docDefinition.content[2])
 	console.log(docDefinition.content)
 } ;


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

	$scope.downloadInvoice = function(invoiced){

		$scope.download = {}
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


	 } ;





})

