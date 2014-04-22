'use strict';

describe('Controller: CryptsyCtrl', function () {

  // load the controller's module
  beforeEach(module('peakApp'));

  var CryptsyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CryptsyCtrl = $controller('CryptsyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
