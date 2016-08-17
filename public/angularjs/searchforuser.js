/**
 * New node file
 */
var facebook = angular.module('facebook', []);
//defining the login controller
facebook.controller('searchController', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false
//	$scope.searchedUsers = [];
	$scope.values = ["apoorv","twinkle"];
	
	$http({
		method : "GET",
		url : '/getSearchedUsers',
		data : {
			"search" : $scope.search
		}
	}).success(function(data) {
		
		
//		alert(data.results[0].wholename);
		$scope.searchedUsers = data.results;
//		alert($scope.searchedUsers.length);
		$scope.$apply();
		
	}).error(function(error) {
	});
})

