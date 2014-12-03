module.exports = function(req, res, next) {

  if(req.isSocket) {
    next();
  }
  return passport.authenticate('bearer', { session: false })(req, res, next);
  
};
