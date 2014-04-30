/* ==========================================================================
   Directive - ScrollView
   ========================================================================== */
'use strict';

angular.module('peakApp').directive('scrollView', function ($timeout) {
  return function(scope, elm) {
    
    function setHeight() {
      var raw       = elm[0],
          w         = window,
          d         = document,
          e         = d.documentElement,
          g         = d.getElementsByTagName('body')[0],
          y         = w.innerHeight || e.clientHeight || g.clientHeight,
          marginTop = document.querySelector('.pricing-table.data').offsetTop,
          height    = (y - marginTop) + 'px';

      raw.style.height = height;
    }
    
    scope.$on('$routeChangeSuccess', function() {
      
      $timeout(setHeight, 1000);
      
    });
  };
});
