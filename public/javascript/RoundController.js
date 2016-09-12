var RoundApp = angular.module('RoundApp', [])

	// .controller('mainController"', ['$scope', '$http'], function($scope, $http) {
	function roundController($scope, $http, $window) {
		console.log("In the roundController");
		$scope.idProvided = false;
		$scope.caseId;
		$scope.cases;
		$scope.date;
		$scope.gov;
		$scope.opp;
		$scope.pmSpeaks;
		$scope.loSpeaks;
		$scope.mgSpeaks;
		$scope.moSpeaks;
		$scope.winner;
		$scope.reason;
		$scope.notes;

		$scope.init = function(caseId){
			if(caseId != ''){
				$scope.idProvided = true;
				$scope.caseId = caseId;
			} else {
				$http.get('/getCases')
					.success(function(results){
						$scope.cases = results.results;
						console.log("Cases");
						console.log($scope.cases);
					})
					.error(function(results){
						console.log("Error: "+ results);
					})
			}
		}

		$scope.viewInit = function(roundId){
			$http.get('/roundInfo/' + roundId)
				.success(function(data){
					console.log("Setting values now");
					$scope.date = data.roundInfo[0].date;
					$scope.gov = data.roundInfo[0].gov;
					$scope.opp = data.roundInfo[0].opp;
					$scope.pmSpeaks = data.roundInfo[0].pmSpeaks;
					$scope.loSpeaks = data.roundInfo[0].loSpeaks;
					$scope.mgSpeaks = data.roundInfo[0].mgSpeaks;
					$scope.moSpeaks = data.roundInfo[0].moSpeaks;
					$scope.winner = data.roundInfo[0].winner;
					$scope.reason = data.roundInfo[0].reason;
					$scope.notes = data.roundInfo[0].notes;
				})
				.error(function(results){

				});
		}

		// $scope.goToCase = function(caseId){
		// 	$window.location.href = '/case/' + caseId;
		// }

		$scope.submitRound = function(){
			var RoundRequestBody = {
				'caseId' : $scope.caseId,
				'date' : $scope.date,
				'gov' : $scope.gov,
				'opp' : $scope.opp,
				'pmSpeaks' : $scope.pmSpeaks,
				'loSpeaks' : $scope.loSpeaks,
				'mgSpeaks' : $scope.mgSpeaks,
				'moSpeaks' : $scope.moSpeaks,
				'winner' : $scope.winner,
				'reason' : $scope.reason,
				'notes' : $scope.notes
			}
			$http.post('/addRound', RoundRequestBody)
				.success(function(data){

				})
				.error(function(data){

				});
		}

		

	};