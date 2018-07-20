'use strict';

const should = require('should');
const app = require('../../server/server');
const Mocks = require('../random-factory');

describe('Error Model Tests', function() {

  it('should be persisted', function(done) {
    let org = Mocks.randError();
    app.models.Error.create(org, function(err, errorObject) {
      should.not.exist(err);
      should.exist(errorObject);
      should.exist(errorObject.createddate);
      done();
    });
  });
});