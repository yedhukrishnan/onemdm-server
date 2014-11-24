var request = require('supertest');
var assert = require('assert');
var sinon = require('sinon');
var expect = require('chai').expect;

describe('ScriptController', function() {
  
  describe('#create()', function() {
    
    it('redirects to script index page when a script is created', function(done) {
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

    it('updates the script values and publishes a message when done', function(done) {
      var publishUpdateStub = sinon.stub(Script, 'publishUpdate');
      request(sails.hooks.http.app)
        .post('/script/1')
        .send({ status: 'changed' })
        .end(function(err, res) {
          Script.findOne(1).then(function(s) {
            assert.equal(s.status, 'changed');
          });
          expect(publishUpdateStub.called).to.be.true;
          if(err) return done(err);
          done();
        });
    });


  });

  
});
