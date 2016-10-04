/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    welcome: function(req, res) {
      res.json({ message: "Welcome to the API of your life" });
    }
};

