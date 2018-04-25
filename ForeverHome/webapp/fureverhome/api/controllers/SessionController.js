/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var bcrypt = require('bcrypt-nodejs');
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
				Shelter.findOne({managingAccount: user.id}).exec(function(err,shelter){
					if(shelter){
						req.session.Shelter = shelter;
						res.redirect('shelter/show/'+shelter.id);
					}else{
						res.redirect('/');
					}
				});
                
			});
		});
	},

	destroy: function(req, res, next) {

		User.findOne(req.session.User.id, function foundUser(err, user) {

			var userId = req.session.User.id;

			if (user) {
				// Wipe out the session (log out)
				req.session.destroy();

				// Redirect the browser to the sign-in screen
				res.redirect('/session/login');
			}
		});
	}
};


