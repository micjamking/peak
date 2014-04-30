/* ==========================================================================
   Service - API Requests
   ========================================================================== */
'use strict';

angular.module('peakApp').factory('api', function ($resource) {
  
    var PROXY = 'http://glacial-chamber-5485.herokuapp.com/?url=';
    
    var actions = {
      query: {
        method:'GET',
        isArray:true
      }
    };

    
    return $resource(PROXY + ':url', {}, actions);
  });
