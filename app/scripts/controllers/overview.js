/* ==========================================================================
   Controller - Overview
   ========================================================================== */
'use strict';

angular.module('peakApp').controller('OverviewCtrl', function ($scope, $http, localStorageService, $interval, CSVParser) {

    
    $scope.overview = (function(){
      // Private Variables
      var getMarket, dataProcessing, chart;
      var TODAY   = new Date();
      var ONE_DAY = (60 * 60 * 24) * 1000;

      // JSON Proxy
      var PROXY = 'http://glacial-chamber-5485.herokuapp.com/?url=';

      // API Endpoint
      var BTC_PRICE = 'https://coinbase.com/api/v1/prices/spot_rate';

      // API Endpoint
      var BTC_HIST = 'https://coinbase.com/api/v1/prices/historical';

      // Private Function
      dataProcessing = function(array){
          var i, newArray = []; 

          // Loop through array
          for (i = 0; i < array.length; i += 120){
            var obj = {};
            obj.date = new Date(array[i][0]);
            obj.value = parseFloat(array[i][1]);
            newArray.push(obj);
          }
          
          // Return array in reverse
          return newArray.reverse();
      };

      // Private Function
      getMarket = (function(){

          // API Call
          $http.get(PROXY + encodeURIComponent(BTC_PRICE)).success(function(data){
              // Process response & store in $scope property
              $scope.bitcoinPrice = data.amount;
          });
          
          if ((TODAY.getTime() - localStorageService.get('timestamp')) >= ONE_DAY) {
            $http.get(PROXY + encodeURIComponent(BTC_HIST)).error(function(data){
              localStorageService.set('timestamp', TODAY.getTime());
              localStorageService.set('chartData', dataProcessing(CSVParser(data.error)));
              $scope.bitcoinChart = dataProcessing(CSVParser(data.error));
            });
          } else {
            $scope.bitcoinChart = localStorageService.get('chartData');
          }
      })();
      
      var chart = (function(){
        
        var int1 = $scope.bitcoinChart[0].value;
        var int2 = $scope.bitcoinChart[$scope.bitcoinChart.length - 1].value;
      
        if ( int1 > int2) {
          return {
            max: int1,
            min: int2,
            majorUnit: int1 - int2,
            color: '#db4c3c'
          };
        } else {
          return {
            max: int2,
            min: int1,
            majorUnit: int2 - int1,
            color: '#6bbf46'
          };
        }
      })();
      
      $scope.chart = {
        theme: 'metro',
        dataSource: {
          data: $scope.bitcoinChart
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
          categoryField: 'date',
          color: chart.color
        }],
        valueAxis: {
          visible: false,
          majorUnit: chart.majorUnit,
          min: chart.min,
          max: chart.max,
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
      
      // Reload data every 60 seconds
      $interval($scope.getMarket, 60000);

      // Public API
      return {
          update: getMarket
      };
    })();
  });
