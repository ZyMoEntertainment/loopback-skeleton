'use strict';

describe('Setup', function() {
  //Perform any global setup we want to do here
  //since mocha will start without boot scripts
  //being finished, wait a bit before firing off
  //the tests
  before(function(done) {
    setTimeout(function() {
      done();
    }, 4000);
  });

  it('should run setup before', function(done) {
    done();
  });
});
