module.exports = function(req, res, ok) {
	if(!req.session.authenticated){
		res.send(403);
		return;
	}
	console.log(req.session.Shelter.id);
	console.log(req.param('id'));
	var sessionUserMatchesId = req.session.Shelter.id == req.param('id');
	console.log(sessionUserMatchesId);
	// The requested id does not match the user's id,
	// and this is not an admin
	if (!(sessionUserMatchesId)) {
	res.send(403);
    return;
	}

	ok();

};