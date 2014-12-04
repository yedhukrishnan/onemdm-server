var request = require('supertest');

describe('DeviceController', function() {

  describe('#create()', function(done) {

    it('responds 201 Created when valid device details are received', function(done) {
      request(sails.hooks.http.app)
        .post('/device/create')
        .set("Authorization", "Bearer testtoken")
        .send({ name: 'MyTestDevice' })
        .expect('Content-Type', /json/)
        .expect(201)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
    
    it('responds 422 Unprocessable Entity when invalid device details are received', function(done) {
      request(sails.hooks.http.app)
        .post('/device/create')
        .set("Authorization", "Bearer testtoken")
        .send({ invalid: 'invalid'})
        .expect(422)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

  });

});
