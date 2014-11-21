var request = require('supertest');
var assert = require('assert');
var sinon = require('sinon');
var expect = require('chai').expect;

describe('HeartbeatController', function() {

  describe('#create()', function(done) {

    it('responds 201 Created with device ID when a heartbeat is received', function(done) {
      request(sails.hooks.http.app)
        .post('/heartbeat/create')
        .send({ device: 1 })
        .expect(201)
        .end(function(err, res) {
          assert.equal(res.body.device, 1);
          if (err) return done(err);
          done();
        });
    });

    it('responds 422 Unprocessable Entity when an invalid heartbeat is received', function(done) {
      request(sails.hooks.http.app)
        .post('/heartbeat/create')
        .send({ invalid: 'invalid' })
        .expect(422)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('publishes a message when a heartbeat is created', function(done) {
      var publishCreateStub = sinon.stub(Heartbeat, 'publishCreate');
      request(sails.hooks.http.app)
        .post('/heartbeat/create')
        .send({ device: 1 })
        .end(function(err, res) {
          setTimeout(function() {
            expect(publishCreateStub.callCount).to.equal(1);
            publishCreateStub.restore();
            done(); 
          }, 1000);
        });
    });
    
  });

});
