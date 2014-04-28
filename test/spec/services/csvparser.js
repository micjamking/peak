'use strict';

describe('Service: csvparser', function () {

  // load the service's module
  beforeEach(module('peakApp'));

  // instantiate service
  var csvparser;
  beforeEach(inject(function (_csvparser_) {
    csvparser = _csvparser_;
  }));

  it('should do something', function () {
    expect(!!csvparser).toBe(true);
  });

});
