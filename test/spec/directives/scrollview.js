'use strict';

describe('Directive: scrollView', function () {

  // load the directive's module
  beforeEach(module('peakApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    //element = angular.element('<scroll-view></scroll-view>');
    //element = $compile(element)(scope);
    //expect(element.text()).toBe('this is the scrollView directive');
  }));
});
