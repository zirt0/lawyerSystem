app.controller('testCtrl',function($scope, $rootScope, $http, $window){

	console.log("testcase")

	$http.post("server/read.php",{'subject': "testcase"})
		.success(function (response) {
		console.log(response.records)

	});

	$scope.declaration_date = moment();

	$scope.$watch('declaration_date', function() {
    console.log("Declaration minutes are changed");
        

    });

	// var win = window.open("","_blank","titlebar=yes");
 //        win.document.title = "My Title";
 //        win.document.write('<html><body>');
 //        win.document.write(base);
 //        win.document.write('</body></html>');
 //        layer = jQuery(base);

	//base = $base64.decode(unescape(encodeURIComponent(base)))
	//console.log(base);
	// //console.log(base);
	// pdfMake.createPdf().open();

	// var file = new Blob([dataURL], {type: 'application/pdf'});
 // 		$scope.fileURL = URL.createObjectURL(file);
 // 		console.log($scope.fileURL);
 // 		$window.open($scope.fileURL, 'test', file);


})
