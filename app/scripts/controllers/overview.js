/* ==========================================================================
	 Controller - Overview
	 ========================================================================== */
'use strict';

angular.module('peakApp').controller('OverviewCtrl', function ($scope, $http, localStorageService, $interval, csvParser) {

	// Global Module
	$scope.overview = (function(){

		// Private Variables
		var dataProcessing, getMarket, chartColors;

		var TODAY = new Date();

		// 30 Seconds
		var HALF_MIN  = 60000;

		// JSON Proxy
		var PROXY     = 'http://glacial-chamber-5485.herokuapp.com/?url=';

		// API Endpoint
		var BTC_PRICE = 'https://coinbase.com/api/v1/prices/spot_rate';

		// API Endpoint
		var BTC_HIST  = 'https://coinbase.com/api/v1/prices/historical';

		// Process returned data from API
		dataProcessing = function(array){
			var i, newArray = [];

			// Loop through array
			for (i = 0; i < 120; i += 2){
				var obj   = {};
				obj.date  = new Date(array[i][0]);
				obj.value = parseFloat(array[i][1]);
				newArray.push(obj);
			}

			// Return array in reverse
			return newArray.reverse();
		};

		// Choose chart colors base on trajectory
		chartColors = function(array){

			// Private Variables
			var int1 = array[0].value;
			var int2 = $scope.bitcoinPrice;

			// Create Chart Parameters
			if ( int1 > int2) {
				array.color = '#db4c3c';
			} else {
				array.color = '#6bbf46';
			}

			return array;
		};

		// Get market data
		getMarket = function(){

			// Get timestamp
			var TODAY = new Date();

			// Clear localstorage for controller
			localStorageService.remove('timestamp');
			localStorageService.remove('bitcoinPrice');
			localStorageService.remove('historicalData');

			// Set timestamp in localstorage
			localStorageService.set('timestamp', TODAY.getTime());

			// Get Price from Coinbase
			$http.get(PROXY + encodeURIComponent(BTC_PRICE)).success(function(data){

				// Store response data in $scope property
				$scope.bitcoinPrice = data.amount;

				// Set data in localstorage
				localStorageService.set('bitcoinPrice', data.amount);
			});

			$http.get(PROXY + encodeURIComponent(BTC_HIST)).error(function(data){

				// Store response data in local storage
				$scope.historicalData = dataProcessing(csvParser(data.error));

				// Create chart colors based on response data
				chartColors($scope.historicalData);

				// Set timestamp in localstorage
				localStorageService.set('historicalData', dataProcessing(csvParser(data.error)));

			});
		};

		// Create data array
		$scope.historicalData = [];

		// Assign temp color property
		$scope.historicalData.color = 'transparent';

		// Chart configuration object
		$scope.chart = {
			theme: 'metro',
			dataSource: {
				data: $scope.historicalData
			},
			legend: {
				position: 'bottom',
				visible: false
			},
			seriesDefaults: {
				type: 'area',
				area: {
					line: {
						style: 'smooth'
					}
				}
			},
			series: [{
				field: 'value',
				color: $scope.historicalData.color
			}],
			valueAxis: {
				visible: false,
				line: {
					visible: false
				},
				majorGridLines: {
					visible: false
				}
			},
			categoryAxis: {
				visible: false,
				majorGridLines: {
					visible: false
				}
			},
			tooltip: {
				visible: false
			},
			chartArea: {
				background: ''
			}
		};

		// Update chart properties when scope updates
		$scope.$watchCollection('historicalData', function(newData) {
			$scope.chart.dataSource.data = newData;
			$scope.chart.series[0].color = newData.color;
		});

		// Reload data every 30 seconds
		$interval(getMarket, 60000);

		// Check if enough time has passed & there is no localstorage before
		// grabbing market data
		return (function(){
			if ((TODAY.getTime() - localStorageService.get('timestamp')) >= HALF_MIN ||
				!localStorageService.get('bitcoinPrice') ||
				!localStorageService.get('historicalData')) {
				getMarket();
			} else {
				$scope.bitcoinPrice   = localStorageService.get('bitcoinPrice');
				$scope.historicalData = localStorageService.get('historicalData');
			}
		})();

	})();
});
