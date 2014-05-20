'use strict';

describe('Controller: BittrexCtrl', function () {

  // load the controller's module
  beforeEach(module('peakApp'));

  var BittrexCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BittrexCtrl = $controller('BittrexCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.bittrex).toBeDefined();
  });
});
