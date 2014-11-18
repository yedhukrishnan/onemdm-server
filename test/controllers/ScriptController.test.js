var request = require('supertest');
var assert = require('assert');

describe('ScriptController', function() {
  
  describe('#create()', function() {
    
    it('responds 200 OK when a script is created', function(done) {
      request(sails.hooks.http.app)
        .post('/script/create')
        .send({ device: 1 })
        .expect('location', '/script')
        .end(function(err, res) {
          if(err) return done(err);
          done();
        });
    });

  });
  
  describe('#update()', function(done) {

    it('updates the script values', function(done) {
      request(sails.hooks.http.app)
        .post('/script/1')
        .send({ status: 'changed' })
        .end(function(err, res) {
          Script.findOne(1).then(function(s) {
            assert.equal(s.status, 'changed');
          });
          if(err) return done(err);
          done();
        });
    });


  });

  
});
