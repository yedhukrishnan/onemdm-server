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
    done(err, sails);
  
  });
  
});

after(function(done) {
  
  sails.lower(done);
  
});

