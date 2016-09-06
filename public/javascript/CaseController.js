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

		$scope.init = function(caseId){
			console.log(caseId);
			$http.get('/caseInfo/' + caseId)
				.success(function(data){
					$scope.name = data.caseInfo.name;
					$scope.category = data.caseInfo.category;
					$scope.wins = data.caseInfo.wins;
					$scope.losses = data.caseInfo.losses;
					$scope.description = data.caseInfo.description;
					$scope.text = data.caseInfo.text;
					$scope.open = data.caseInfo.open;
				})
				.error(function(data){
					console.log("error" + data);
				})
			

		}
		

		

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