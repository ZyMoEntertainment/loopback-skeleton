'use strict';

const should = require('should');
const app = require('../../server/server');
const UtilService = require('../../server/services/util-service');

describe('Util Service Tests', function() {
  it('should return a 404 error object', function(done) {
    let e = UtilService.notFoundError();
    e.statusCode.should.equal(404);
    e.message.should.equal('Could not find object');
    e = UtilService.notFoundError('widget');
    e.statusCode.should.equal(404);
    e.message.should.equal('Could not find widget');
    done();
  });

  it('should return a 400 error object', function(done) {
    let e = UtilService.badRequestError();
    e.statusCode.should.equal(400);
    e.message.should.equal('Invalid Request');
    e = UtilService.badRequestError('y tho');
    e.statusCode.should.equal(400);
    e.message.should.equal('y tho');
    done();
  });

  it('should return a 401 error object', function(done) {
    let e = UtilService.notAuthorizedError();
    e.statusCode.should.equal(401);
    e.message.should.equal('You are not authorized to perform this action');
    done();
  });
});
