
exports.authorize = function(token, done) {

  Passport.findOne({ accessToken: token }, function(err, passport) {
    if (err) { return done(err); }
    if (!passport) { return done(null, false); }
    User.findById(passport.user, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user, { scope: 'all' });
    });
  });
  
  
};
