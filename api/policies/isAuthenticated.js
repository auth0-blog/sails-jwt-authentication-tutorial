/**
 * tokenAuth
 *
 *
 */
var jwt = require('jsonwebtoken');

// Get token from header
function getToken(req) {
    if (req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}

module.exports = function(req, res, next) {

  var token = getToken(req);

  if(token) {
    // verifies secret and checks exp
    jwt.verify(token, sails.config.sessionSecret, function(err, decoded) {
      if(err) {
        return res.json({ message: 'Unauthorized Access. Mismatched token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
      // if there is no token return an error
      return res.status(403).json({
          message: 'Unauthorized Access'
      });
    }
};
