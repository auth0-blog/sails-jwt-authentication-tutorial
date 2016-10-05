/**
 * isAuthenticated
 *
 */
var jwt = require('express-jwt');

var authCheck = jwt({
  secret: new Buffer('6ciafzROZr9eWWEKiMCsviPx1_fhp2QfEQqSHa1Cm9wGDthSfkXU7EZHUib6Vw3y', 'base64'),
  audience: 'mOh81XhUQvqeQ1uVY2yvgERpKKQjSKQr'
});

module.exports = authCheck;