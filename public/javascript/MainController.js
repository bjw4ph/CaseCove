var CaseCove = angular.module('CaseCoveApp', [])

	// .controller('mainController"', ['$scope', '$http'], function($scope, $http) {
	function mainController($scope, $http, $window) {
		console.log("In the mainController");
		$scope.cases;
		

		$scope.init = function(city){
			$scope.cityName = city;
			$http.get('/getCases')
				.success(function(data){
					console.log(data.results);
					$scope.cases = data.results;
				})
				.error(function(data){
					console.log("Error: "+ data);
				});
			console.log("Cases!");
			console.log($scope.cases);
		}

		// $scope.mainInit = function(){
		// 	$http.post('/queryNeighborhoods', {city: $scope.cityName})
		// 		.success(function(data){
		// 			console.log(data.results);
		// 			$scope.neighborhood1 = data.results[0].title;
		// 			$scope.neighborhood2 = data.results[1].title;
		// 			$scope.neighborhood3 = data.results[2].title;
		// 		})
		// 		.error(function(data){
		// 			console.log("Error: " + data);
		// 		})
		// }
		// $scope.loadNeighborhood = function(){
		// 	console.log("In loadNeighborhood");
		// 	$http.get('/getNeighborhood')
		// 		.success(function(data){
		// 			$window.location.href = '/neighborhood';
		// 		})
		// 		.error(function(data){
		// 			console.log("Error: "+ data);
		// 		});
		// };

		// $scope.loadNewCity = function(cityName){
		// 	$http.get('/city/' + cityName)
		// 		.success(function(data){
		// 			$window.location.href = '/city/' + cityName;

		// 		})
		// 		.error(function(data){
		// 			console.log("Error: "+ data);
		// 		});
		// }

	};