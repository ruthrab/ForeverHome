module.exports = function (req, res, ok) {

    // User is allowed, proceed to controller
    if (req.session.User && req.session.User.isShelter) {
      
      return ok();
    }
  
    // User is not allowed
    else {
      res.send(403);
      return;
    }
  };