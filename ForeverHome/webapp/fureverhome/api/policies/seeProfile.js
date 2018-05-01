module.exports = function (req, res, ok) {
  if (!req.session.authenticated) {
    res.send(403);
    return;
  }
  var sessionUserMatchesId = req.session.Shelter.id == req.param('id');
  // The requested id does not match the user's id,
  // and this is not an admin
  if (!(sessionUserMatchesId)) {
    res.send(403);
    return;
  }

  ok();

};
