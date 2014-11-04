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

  
});
