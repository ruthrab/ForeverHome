module.exports = function(req, res, next) {
    if(!req.session.authenticated && req.session.Shelter == undefined){
		return res.forbidden('You are not permitted to perform this action.');
	}
	
	next();

};  