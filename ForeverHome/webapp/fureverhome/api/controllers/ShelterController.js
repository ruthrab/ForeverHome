/**
 * ShelterController
 *
 * @description :: Server-side logic for managing shelters
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'edit': function(req, res){
        // Find the user from the id passed in via params
        Shelter.findOne(req.param('id')).populate('managingAccount').exec(function(err,shelter){
            return res.view({shelter: shelter});
        });
    },
    'new': function(req,res){
        return res.view('shelter/new');
    },
    'show': function(req,res){
        Shelter.findOne(req.param('id')).populate('managingAccount').exec(function(err,shelter){
            if(shelter == undefined){
                return res.redirect('404');
            }
            Pet.find({shelterCreator:shelter.id}).exec(function(err, pets){
                if(req.session.User != undefined){
                    Favorites.find({userId:req.session.User.id}).exec(function(err, favorites){
                        if(err)return next(err);
                        return res.view({favorites: favorites, pets: pets, shelter: shelter});
                    });
                    }else{
                        return res.view({pets:pets, shelter:shelter});
                    }
            });
        
    });
          
    },
    index: function(req,res,next){
        Shelter.find().populate('managingAccount').exec(function foundShelters (err,shelters){
            if(err)return next(err);
            res.view({shelters:shelters});
        });
    },
    create: function(req,res,next){
        var shelterObj = {
            shelterName: req.param('shelterName'),
            phonenumber: req.param('phone'),
            summary: req.param('summary'),
            // location: req.param('location'),
            managingAccount: req.session.User.id
          }
        Shelter.create(shelterObj, function shelterCreated(err, shelter){
                if(err) {
                    console.log(err);
                    // store errors and old data in session
                    req.session.flash = {
                      err: err,
                      formErrors: err.Errors,
                      old: req.body,
                    }
                // If error redirect back to sign-up page
                return res.redirect('/shelter/new');
              }
            req.session.Shelter = shelter;
            return res.redirect('/shelter/show/' + shelter.id);
        });
    },
    update: function(req,res,next){
        var shelterObj = {
            shelterName: req.param('shelterName'),
            phonenumber: req.param('phone'),
            summary: req.param('summary'),
            // location: req.param('location'),
            managingAccount: req.session.User.id
          }
          Shelter.update(req.param('id'), shelterObj, function shelterUpdated(err) {
            if (err) {
              return res.redirect('/shelter/edit/' + req.param('id'));
            }
      
            res.redirect('/shelter/show/' + req.param('id'));
          });
    }
};

