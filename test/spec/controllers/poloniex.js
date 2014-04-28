'use strict';

describe('Controller: PoloniexCtrl', function () {

  // load the controller's module
  beforeEach(module('peakApp'));

  var PoloniexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PoloniexCtrl = $controller('PoloniexCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.poloniex).toBeDefined();
  });
});
