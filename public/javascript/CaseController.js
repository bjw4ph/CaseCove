var CaseApp = angular.module('CaseApp', [])

	// .controller('mainController"', ['$scope', '$http'], function($scope, $http) {
	function caseController($scope, $http, $window) {
		console.log("In the CaseController");
		$scope.name;
		$scope.category;
		$scope.wins;
		$scope.losses;
		$scope.description;
		$scope.text;
		$scope.open;
		

		

		$scope.submitCase = function(){
			if($scope.open == "true"){
				$scope.open = true;
			} else{
				$scope.open = false;
			}

			var CaseRequestBody = {
				'creatorID' : '1',
				'name': $scope.name,
				'category' : $scope.category,
				'wins' : $scope.wins,
				'losses' : $scope.losses,
				'description' : $scope.description,
				'text' : $scope.text,
				'open' : $scope.open
			}
			console.log(CaseRequestBody);
			$http.post('/addCase', CaseRequestBody)
				.success(function(data){

				})
				.error(function(data){

				});
		}

		

	};