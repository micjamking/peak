/* ==========================================================================
	 Controller - Poloniex
	 ========================================================================== */
'use strict';

angular.module('peakApp').controller('PoloniexCtrl', function ($scope, $http, $interval) {

	$scope.awesomeThings = [
		'HTML5 Boilerplate',
		'AngularJS',
		'Karma'
	];
	
	$scope.predicate = 'code';
	$scope.reverse = false;

	// Market Module
	$scope.market = (function(){

		// Private Variables
		var getMarket, dataProcessing, url, proxy;

		// JSON Proxy
		proxy = 'http://glacial-chamber-5485.herokuapp.com/?url=';

		// API Endpoint
		url = 'https://poloniex.com/public?command=returnTicker';

		// Private Function
		dataProcessing = function(object){
			var i, array = [];

			// Loop through object
			for (var key in object) {

				// Only Add BTC market
				if (object.hasOwnProperty(key)) {
					if (key.substr(0,3) === 'BTC') {
						object[key].code = key.substr(4, (key.length - 1));
						array.push(object[key]);
					}
				}
			}

			for (i = 0; i < array.length; i++) {
				array[i].percentChange = parseFloat(array[i].percentChange*10).toFixed(2);
				array[i].percentChange = parseFloat(array[i].percentChange);
			}

			// Return array
			return array;
		};

		// Private Function
		getMarket = function(){

			// API Call
			$http.get(proxy + encodeURIComponent(url)).success(function(data){
				console.log(dataProcessing(data));
				// Process response & store in $scope property
				$scope.data = dataProcessing(data);
			});
		};

		// Load data on page load
		getMarket();

		// Reload data every 60 seconds
		$interval($scope.getMarket, 60000);

		// Public API
		return {
			update: getMarket
		};
	})();
});
