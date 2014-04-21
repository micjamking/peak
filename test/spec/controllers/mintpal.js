'use strict';

describe('Controller: MintPalCtrl', function () {

  // load the controller's module
  beforeEach(module('peakApp'));

  var MintPalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MintPalCtrl = $controller('MintPalCtrl', {
      $scope: scope
    });
  }));

  it('should attach a market to the scope', function () {
    expect(scope.market).toBeDefined();
  });
});
