var request = require('supertest');
var assert = require('assert');

describe('HeartbeatController', function() {

  describe('#create()', function(done) {

    it('responds 200 OK with device ID when a heartbeat is received', function(done) {
      request(sails.hooks.http.app)
        .post('/heartbeat/create')
        .send({ device: 1 })
        .expect(200)
        .end(function(err, res) {
          assert.equal(res.body.device, 1);
          if (err) return done(err);
          done();
        });
    });

    it('responds 400 Bad Request when an invalid heartbeat is received', function(done) {
      request(sails.hooks.http.app)
        .post('/heartbeat/create')
        .send({ invalid: 'invalid' })
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('accepts a socket connection request and publishes a message when heartbeat is created', function(done) {
      request(sails.hooks.http.app)
        .post('/heartbeat/create')
        .set('isSocket', true)
        .end(function(err, res) {
                    
          done();
        });
    });
    
  });

});
