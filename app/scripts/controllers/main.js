'use strict';

angular.module('peakApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.galleryHeight = function(raw){

      var w         = window,
          d         = document,
          e         = d.documentElement,
          g         = d.getElementsByTagName('body')[0],
          y         = w.innerHeight || e.clientHeight || g.clientHeight,
          small     = window.matchMedia('only screen and (min-width: 768px)'),
          marginTop = document.querySelector('.main').offsetTop,
          header    = document.querySelector('.container .large-3').clientHeight,
          height    = (y - marginTop) - ( small.matches ? 0 : header) + 'px';

      raw.style.height = height;

      window.onresize = function(){
        $scope.galleryHeight(raw);
      };
    };
  });
