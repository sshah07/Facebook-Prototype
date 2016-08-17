/**
 * New node file
 */
var facebook = angular.module('facebook', []);
//defining the login controller
facebook.controller('friendsController', function($scope, $http) {
	
	$scope.searchuser = function() {		
		$http({
			method : "POST",
			url : '/redirectToSearch',
			data : {
				"search" : $scope.search
			}
		}).success(function(data) {
			
			if(data.success == 1)
			{
				window.location.assign("/showSearch"); 
			} 
		}).error(function(error) {
		});
	};
	
	$http.get('/getFriendsList').success(function(data)
	{		
		$scope.friendsList = data.results;
		$scope.$apply();
	});
	
	$scope.acceptRequest = function(friendEmail)
	{		
		$http({
			method : "POST",
			url : '/acceptRequest',
			data : {
				"friendEmail" : friendEmail
			}
		}).success(function(data) {
			
			$scope.friendsList = data.results;
			$scope.$apply();
			
		}).error(function(error) {
		});
	}
})