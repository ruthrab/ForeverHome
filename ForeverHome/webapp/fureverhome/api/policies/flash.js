module.exports = function (req, res, next) {
  if(req.session.User !=undefined){
    if(req.session.User.isShelter){
      if(req.session.Shelter == undefined){
      }
    }
  }
  res.locals.flash = {};

  if (!req.session.flash){
    if(req.session.User !=undefined){
      if(req.session.User.isShelter){
        if(req.session.Shelter == undefined){
          return res.redirect('shelter/new');
        }
      }
    }
    return next();
  } 

  res.locals.flash = _.clone(req.session.flash);

  // clear flash
  req.session.flash = {};
  if(req.session.User !=undefined){
    if(req.session.User.isShelter){
      if(req.session.Shelter == undefined){
        return res.redirect('shelter/new');
      }
    }
  }
  next();
};
