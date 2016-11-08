	var app = angular.module('APP',['ngRoute', 'ngCookies', 'ngSanitize', 'angular-table','ngAnimate', 'angular-md5', 'ab-base64', 'base64','ngFileSaver', 'datePicker', 'angularMoment', 'chart.js']);
	console.log("sadasdadssa");
	app.filter("sanitize", ['$sce', function($sce) {
		return function(htmlCode){
			return $sce.trustAsHtml(htmlCode);
		}
	}]);

	app.filter('boleon', function() {
    	return function(input) {
		    if(input == "true"){
		      	return true;
		    }else{
	      		return false;
	      	}
	  	}
	});

	app.filter('orderObjectBy', function(){
	 return function(input, attribute) {
	    if (!angular.isObject(input)) return input;

	    var array = [];
	    for(var objectKey in input) {
	        array.push(input[objectKey]);
	    }

	    array.sort(function(a, b){
	        a = parseInt(a[attribute]);
	        b = parseInt(b[attribute]);
	        return a - b;
	    });
	    return array;
	 }
	});


	app.config(function($routeProvider){

		console.log("RouteProvider");
		
		$routeProvider
		.when('/login', {
		    controller: 'loginCtrl',
		    templateUrl: 'partials/login.html'
		})
		.when('/dashboard', {
		    controller: 'dashboardCtrl',
		    templateUrl: 'partials/dashboard.html'
		})
		.when('/stats', {
		    controller: 'statsCtrl',
		    templateUrl: 'partials/stats.html'
		})
		.when('/customers', {
		    controller: 'customersCtrl',
		    templateUrl: 'partials/customers.html'
		})
		$routeProvider
		.when('/customers/:id', {
		    controller: 'customerCtrl',
		    templateUrl: 'partials/customer_details.html'
		})
		.when('/customers/:id/create', {
		    controller: 'createCaseCtrl',
		    templateUrl: 'partials/case_create.html'
		})
		.when('/customers/add/customer', {
		    controller: 'createCustomerCtrl',
		    templateUrl: 'partials/create_customer.html'
		})
		.when('/cases', {
		    controller: 'caseCtrl',
		    templateUrl: 'partials/cases.html'
		})
		.when('/cases/:id', {
		    controller: 'caseDetailCtrl',
		    templateUrl: 'partials/case_details.html'
		})
		.when('/cases/:id/notes', {
		    controller: 'caseDetailCtrl',
		    templateUrl: 'partials/notes.html'
		})
		.when('/declarations', {
		    controller: 'declarationsCtrl',
		    templateUrl: 'partials/declarations.html'
		})
		.when('/declarations/:id', {
		    controller: 'declarationDetailsCtrl',
		    templateUrl: 'partials/declaration_details.html'
		})
		.when('/declarations/:id/credits', {
		    controller: 'declarationDetailsCtrl',
		    templateUrl: 'partials/declarations/declaration_credits_details.html'
		})
		.when('/credits/', {
		    controller: 'creditsCtrl',
		    templateUrl: 'partials/declarations/declaration_credits.html'
		})

		.when('/invoices', {
		    controller: 'invoicesCtrl',
		    templateUrl: 'partials/invoices.html'
		})
		.when('/invoices/:id', {
		    controller: 'invoicesDetailCtrl',
		    templateUrl: 'partials/invoices.html'
		})
		.when('/invoices/:id/payment', {
		    controller: 'paymentDetailCtrl',
		    templateUrl: 'partials/payment.html'
		})
		.when('/users', {
		    controller: 'usersCtrl',
		    templateUrl: 'partials/users.html'
		})
		.when('/users/:id', {
		    controller: 'userDetailsCtrl',
		    templateUrl: 'partials/user_detail.html'
		})
		.when('/settings', {
		    controller: 'settingsCtrl',
		    templateUrl: 'partials/settings.html'
		})
		.when('/subscriptions', {
		    controller: 'subscriptionsCtrl',
		    templateUrl: 'partials/subscriptions.html'
		})
		.when('/test', {
		    controller: 'testCtrl',
		    templateUrl: 'partials/test.html'
		 })
		.when('/account', {
		    controller: 'accountCtrl',
		    templateUrl: 'partials/account.html'
		 })
		.when('/account/notifications', {
		    controller: 'accountCtrl',
		    templateUrl: 'partials/notifications.html'
		 })
		.when('/profile', {
		    controller: 'profileCtrl',
		    templateUrl: 'partials/profile.html'
		})
		.when('/email', {
		    controller: 'accountCtrl',
		    templateUrl: 'partials/email/quickstart.html'
		 })
		.when('/opponents', {
		    controller: 'opponentsCtrl',
		    templateUrl: 'partials/opponents.html'
		 })
		.when('/opponents/lawyers', {
		    controller: 'opponent_lawyersCtrl',
		    templateUrl: 'partials/opponent_lawyers.html'
		 })
		.otherwise({
			redirectTo:'/dashboard'
		});

		//$locationProvider.html5Mode(true)
	})

	app.run(function($rootScope, $cookies, $http, $location, $timeout){

		$rootScope.userDetail = {};
		$rootScope.login = {};
		$rootScope.pageData = {};

		console.log($cookies.get('loggedIn'));
		console.log($cookies)
		if($cookies.get('loggedIn') == "true"){

			console.log("COOKIE YES" + $cookies.get('username') + " " + $cookies.get('password'));
			$rootScope.login.username = $cookies.get('username');
			$rootScope.login.password = $cookies.get('password');
			console.log($rootScope.login);
			
			$http.post("server/read.php",{'subject': "login", 'args': $rootScope.login })
	        	.success(function (response) {

	        	console.log(response);
	        	$rootScope.userDetailsFnc(response);
	        	$rootScope.loggedIn = true;

		   	});
			
		}else{
			console.log("COOKIE NO");
		}

		//get notification
		$rootScope.getNotification = function(){
			
			args = {};
			args.user_id = $rootScope.userDetail.id;
			args.readed = true;

			//console.log(args);		
			$http.post("server/read.php",{'subject': "notes", "args": args })
			.success(function (response) {
				//console.log("notification return");
				//console.log(response);
				$rootScope.notification = response.records;
				//console.log($rootScope.notification);
			});
		}

		$rootScope.userDetailsFnc = function(response){
			console.log(response);

	   		$rootScope.userDetail.hourrate = response["hourrate"];
			$rootScope.userDetail.fname = response["fname"];
			$rootScope.userDetail.lname = response["lname"];
			$rootScope.userDetail.avatar = response["avatar"];
			$rootScope.userDetail.id = response["id"];
			$rootScope.userDetail.userRole = response["role"];

			//$rootScope.getNotification();
		}
		//$rootScope.getNotification();

		//for searchfield
		$http.post("server/read.php",{'subject': "customers"})
		.success(function (response) {
			$rootScope.searchPeople = response.records;
			console.log($rootScope.searchPeople);
		}); 

		///check every minute for notifications
		var timerID = setInterval(function() {
		    // your code goes here...
		    //console.log("check Notes every 10 seconds")
		    $rootScope.getNotification();
		}, 60 * 100); 

		//$rootScope.getNotification();

		$rootScope.logoutFnc = function(){

			$cookies.remove("username");
			$cookies.remove("password");
			$cookies.remove("loggedIn");
			$rootScope.loggedIn = false;

			console.log("Logout");
		}

		$rootScope.succesModalBox = function(status, message, page){

			if(status){	
				$rootScope.modalBoxSucces = true;
				$rootScope.modalBoxmessage = message;

				$timeout(function(){
					$rootScope.modalBoxSucces = false;
				}, 3000);

				if(page){
					$location.path(page);
				}
				//window.scrollTo(0,0);
			}else{
				$rootScope.modalBoxError = true;
				$rootScope.modalBoxmessage = message;
				//window.scrollTo(0,0);
				$timeout(function(){
					$rootScope.modalBoxError = false;
				}, 3000);

			}

		}

		$rootScope.statusCheck = function(value){
			//console.log(value);
			if(value == "" || value === "null" || value === '0' || value === false){

				return '<i class="fontello-cancel-circled red"></i>';
			}else{
				return '<i class="fontello-check green"></i>';
			}
		}

		console.log($rootScope.loggedIn);


		//update options
		$rootScope.update_option = function(option_name, option_value){
			var args = {}
			args.option_name = option_name;
			args.option_value = option_value;
			$http.post("server/insert.php",{'subject': "options", "args": args })
			.success(function (response) {
				//$scope.declarations = response.records;
				console.log(response);

				$rootScope.succesModalBox(true, "Optie is succesvol opgeslagen");
			});
		}

		$rootScope.get_option = function(option_name){
			$http.post("server/read.php",{'subject': "options", "args": option_name })
			.success(function (response) {
				console.log(response);
				return response;
			});
		}

		$rootScope.colorGenerator = function(value){
	    	
	    	if(value <= 0){

	    		return "#F20556";// red
	    		
	    	}else if(value <= 30){

	    		return "#f39c12"; //orange

	    	}else{
	    		
	    		return "#92CD18"; //green
	    		
	    	}

	    }
	});