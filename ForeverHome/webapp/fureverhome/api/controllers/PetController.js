/**
 * PetController
 *
 * @description :: Server-side logic for managing pets
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'edit': function(req, res){
        // Find the user from the id passed in via params
        Pet.findOne(req.param('id')).populate('shelterCreator').exec(function(err,pet){
            return res.view({pet: pet});
        });
    },
    'new': function(req,res){
        res.view('pet/new');
    },
    'show': function(req,res){
        Pet.findOne(req.param('id')).populate('shelterCreator').exec(function(err,pet){return res.view({
            pet: pet
          });});
          
    },
    create: function(req,res,next){
        var petObj = {
            name: req.param('name'),
            size: req.param('size'),
            age: req.param('age'),
            typeOfPet: req.param('typeOfPet'),
            breed: req.param('breed'),
            summary: req.param('summary'),
            sex: req.param('sex'),
            shelterCreator: req.session.Shelter.id
          }
        console.log(petObj);
        Pet.create(petObj, function petCreated(err, pet){
                if(err) {
                    console.log(err);
                    // store errors and old data in session
                    req.session.flash = {
                      err: err,
                      formErrors: err.Errors,
                      old: req.body,
                    }
                // If error redirect back to sign-up page
                return res.redirect('/pet/new');
              }
            return res.redirect('/pet/show/' + pet.id);
        });
    },
    update: function(req,res,next){
        var petObj = {
            name: req.param('name'),
            size: req.param('size'),
            age: req.param('age'),
            typeOfPet: req.param('typeOfPet'),
            breed: req.param('breed'),
            summary: req.param('summary'),
            sex: req.param('sex'),
            shelterCreator: req.session.Shelter.id
          }
          Pet.update(req.param('id'), petObj, function petUpdated(err) {
            if (err) {
              return res.redirect('/pet/edit/' + req.param('id'));
            }
      
            res.redirect('/pet/show/' + req.param('id'));
          });
    },
    destroy: function(req, res, next) {

        Pet.findOne(req.param('id'), function foundPet(err, pet) {
          if (err) return next(err);
    
          if (!pet) return next('Pet doesn\'t exist.');
    
          Pet.destroy(req.param('id'), function petDestroyed(err) {
            if (err) return next(err);
          });        
    
          res.redirect('/shelter/show/' + req.session.Shelter.id);
    
        });
      },
};

