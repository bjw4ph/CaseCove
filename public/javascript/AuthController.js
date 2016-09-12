var AuthApp = angular.module('AuthApp', [])

	// .controller('mainController"', ['$scope', '$http'], function($scope, $http) {
	function authController('$scope', '$state','auth') {
	  $scope.user = {};

	  $scope.register = function(){
	    auth.register($scope.user).error(function(error){
	      $scope.error = error;
	    }).then(function(){
	      $state.go('home');
	    });
	  };

	  $scope.logIn = function(){
	    auth.logIn($scope.user).error(function(error){
	      $scope.error = error;
	    }).then(function(){
	      $state.go('home');
	    });
	  };
	}