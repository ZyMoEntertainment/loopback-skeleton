const should = require('should');
const app = require('../../server/server');
const Mocks = require('../random-factory');
const TestUtils = require('../test-utils');
const request = require('supertest');

describe('Example Model Controller test', function() {
  it('should allow read for logged in user', function(done) {
    TestUtils.loginAsAdmin(function(err, access) {
      should.not.exist(err);
      let accessToken = access.token;
      request(app).get(`/api/ExampleModels?access_token=${accessToken}`)
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          done();
        });
    })
  });

  it('should not allow read for a user with invalid token', function(done) {
    request(app).get(`/api/ExampleModels?access_token=12345`)
      .expect(401)
      .end(function(err, res) {
        should.not.exist(err);
        done();
      });
  });

  it('should allow write for logged in user', function(done) {
    TestUtils.loginAsAdmin(function(err, access) {
      should.not.exist(err);
      let accessToken = access.token;
      let data = Mocks.randExampleModel();
      request(app).post(`/api/ExampleModels?access_token=${accessToken}`)
        .send(data)
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          done();
        });
    })
  });

  it('should allow exists access for logged in user', function(done) {
    TestUtils.loginAsAdmin(function(err, access) {
      should.not.exist(err);
      let accessToken = access.token;
      request(app).get(`/api/ExampleModels/exists/3afasf?access_token=${accessToken}`)
        .expect(200)
        .end(function(err, res) {
          should.not.exist(err);
          done();
        });
    })
  });

  it('should not allow write for unauthenticated user', function(done) {
    let data = Mocks.randExampleModel();
    request(app).post(`/api/ExampleModels?access_token=12345`)
      .send(data)
      .expect(401)
      .end(function(err, res) {
        should.not.exist(err);
        done();
      });
  });
});