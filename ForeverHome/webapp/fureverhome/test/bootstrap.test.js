var sails = require('sails');

// Before running any tests...
before(function(done) {

  this.timeout(10000);

  sails.lift({
    hooks: { grunt: false },
    log: { level: 'warn' },

  }, function(err) {
    if (err) { return done(err); }
    return done();
  });
});

// After all tests have finished...
after(function(done) {
  User.destroy({}, function userDestroyed(err) {
    if (err) {
      console.log(err);
      return next(err);
    }
  });
  sails.lower(done);

});