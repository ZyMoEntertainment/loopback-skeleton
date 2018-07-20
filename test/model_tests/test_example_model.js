'use strict';

const should = require('should');
const app = require('../../server/server');
const Mocks = require('../random-factory');

describe('Example Model Tests', function() {

  it('should be persisted', function(done) {
    let org = Mocks.randExampleModel();
    app.models.ExampleModel.create(org, function(err, example) {
      should.not.exist(err);
      should.exist(example);
      done();
    });
  });

  it('should find an existing model by name', function(done) {
    let org = Mocks.randExampleModel();
    app.models.ExampleModel.create(org, function(err, example) {
      should.not.exist(err);
      should.exist(example);
      app.models.ExampleModel.existsByName(org.name, function(err, exists){
        should.not.exist(err);
        should.equal(exists, true);
        done();
      });
    });
  });

  it('should not find an existing model if name does not exist', function(done) {
    app.models.ExampleModel.existsByName('$fq4qg', function(err, exists){
      should.not.exist(err);
      should.equal(exists, false);
      done();
    });
  });
});