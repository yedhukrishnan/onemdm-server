var Sails = require('sails');

before(function(done) {
  
  this.timeout(5000);
  Sails.lift({
    
    models: { 
      connection: 'postgresTestDB',
      migrate: 'drop'
    }
    
  }, function(err, sails) {
   
    if (err) return done(err);

    // Create a user for login sessions
    User.create({ username: 'tester', email: 'tester@gmail.com' })
      .exec(function(err, user) {
        Passport.create({ protocol: 'local', user: user.id, password: 'password', accessToken: 'testtoken' })
          .exec(function(err, passport) {
            done(err, sails);//done();
          });
      });
    
  });
  
});

after(function(done) {
  
  sails.lower(done);
  
});

