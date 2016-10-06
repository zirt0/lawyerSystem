function createPDFfunction ($scope, $rootScope, base64, $window, $http){

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

	 			return reduction_amount.toFixed(2);

	 		
	 		}else{ //if there are less minutes on subscription minutes than total amount on the invoice
	 			
	 			var reduction_amount = ($scope.subscription_minutes_left / 60) * 190;

	 			return reduction_amount.toFixed(2);

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
		$scope.office_charge = 0;
		
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
			// $scope.subscription_minutes_left_before = $scope.subscription_minutes_left - parseFloat($scope.declarationDetail[x]['time']);

			// if($scope.subscription_minutes_left_before > 0){
					
			// 	$scope.subscription_minutes_left = $scope.subscription_minutes_left - parseFloat($scope.declarationDetail[x]['time']);
			// } 

			//count all amounts
			$scope.honorarium += parseFloat($scope.declarationDetail[x]['amount']);
			$scope.minutes += parseFloat($scope.declarationDetail[x]['time']);

			var declartion_row = 	[declarationDetail[x]['declaration_date'], 
									declarationDetail[x]['declaration_name'], 
									declarationDetail[x]['comment'], 
									declarationDetail[x]['time'],
									declarationDetail[x]['hourrate'], 
									declarationDetail[x]['amount']]
			console.log("it is looping END")
			tableex.table.body.push(declartion_row);
		}

		//check if there is a discount
		if($scope.invoiceInfo.discountType === 'none' ){
			$scope.invoiceInfo.discountAmount = 0;
		}else if ($scope.invoiceInfo.discountType === 'percentage' ){
			$scope.invoiceInfo.percentage = $scope.invoiceInfo.discountAmount
			$scope.invoiceInfo.discountAmount = (($scope.honorarium / 100) * $scope.invoiceInfo.discountAmount).toFixed(2)
		}

		$scope.honorarium_totaal = $scope.honorarium;
		$scope.honorarium_discount = $scope.honorarium - $scope.invoiceInfo.discountAmount;
		//$scope.honorarium = $scope.honorarium - subscription_minutes_check($scope.minutes);
		console.log($scope.caseDetails['btw']);
		if($scope.caseDetails['office_charge'] == "1"){
			$scope.office_charge = $scope.honorarium_discount * 0.06;
		}else{
			$scope.office_charge = 0;
		}
		
		$scope.belaste_verschotten = $scope.office_charge + $scope.declaration_credits.total_tax;
		$scope.subtotal = $scope.honorarium_discount + $scope.belaste_verschotten;
		if($scope.caseDetails['btw'] == 1){
			$scope.btw = $scope.subtotal * 0.21;
			$scope.total = $scope.subtotal * 1.21;
		}else{
			$scope.btw = 0;
			$scope.total = $scope.subtotal;
		}
		
		$scope.total_onbelaste_verschotten = $scope.total + $scope.declaration_credits.total_no_tax;

		resume.table.body.push([{ text: 'Honorarium', bold: true }, " ", $scope.minutes + " minuten ", " " , "€ " + $scope.honorarium_totaal.toFixed(2) + ""]);
		//resume.table.body.push([{ text: 'Abonn. reductie', bold: true }, " ", $scope.subscription_minutes_left + " ", " " , "- € " + subscription_minutes_check($scope.minutes) + ""]);
		
		//check if there is a discount
		if($scope.invoiceInfo.discountType != 'none' ){
			
			if($scope.invoiceInfo.discountType === 'bedrag'){
				resume.table.body.push([{ text: 'Korting', bold: true }, "", "€ " +$scope.invoiceInfo.discountAmount + " ", " " , "- € " + $scope.honorarium_discount.toFixed(2) + ""]);
			}else{
				resume.table.body.push([{ text: 'Korting', bold: true }, $scope.invoiceInfo.percentage + "%  ", $scope.invoiceInfo.discountAmount + " ", " " , "- € " + $scope.honorarium_discount.toFixed(2) + ""]);
			}
		}
		
		resume.table.body.push([{ text: 'Kantoorkosten', bold: true }, "6%", " van ", "€ " + $scope.honorarium_discount.toFixed(2)  + "" , "€ " + $scope.office_charge.toFixed(2) + ""]);
		resume.table.body.push([{ text: 'Belaste verschotten', bold: true }, "", "", "" , "€ " + $scope.declaration_credits.total_tax.toFixed(2) + ""]);
		resume.table.body.push([{ text: 'Subtotaal', bold: true }, " ", " ", " " , "€ " + $scope.subtotal.toFixed(2) + ""]);
		resume.table.body.push([{ text: 'BTW', bold: true }, "21%", " van ", "€ " + $scope.subtotal.toFixed(2) + "" , "€ " + $scope.btw.toFixed(2) + ""]);
		resume.table.body.push([{ text: 'Onbelaste verschotten', bold: true }, "", " van ", "" , "€ " + $scope.declaration_credits.total_no_tax.toFixed(2) + ""]);
		resume.table.body.push([{ text: 'Totaal', bold: true }, " ", " ", " " , "€ " + $scope.total_onbelaste_verschotten.toFixed(2) + ""]);


		$scope.invoiceInfo.belaste_ver = $scope.declaration_credits.total_tax.toFixed(2);
		$scope.invoiceInfo.onbelaste_ver = $scope.declaration_credits.total_no_tax.toFixed(2);
		$scope.invoiceInfo.total_onbelaste_verschotten = $scope.total_onbelaste_verschotten.toFixed(2);

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



 $scope.downloadPDF = function(data){
 	$scope.loopdeclaration();
 	console.log($scope.declaration_credits.case_id);
 	pdfMake.createPdf(docDefinition).open();
 	

	// pdfMake.createPdf(docDefinition).getBuffer(function(dataURL) {
	    

	//     console.log(dataURL);

	//     console.log("adem is king");
 //        var file = new Blob([dataURL], {type: 'application/pdf'});
 //        console.log(file);
 // 		$scope.fileURL = URL.createObjectURL(file);
 // 		console.log($scope.fileURL);
 // 		$window.open($scope.fileURL, 'test', file);


	// });
 if(data){
 	pdfMake.createPdf(docDefinition).getBase64(function(dataURL){
 		console.log(dataURL);
 		$scope.invoiceInfo.pdf_one = dataURL;
 		console.log($scope.invoiceInfo);

		$http.post("server/insert.php",{'subject': "insert_invoice", 'args': $scope.invoiceInfo})
		.success(function (response) {
			console.log(response)
		});

		$rootScope.update_option('invoice_number', $scope.invoiceInfo.invoiceId.substring(4));

 	});
 }

 	docDefinition.content[2]['table']['body'] = [];
 	docDefinition.content[3]['table']['body'] = [];
 	console.log(docDefinition.content[2]);
 	console.log(docDefinition.content);
	
 } ;

$scope.createInvoice = function(){

 	//check selected rows
 	console.log($scope.selection);
 	$scope.invoiceInfo.user_id = $rootScope.userDetail.id;
 	$scope.invoiceInfo.selected = $scope.selection;
 	$scope.invoiceInfo.credits = $scope.declaration_credits.credits; 

 	var data = true
 	$scope.downloadPDF(data);

 	//add declaration invoice nummer
	console.log($scope.invoiceInfo);
 	$http.post("server/update.php",{'subject': "update_declarations", 'args': $scope.invoiceInfo})
	.success(function (response) {
		console.log(response)
	});
	//add declaration credits invoice nummer
	console.log($scope.invoiceInfo);
 	$http.post("server/update.php",{'subject': "update_declarations_credits", 'args': $scope.invoiceInfo})
	.success(function (response) {
		console.log(response)
	});

	//add invoice nummer

	$rootScope.succesModalBox(true,'Factuur is succesvol aangemaakt', '/declarations/'+ $scope.declaration_credits.case_id)
	$scope.closeInvoiceModal();
	
 }


}