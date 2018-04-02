/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt');
module.exports = {
	'login': function(req,res){
        res.view('session/login');
    },
    create: function(req, res, next) {
		// Try to find the user by there email address. 
		// findOneByUsername() is a dynamic finder in that it searches the model by a particular attribute.
		// User.findOneByUsername(req.param('email')).done(function(err, user) {
        
		User.findOne({username: req.body.username}).exec(function foundUser(err, user) {
			if (err) return next(err);
			// If no user is found...
			if (!user) {
				var noAccountError = [{
					name: 'noAccount',
					message: 'The username ' + req.param('username') + ' not found.'
				}]
				req.session.flash = {
					err: noAccountError
				}
				res.redirect('/session/login');
				return;
			}

			// Compare password from the form params to the encrypted password of the user found.
			bcrypt.compare(req.body.password, user.encryptedPassword, function(err, valid) {
				if (err) return next(err);

				// If the password from the form doesn't match the password from the database...
				if (!valid) {
					var usernamePasswordMismatchError = [{
						name: 'usernamePasswordMismatch',
						message: 'Invalid username and password combination.'
					}]
					req.session.flash = {
						err: usernamePasswordMismatchError
					}
					res.redirect('/session/login');
					return;
				}

				// Log user in
				req.session.authenticated = true;
				req.session.User = user;
                res.redirect('/');
			});
		});
	}
};

