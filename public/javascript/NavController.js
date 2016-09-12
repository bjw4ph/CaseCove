var NavApp = angular.module('NavApp', [])

	// .controller('mainController"', ['$scope', '$http'], function($scope, $http) {
	function navController('$scope', 'auth') {
		$scope.isLoggedIn = auth.isLoggedIn;
		$scope.currentUser = auth.currentUser;
		$scope.logOut = auth.logOut;
	}