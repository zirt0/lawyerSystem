function createPDFfunction ($scope, $rootScope, base64, $window, $http, $filter){

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
	 	var calculateTime = $scope.usersubscription.minutes_left - $scope.totaltime;

		
	 	if($scope.usersubscription.minutes_left == 0){

	 		return "Geen reductie";

	 	}else{

	 		
	 		if($scope.usersubscription.minutes_left >= time){ //if there are more subscription minutes that total amount on the invoice

	 			var reduction_amount = (time / 60) * 190;

	 			return reduction_amount.toFixed(2);

	 		
	 		}else{ //if there are less minutes on subscription minutes than total amount on the invoice
	 			
	 			var reduction_amount = ($scope.usersubscription.minutes_left / 60) * 190;

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

			var amount = declarationDetail[x]['amount'];
			var	hourrate = declarationDetail[x]['hourrate'];
			var time = declarationDetail[x]['time']

			//check if there is an abbo
			if($scope.usersubscription.abo === true){

				console.log("Loop door declaraties met ABBO");
				//subscription reduced amount
				//subscription time
				
				///is het geen adviesdossier?
				if ($scope.caseDetails.adviesdossier == '0') {

					console.log("adviesdossier === 0")
					//var amount = 
					var	hourrate = 130;
					var amount = parseFloat((hourrate / 60) * time).toFixed(2);
					console.log(amount)

				
				}else{
					// adviesdossier
					console.log("adviesdossier === 1");
					
					$scope.usersubscription.minutes_left_before = $scope.usersubscription.minutes_left - parseFloat($scope.declarationDetail[x]['time']);
					console.log($scope.usersubscription.minutes_left);
					if($scope.usersubscription.minutes_left_before >= 0){
						
						console.log($scope.declarationDetail[x]['declaration_date']);
						console.log($scope.usersubscription.start_date);
						console.log($scope.usersubscription.end_date);

						var check_date = new Date($scope.declarationDetail[x]['declaration_date'])
						var from_date = new Date($scope.usersubscription.start_date);
						var	to_date = new Date($scope.usersubscription.end_date);

						//valt de declaratie binnen abonnementtijd
						if(check_date >= from_date && check_date <= to_date){

							console.log("VALT BINNEN ABONEMENT TIJD");
							///when you have enough minutes to use
							$scope.usersubscription.minutes_left = $scope.usersubscription.minutes_left - parseFloat($scope.declarationDetail[x]['time']);
							var	hourrate = "ABO";
							var amount = 0;
							console.log($scope.usersubscription.minutes_left);

						}else{

							console.log("VALT BUITEN ADVIESDOSSIER")
						}
					}else{
						//when you dont have enough minutes to use
						var	hourrate = 130;
						var amount = ((hourrate / 60) * time).toFixed(2);
						console.log(amount)

					}
				
				}


			}else{ //als er geen abbo is normaal tarief

				//count all amounts
				console.log("Geen abo")
				

			}

			$scope.honorarium += parseFloat(amount);
			$scope.minutes += parseFloat($scope.declarationDetail[x]['time']);


			var declartion_row = 	[declarationDetail[x]['declaration_date'], 
									declarationDetail[x]['declaration_name'], 
									declarationDetail[x]['comment'], 
									declarationDetail[x]['time'],
									hourrate + "", 
									amount + ""]
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

		$scope.invoiceInfo.honorarium_discount = $scope.honorarium_discount.toFixed(2);
		$scope.invoiceInfo.office_charge = $scope.office_charge.toFixed(2);
		$scope.invoiceInfo.btw = $scope.btw.toFixed(2); //btw
		$scope.invoiceInfo.subtotal = $scope.subtotal.toFixed(2); //zonder btw
		$scope.invoiceInfo.total = $scope.total.toFixed(2) //met btw
		$scope.invoiceInfo.belaste_ver = $scope.declaration_credits.total_tax.toFixed(2);
		$scope.invoiceInfo.onbelaste_ver = $scope.declaration_credits.total_no_tax.toFixed(2);
		$scope.invoiceInfo.total_onbelaste_verschotten = $scope.total_onbelaste_verschotten.toFixed(2);

		console.log($scope.office_charge + " " + $scope.subtotal + " " + $scope.btw + " " + $scope.total + " ");

		console.log($scope.honorarium);
		$scope.createInvoicePDF();

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


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd='0'+dd
} 

if(mm<10) {
    mm='0'+mm
} 

today = dd+'-'+mm+'-'+yyyy;


$scope.createInvoicePDF = function(){
	var invoicePDF = {
	content: [
		{ 
			text: '' + $scope.invoiceInfo.customerInfo.company + ' \n ' + $scope.invoiceInfo.customerInfo.address +' \n ' + $scope.invoiceInfo.customerInfo.zipcode + ' ' + $scope.invoiceInfo.customerInfo.city + '  ',
			style: 'adres' 
		},
		'\n\n\n\n\n\n\n',
		{
			text: 'Datum: '+ today + ' \n\nDossiernr: '+ $scope.invoiceInfo.case_id + ' \n\n Factuurnr: ' + $scope.invoiceInfo.invoiceId + '\n\n ',
			style: 'subheader'
		},
		{
			text: 'Declaratie voor: ' + $scope.invoiceInfo.customerInfo.casename + '\n\n',
			style: 'subheader'
		},
		{
				style: 'tableExample',
				table: {
						headerRows: 1,
						body: [
								[ 'Honorarium',{ text: '', marginRight: 100 },'€', { text: '' + $scope.invoiceInfo.honorarium_discount + '', alignment: 'right' },' ' ],
								[ 'Belaste verschotten',' ','€', '' + $scope.invoiceInfo.belaste_ver + '','+' ],
								[ '',' ','€', '' + $scope.invoiceInfo.subtotal + '',' ' ],
							    [ '','','', '',' '],
								[ 'BTW21%',' ','€', '' + $scope.invoiceInfo.btw + '','+' ],
								[ '',' ','€', '' + $scope.invoiceInfo.total + '',' ' ],
								[ '',' ','', '',' ' ],
								[ 'Onbelaste verschotten',' ','€', '' + $scope.invoiceInfo.onbelaste_ver + '','+' ],
								[ 'Totaal van deze factuur',' ','€', '' + $scope.invoiceInfo.total_onbelaste_verschotten + '',' ' ],
								[ '',' ','', '',' ' ],
								[ 'Door u te voldoen',' ','€', '' + $scope.invoiceInfo.total_onbelaste_verschotten + '' ,' ' ],

						]
				},
				layout: 'noBorders'
		},
		'\n',
		'Het openstaande besdrag dient uiterlijk op de hierboven aangegeven uiterste betaaldag op op de onderstaande bankrekening bijgeschreven te zijn. Bij te laat betalingbent u in gebreken en in verzuim zonder dat hiertoe nog een ingebrekenstelling nodig is. Alsdan zal er wettelijke rente en zonodig buitengerechtelijke incassokosten in rekening worden gebracht.\n\n',
		
	
		{
				style: 'tableExample',
				table: {
						headerRows: 1,
						body: [
								[ 'BTW nummer', '1465.53.822.B.01' ],
								[ 'KVK nummer', '34322784' ],
								[ 'IBAN nummer', 'NL12ABNA0534507786' ],
								[ 'BIC nummer', 'ABNANL2A' ],

						]
				},
				layout: 'noBorders'
		}
	],
	styles: {
		adres: {
			fontSize: 13,
			bold: true,
			alignment: 'right'
		},
		subheader: {
			fontSize: 13,
			bold: false
		},
		quote: {
			italics: true
		},
		small: {
			fontSize: 12
		}
	}
}	
pdfMake.createPdf(invoicePDF).open();
}




 $scope.downloadPDF = function(data){
 	$scope.loopdeclaration();
 	console.log($scope.declaration_credits.case_id);
 	pdfMake.createPdf(docDefinition).open();
 	
 	


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
 	console.log($scope.invoiceDetail)
	
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