'use strict';

describe('Service: base64', function () {

  // load the service's module
  beforeEach(module('HomeApp'));

  // instantiate service
  var base64;
  beforeEach(inject(function (_base64_) {
    base64 = _base64_;
  }));

  it('should do something', function () {
    expect(!!base64).toBe(true);
  });

});
