/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

  var body = req.body;
  if (req.user) {
    return next();
  } else if (body) {
    if (body.access_token) {
      return passport.authenticate('bearer', { session: false })(req, res, next);
    }
  }

  return res.redirect('auth/login');
};
