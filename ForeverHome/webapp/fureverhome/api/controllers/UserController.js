/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
  'registerForm': function (req, res) {
    // get errors if any from session
    // get errors if any from session
    var errorsExist = !_.isEmpty(req.session.flash) && !_.isEmpty(req.session.flash.formErrors);
    var errors = errorsExist ? _.clone(req.session.flash.formErrors) : false;
    // get old form data if any from session
    var oldExist = !_.isEmpty(req.session.flash) && !_.isEmpty(req.session.flash.old);
    var old = oldExist ? _.clone(req.session.flash.old) : false;
    // clear flash messages session
    req.session.flash = {};
    return res.view('user/register', {
      errors,
      old
    });
  },
  create: function (req, res, next) {
    var shelter = false;
    if (typeof req.param('isShelter') !== "undefined") {
      if (req.param('isShelter') === "unchecked") {
        shelter = false;
      } else if (req.param('isShelter') === "on") {
        shelter = true;
      }
    }
    var userObj = {
      username: req.param('username'),
      email: req.param('email'),
      password: req.param('password'),
      confirmation: req.param('confirmation'),
      isShelter: shelter
    }
    User.create(userObj, function userCreated(err, user) {
      if (err) {
        console.log(err);
        // store errors and old data in session
        req.session.flash = {
          err: err,
          formErrors: err.Errors,
          old: req.body,
        }
        // If error redirect back to sign-up page
        return res.redirect('/user/register');
      }
      req.session.authenticated = true;
      req.session.User = user;
      if (req.session.User.isShelter) {
        return res.redirect('/shelter/new');
      }
      return res.redirect('/');
    });
  }
};
