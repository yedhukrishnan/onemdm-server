var request = require('supertest');
var server = request.agent('http://localhost:1337');

describe('AuthController', function() {

  describe('redirects back to login page', function() {

    it('when invalid login credentials are provided', function(done) {
      server
        .post('/auth/local')
        .send({ identifier: 'tester', password: 'invalid-password' })
        .expect(302)
        .expect('Location', '/login')
        .end(function(err, res) {
          if (err) return done(err);
          return done();
        });
    });

  });


  it('allows user to login with valid username and password', function(done) {
    server
      .post('/auth/local')
      .send({ identifier: 'tester', password: 'password' })
      .expect(302)
      .expect('Location', '/')
      .end(function(err, res) {
        if (err) return done(err);
        return done();
      });
  });
  
});
