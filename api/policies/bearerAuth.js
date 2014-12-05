module.exports = function(req, res, next) {

  if(req.isSocket) next();
  else return passport.authenticate('bearer', { session: false })(req, res, next);
  
};
