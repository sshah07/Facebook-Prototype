/**
 * New node file
 */
//var validator = require('validator');

var facebook = angular.module('facebook', []);
//defining the login controller
facebook.controller('signupFunction', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
	$scope.invalid_login = true;
	$scope.unexpected_error = true;
	$scope.signup = function() {
		
		$http({
			method : "POST",
			url : '/signup',
			data : {
				"firstName" : $scope.firstName,
				"lastName" : $scope.lastName,
				"email" : $scope.email,
				"password" : $scope.password
			}
		}).success(function(data) {
			
			if(data.success == 1)
			{
				window.location.assign("/homepage"); 
			}
			//checking the response data for statusCode
//			if (data.statusCode == 401) {
//				$scope.invalid_login = false;
//				$scope.unexpected_error = true;
//			}
//			else
//				//Making a get call to the '/redirectToHomepage' API
//				window.location.assign("/homepage"); 
		}).error(function(error) {
//			$scope.unexpected_error = false;
//			$scope.invalid_login = true;
		});
	};
})

facebook.controller('signinFunction', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
	$scope.invalid_login = true;
	$scope.unexpected_error = true;
	$scope.signin = function() {
		
//		alert(validator.isEmail('foo@bar.com')); //=> true 
//		alert($scope.session_key);
//		console.log("apoorv");
		
		if($scope.session_key == 'undefined')
		{
			return;
		}
				
		$http({
			method : "POST",
			url : '/signin',
			data : {
				"email" : $scope.session_key,
				"password" : $scope.session_password
			}
		}).success(function(data) {
			if(data.success == 1)
			{
				window.location.assign("/homepage"); 
			} 
		}).error(function(error) {
//			$scope.unexpected_error = false;
//			$scope.invalid_login = true;
		});
	};
})