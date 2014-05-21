/* ==========================================================================
	 Controller - Portfolio
	 ========================================================================== */
'use strict';

angular.module('peakApp').controller('PortfolioCtrl', function ($scope, $http, localStorageService, $interval) {

	// Global Module
	$scope.portfolio = (function(){
		
		// Private Variables
		var total, holdings, getMarket, addHolding, removeHolding, currencyValue, dataProcessing, removeDuplicates;

		// Current Timestamp
		var TODAY   = new Date();
		
		// One Minute
		var ONE_MIN = 60000;
		
		// JSON Proxy
		var PROXY   = 'http://glacial-chamber-5485.herokuapp.com/?url=';
		
		// API Endpoint
		var URL     = [
			'https://api.mintpal.com/v1/market/summary/BTC',
			'https://bittrex.com/api/v1/public/getmarketsummaries',
			'https://poloniex.com/public?command=returnTicker'
			];

		holdings = localStorageService.get('holdings') || [];
		
		// Private Function
		dataProcessing = function(array){
			var i, 
				newArray = [];
			
			// Create BTC item
			newArray[0] = {};
			newArray[0].code = 'BTC';
			newArray[0].last_price = 1;
			
			if (!angular.isArray(array)) {
				
				var tempArray = [];

				// Loop through object
				for (var key in array) {

					// Only Add BTC market
					if (array.hasOwnProperty(key)) {
						if (key.substr(0,3) === 'BTC') {
							array[key].code = key.substr(4, (key.length - 1));
							tempArray.push(array[key]);
						}
					}
				}
				
				// Loop through array
				for (i = 1; i < tempArray.length; i++){

					newArray[i] = {};
					newArray[i].code = tempArray[i].code;
					newArray[i].last_price = tempArray[i].last;
				}
	
				// Return array
				return newArray;
			}
			
			// Loop through array
			for (i = 1; i < array.length; i++){
				
				newArray[i] = {};
			
				if (array[i].MarketName && array[i].MarketName.substr(0,3) === 'BTC') {
						newArray[i].code = array[i].MarketName.substr(4, (array[i].MarketName.length - 1));
						newArray[i].last_price = array[i].Last ? array[i].Last.toFixed(8) : 0;
				} else {
					newArray[i].code = array[i].code;
					newArray[i].last_price = array[i].last_price;
				}
			}

			// Return array
			return newArray;
		};
		
		removeDuplicates = function(array){
			var i, j;

			for (i = 0; i < array.length; i++) {

				for (j = i + 1; j < array.length; j++) {

					if (array[i].code === array[j].code || array[j].code === undefined){
						array.splice(j, 1);
					}
				}
			}
			
			array.sort(function(a, b) {
				
				if (a.code > b.code) {
					return 1;
				} else if (a.code < b.code) {
					return -1;
				} else {
					// a must be equal to b
					return 0;
				}
			});

			return array;
		};

		// Get market data
		getMarket = function(){

			// Get timestamp
			var TODAY = new Date();

			// Clear localstorage for controller
			localStorageService.remove('timestamp');
			localStorageService.remove('coins');

			// Set timestamp in localstorage
			localStorageService.set('timestamp', TODAY.getTime());

			// API Call
			$http.get(PROXY + encodeURIComponent(URL[0])).success(function(data){

				// Process response & store in $scope property
				$scope.data = dataProcessing(data);
			});

			// API Call
			$http.get(PROXY + encodeURIComponent(URL[1])).success(function(data){

				// Process response & store in $scope property
				$scope.data = $scope.data.concat(dataProcessing(data.result));
			});

			// API Call
			$http.get(PROXY + encodeURIComponent(URL[2])).success(function(data){

				// Process response & store in $scope property
				$scope.data = removeDuplicates($scope.data.concat(dataProcessing(data)));
				
				console.log($scope.data);
				
				// Set data in localstorage
				localStorageService.set('coins', $scope.data);
				
				// Set select menu to first item of array
				$scope.coin = $scope.data[0];
			});
		};

		// Add coin holding
		addHolding = function() {
			holdings.push({coin:$scope.coin.code, amount:$scope.amount, cost:$scope.cost});
			localStorageService.set('holdings', holdings);
			$scope.amount = '';
			$scope.cost = '';
			$scope.coin = $scope.data[0];
		};

		// Remove coin holding
		removeHolding = function(index) {
			holdings.splice(index, 1);
			localStorageService.set('holdings', holdings);
		};
		
		// Calculate current value
		currencyValue = function(coin){
			var i, value;

			for (i = 0; i < $scope.data.length; i++){
				if ($scope.data[i].code === coin){
					value = $scope.data[i].last_price;
				}
			}
			return value;
		};

		// Grab total from locallocalStorageService or set total to 0
		total = function(string){
			var i, amount = 0, holding, fixMath;
			
			var satoshi = function(coin){
				var fixMath = 0, value;
				
				if (string === 'cost'){
					fixMath = Math.round(coin.cost*100000000);
				} else if (string === 'gain') {
					fixMath = Math.round(currencyValue(coin.coin)*100000000);	
				}
				
				value 	= Math.round(coin.amount*fixMath);
				value 	= value/100000000;
				
				return value;	
			};

			for (i = 0; i < holdings.length; i++){
				holding = satoshi(holdings[i]);
				amount += holding;
			}


			return parseFloat(amount);
		};

		if ((TODAY.getTime() - localStorageService.get('timestamp')) >= ONE_MIN || 
			!localStorageService.get('coins')) {
			getMarket();
		} else {
			$scope.data = localStorageService.get('coins');
		}

		// Reload data every 60 seconds
		$interval(getMarket, 60000);

		return {
			totalValue: total,
			holdings: holdings,
			addHolding: addHolding,
			removeHolding: removeHolding,
			currencyValue: currencyValue
		};
	})();
});
