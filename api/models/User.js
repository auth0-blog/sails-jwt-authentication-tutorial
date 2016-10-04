/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {

  schema: true,

  attributes: {
    username: {
        type: 'string',
        required: true
    },
    email: {
        type: 'email',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true
    }
  },

  beforeCreate: function(values, next) {
    // Hash password
      bcrypt.hash(values.password, 10, function(err, hash) {
        if (err) return next(err);
        values.password = hash;
        //calling next() with an argument returns an error. Useful for canceling the entire operation if some criteria fails.
        next();
    });
  },

  validPassword: function(password, user, cb) {
    bcrypt.compare(password, user.password, function(err, match) {
      if (err) cb(err);

      if (match) {
        cb(null, true);
      } else {
        cb(err);
      }
    });
  }


};

