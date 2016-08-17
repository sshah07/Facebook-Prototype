/**
 * New node file
 */
var facebook = angular.module('facebook', []);

facebook.controller('aboutController', function($scope, $http) {
	//Initializing the 'invalid_login' and 'unexpected_error' 
	//to be hidden in the UI by setting them true,
	//Note: They become visible when we set them to false

	$http.get('/getAbout').success(function(data)
			{
		       $scope.name=data.name;
		       $scope.dob=data.dob;
		       $scope.hometown=data.hometown;
		       $scope.currentCity=data.currentcity;
		       $scope.school=data.school;
		       $scope.undergradCollege=data.undercollege;
		       $scope.gradCollege=data.gradcollege;
		       $scope.email=data.email;
		       $scope.phoneNumber=data.phone;
		       $scope.relationshipStatus=data.relationship;
			});
	
	$scope.submit = function() {
				
		$http({
			method : "POST",
			url : '/submitAbout',
			data : {
				"name" : $scope.name,
				"dob" : $scope.dob,
				"hometown" : $scope.hometown,
				"currentCity" : $scope.currentCity,
				"school" : $scope.school,
				"undergradCollege" : $scope.undergradCollege,
				"gradCollege" : $scope.gradCollege,
				"email" : $scope.email,
				"phoneNumber" : $scope.phoneNumber,
				"relationshipStatus" : $scope.relationshipStatus
			}
		}).success(function(data) {
			if(data.success == 1)
			{
				window.location.assign("/editabout"); 
			}
		}).error(function(error) {
//			$scope.unexpected_error = false;
//			$scope.invalid_login = true;
		});
	};
})