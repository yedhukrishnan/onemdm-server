var request = require('supertest');

describe('DeviceController', function() {

  describe('#create()', function(done) {

    it('should respond 200 OK when valid device details are received', function(done) {
      request(sails.hooks.http.app)
        .post('/device/create')
        .send({ name: 'MyTestDevice' })
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
    
    it('should respond 400 Bad Request when invalid device details are received', function(done) {
      request(sails.hooks.http.app)
        .post('/device/create')
        .send({ invalid: 'invalid'})
        .expect(400)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });

  });

  describe('#index()', function(done) {
    
    it('should list down all the devices', function(done) {
      request(sails.hooks.http.app)
        .get('/device/index')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          done();
        })
    });

  });

});
