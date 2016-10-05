/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var jwt = require('jsonwebtoken');

module.exports = {
	signup: function(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        var username = req.body.username;

        if (!email || !password || !username) {
          return res.json(401, {err: 'Please fill in all the fields'});
        }

        User.create({username: req.body.username, email: req.body.email, password: req.body.password}).exec(function(err, user) {
          if (err) {
            res.json(err.status, {err: err});
            return;
          }
          if (user) {
            res.json({ success: true, message: "User Registered successfully. Please, go ahead and login" });
          }
        });
    },

    login: function(req, res) {
        var email = req.body.email;
        var password = req.body.password;
        var user = {
            sub: 'User detail',
            email: email
        };

        var token = jwt.sign(user, sails.config.sessionSecret, { expiresIn: "24h" });

        if (!email || !password) {
          return res.json(401, {err: 'username and password required'});
        }

        User.findOneByEmail(email, function(err, user) {
          if (!user) {
            return res.json(401, {err: 'Invalid email. User does not exist'});
          }

          User.validPassword(password, user, function(err, valid) {
            if (err) {
              return res.json(403, {err: 'forbidden'});
            }

            if (!valid) {
              return res.json(401, {err: 'invalid username or password'});
            } else {
              res.json({success: true, token: token, user: user.username});
            }
          });
        })
    }
};

