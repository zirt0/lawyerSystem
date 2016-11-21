app.controller('caseDetailCtrl',function($rootScope, $scope, $http, $filter, $routeParams){

	$rootScope.pageData.header = "Dossier";
	$rootScope.pageData.subtitle = "Overzicht";
	$rootScope.pageData.breadcrumps = ["Dossier"];

	$scope.editCaseDetails = true;
	//$scope.case = {};

	$scope.caseDetail = {};
	$scope.caseDetail.caseId = $routeParams.id;

	$scope.case = {};


	console.log("case id " + $scope.caseDetail.caseId);

	//get customerinfo
	$http.post("server/read.php",{
		'subject': "casedetail", 'id': $scope.caseDetail.caseId
	}).success(function (response) {
		$scope.case = response;
		console.log($scope.case);

		//switches
		$scope.case.process = boleonType($scope.case.process);
		$scope.case.confidential = boleonType($scope.case.confidential);
		$scope.case.toevoeging = boleonType($scope.case.toevoeging);
		$scope.case.office_charge = boleonType($scope.case.office_charge);
		$scope.case.btw = boleonType($scope.case.btw);
		$scope.case.opponentcheck = checkOpponent($scope.case.opponent_id);
		$scope.case.adviesdossier = checkOpponent($scope.case.adviesdossier);
		$scope.case.incassodossier = checkOpponent($scope.case.incassodossier);
		//adviesdossier
		$rootScope.pageData.breadcrumps.push($scope.case.casename);
	});

	$scope.editCase = function(){
		
        $scope.editCaseDetails = false;
		console.log("EditCase");

	};

	$scope.cancelCase = function(){

		$scope.editCaseDetails = true;
		$scope.case.process = true;
		console.log("cancel");

	};

	$scope.saveCase = function(){
		//save case
		$http.post("server/update.php",{'subject': "update_case", 'args': $scope.case
		}).success(function (response) {
			//$scope.case = response;
			console.log(response);
			console.log("ademmm");
			$rootScope.succesModalBox(true,'Uw mutaties zijn succesvol opgeslagen')
			$scope.editCaseDetails = true;
		});	
		console.log("savecaseee");
	};

	$scope.closeCase = function(){
		console.log("closecase");

		var r = confirm("Weet u zeker dat u wilt verwijderen?");
	    if (r == true) {
	    	$http.post("server/update.php",{'subject': "close_case", 'id': $scope.caseDetail.caseId
			}).success(function (response) {
				$scope.case = response;
				console.log($scope.case);
				$rootScope.succesModalBox(true,'Dossier is succesvol gesloten', '/cases');
			});	
	    }
		

		

	}


	function checkOpponent(input){
		if(input != 0 ){
			return true;
		}else{
			return false;
		}
	}
	function boleonType(value){
		if(value == "true" || value == 1){
			return true;
		}else{
			return false;
		}

	}

	$rootScope.boleonTypeCircle = function(value){
		//console.log("test" +  value);
		if(value == "true" || value == 1){
			return '<div class="text-green fontello-record"></div>';
		}else{
			return '<div class="text-red fontello-record"></div>';
		}

	}

	//get caseType
	$http.post("server/read.php",{
		'subject': "case_type"
	}).success(function (response) {
		$scope.case_type_all = response.records;
		console.log($scope.case_type_all);
	});

	/////////////////////////////////
	////// declaration 
	$scope.declaration = {};
	$scope.declaration.case_id = $scope.caseDetail.caseId;
	$scope.declaration.user_id = $rootScope.userDetail.id;
	console.log($scope.declaration);


	//get caseType
	$http.post("server/read.php",{
		'subject': "declaration_type"
	}).success(function (response) {
		$scope.declaration_type = response.records;
		console.log($scope.declaration_type);
	});
	$scope.declaration.case_id = $routeParams.id;
	$scope.declaration.time = 0 ;
	//$scope.declaration.hourrate = 190;
	$scope.declaration.amount = 0;
	$scope.declaration.calc_to_min = 0;

	$scope.$watch('declaration.time', function() {
        console.log("Declaration minutes are changed");
        $scope.declaration.amount = (parseInt($rootScope.userDetail.hourrate)/ 60) * $scope.declaration.time;
        $scope.declaration.amount = $scope.declaration.amount.toFixed(2)
        $scope.declaration.calc_to_min = $scope.declaration.time;

    });

	$scope.declaration_date = moment();

    $scope.declaration_save = function(){

    	$scope.declaration.declaration_date = $scope.declaration_date.format('YYYY-MM-DD HH:mm:ss');
		console.log($scope.args);
		//return false;
		$scope.declaration.choice = $scope.declaration.selectedDeclaration.id;
    	console.log($scope.declaration.choice)
    	if(!$scope.declaration.choice || !$scope.declaration.time){
    		console.log("error")
    		$rootScope.succesModalBox(false, "vul alle velden in");

    		return false;
    	}

    	console.log($scope.declaration);
    	console.log($scope.declaration_summary);
    	//$scope.declaration_summary.push($scope.declaration)
    	console.log($scope.declaration_summary);
    	
    	//return false;

    	$http.post("server/insert.php",{
		'subject': "declaration_add", 'args': $scope.declaration
		}).success(function (response) {
			//$scope.case = response;
			console.log(response);

			$rootScope.succesModalBox(true, "Declaratie is succesvol opgeslagen");

			$scope.declaration_saved = true;
			$scope.declaration.time = 0 ;
			$scope.declaration.info = ""
						
			$scope.loadDeclaration();

		});
    }

    $scope.startTime;
	$scope.finishTime;
	$scope.stopButton = false;
	$scope.startButton = true;

	//stopwatch 
	$scope.startClock = function(){
		$scope.startTime = new Date();
		$scope.stopButton = true;
		$scope.startButton = false;
	}

	$scope.finishClock = function(){
		
		//import afronden van db
		$scope.min_minutes = 3;

		$scope.finishTime = new Date();	
		var difference = $scope.finishTime - $scope.startTime;
		console.log(difference + " miliseconds");
		var difference = difference / 1000 ; //make seconds
		console.log(difference + " seconds");
		var difference = difference / 60 ; //make minutes
		console.log(difference + " minutes");

		$scope.declaration.time = difference.toFixed(2);
		
		//afronden op 3 tallen 
		if(difference <= $scope.min_minutes ){

			$scope.declaration.time =  $scope.min_minutes;
			
		}

		$scope.declaration.amount = (parseInt($rootScope.userDetail.hourrate)/ 60) * $scope.declaration.time;
        $scope.declaration.amount = $scope.declaration.amount.toFixed(2)
        //$scope.declaration.calc_to_min = $scope.declaration.time;

		$scope.stopButton = false;
		$scope.startButton = true;

		alert($scope.declaration.time);
	}


	//////declaration summary
	$scope.args = {};
	$scope.args.limit = 5;
	$scope.args.case_id = $scope.declaration.case_id;
	
	$scope.loadDeclaration = function(){
		$http.post("server/read.php",{
		'subject': "declarations", 'decl': $scope.args
		}).success(function (response) {
			console.log(response);
			$scope.declaration_summary = response.records;
		});
	}
	$scope.loadDeclaration();

	//total minutes declarations used
	$scope.totalMinutesUsed = function(){
		$scope.declarationMinutes = {};
		$scope.declarationMinutes.case_id = $scope.declaration.case_id;
		$http.post("server/read.php",{
		'subject': "declarations_minutes", 'args': $scope.declarationMinutes
		}).success(function (response) {
			console.log(response);
			$scope.case.total_minute = response.records[0].total_minutes;
			///$scope.declaration_summary = response.records;
		});
	}
	$scope.totalMinutesUsed();

	$scope.totalMinutesUsedInvoiced = function(){
		$scope.declarationMinutes = {};
		$scope.declarationMinutes.case_id = $scope.declaration.case_id;
		$scope.declarationMinutes.check_invoiced = true;

		$http.post("server/read.php",{
		'subject': "declarations_minutes", 'args': $scope.declarationMinutes
		}).success(function (response) {
			console.log(response);
			$scope.case.total_minute_invoiced = response.records[0].total_minutes;
			///$scope.declaration_summary = response.records;
		});
	}
	$scope.totalMinutesUsedInvoiced();

	$scope.totalMinutesUsedNotInvoiced = function(){
		$scope.declarationMinutes = {};
		$scope.declarationMinutes.case_id = $scope.declaration.case_id;
		$scope.declarationMinutes.check_not_invoiced = true;

		$http.post("server/read.php",{
		'subject': "declarations_minutes", 'args': $scope.declarationMinutes
		}).success(function (response) {
			console.log(response);
			$scope.case.total_minute_not_invoiced = response.records[0].total_minutes;
			///$scope.declaration_summary = response.records;
		});
	}
	$scope.totalMinutesUsedNotInvoiced();



	$scope.notes = {};
	$scope.notes.from_user_id = $rootScope.userDetail.id;
	console.log($scope.notes.from_user_id);
	$scope.notes.case_id = $routeParams.id + "";

	$scope.showModal = function(){

		$http.post("server/read.php",{
		'subject': "users"}).success(function (response) {
			
			$scope.notes.users = response.records;
			console.log($scope.notes.users);
		
		});

		console.log("clicked on showmodal");
		$scope.notes.modal = true;
	}

	$scope.appointment = {};
	$scope.showAppointmentModal = function(){

		$http.post("server/read.php",{
		'subject': "users"}).success(function (response) {
			
			$scope.notes.users = response.records;
			console.log($scope.notes.users);
		
		});

		console.log("clicked on appointment");
		$scope.appointment.modal = true;
	}

	$scope.closeAppointmentModal = function(){
		console.log("clicked on showmodal");
		$scope.appointment.modal = false;
	}

	$scope.closeModal = function(){
		console.log("clicked on showmodal");
		$scope.notes.modal = false;
	}

	$scope.saveNote = function(){

		//$scope.notes.from_user_id = "1";	

		console.log($scope.notes);
		if(!$scope.notes.to_user_id){

			$scope.notes.to_user_idError = "red";

		}else{
			$scope.notes.to_user_idError = "";
		}

		if(!$scope.notes.content){
			$scope.notes.contentError = "red";

		}else{
			$scope.notes.contentError = "";
		}

		console.log($scope.notes);

		if($scope.notes.to_user_id && $scope.notes.content){

			console.log($scope.notes);

			$scope.notes.content = escapeHtml($scope.notes.content);
			
			$http.post("server/insert.php",{
			'subject': "notes_add", 'args': $scope.notes})
			.success(function (response) {
				console.log(response);
				$scope.notes.modal = false;
				$scope.notes.to_user_id = "";
				$scope.notes.content = "";

				$rootScope.succesModalBox(true, "Notitie is succesvol opgeslagen", "/cases/" + $scope.notes.case_id )

				$scope.getNotes();
				//$scope.declaration_summary = response.records;
			});
		}

		
		//console.log($scope.notes);
	}

	function escapeHtml(unsafe) {
	    return unsafe
	         .replace(/&/g, "&amp;")
	         .replace(/</g, "&lt;")
	         .replace(/>/g, "&gt;")
	         .replace(/"/g, "&quot;")
	         .replace(/'/g, "&#039;");
	 }

	 $scope.getNotes = function (){
		$http.post("server/read.php",{'subject': "notes", 'args': $scope.args})
		.success(function (response) {
			console.log(response)
			$scope.notes_from = response.records

		}); 	
	 }

	 $scope.getNotes();

	
	
	$scope.makelarger = function(){
		console.log("makelarger");
		$scope.large_height = "largeheight";
	}
	$scope.makesmaller = function(){
		console.log("make smaller");
		$scope.large_height = "smallheight";
	}


	$scope.declaration_credits = {};

	$scope.paymentSave = function(){

		$scope.declaration_credits.case_id = $routeParams.id;


		if(!$scope.declaration_credits.credit_name){

			$scope.declaration_credits.credit_namError = "red";

		}else{
			$scope.declaration_credits.credit_namError = "";
		}

		if(!$scope.declaration_credits.price_ex_btw){

			$scope.declaration_credits.price_ex_btwError = "red";

		}else{
			$scope.declaration_credits.price_ex_btwError = "";
		}

		if(!$scope.declaration_credits.credit_name || !$scope.declaration_credits.price_ex_btw){
			return false;
		}

		$scope.declaration_credits.price_ex_btw = $scope.declaration_credits.price_ex_btw.replace(/,/g, '.')


		$http.post("server/insert.php",{'subject': "insert_declaration_credits", 'args': $scope.declaration_credits})
		.success(function (response) {
			console.log(response)
			//$scope.notes_from = response.records
			$scope.declaration_credits.credit_name = "";
			$scope.declaration_credits.price_ex_btw = "";
			$scope.declaration_credits.btw = "";

			$rootScope.succesModalBox(true,'Uitgave is succesvol opgeslagen')
		});

	}

	$scope.add_lawyer = {};
	$scope.add_lawyer.save = function(){

		console.log($scope.add_lawyer);
		// $http.post("server/insert.php",{'subject': "add_lawyer", 'args': $scope.add_lawyer})
		// .success(function (response) {
		// 	console.log(response)
		// 	$scope.notes_from = response.records

		// });

		angular.forEach($scope.add_lawyer, function(value, key) {
		  
			if(key != 'save'){
				console.log(key + ': ' + value);
				$scope.key = "";
			}
		  
		
		});

	}

})