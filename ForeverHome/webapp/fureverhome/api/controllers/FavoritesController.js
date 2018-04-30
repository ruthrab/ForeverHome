/**
 * FavoritesController
 *
 * @description :: Server-side logic for managing favorites
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    create: function(req,res,next){
        var favoriteObj = {
            petId:req.param('petId'),
            userId:req.param('userId')
          }
        Favorites.create(favoriteObj, function favoriteCreated(err, favorite){
                if(err) {
                console.log(err);
                }
            return res.redirect(req.param('path'));
        });
    },
    index: function(req,res,next){
        Favorites.find({userId: req.session.User.id}).populate('petId').exec(function foundFavorites (err,favorites){
            if(err)return next(err);
            res.view({favorites:favorites});
        });
    },
	destroy: function(req, res, next) {
        Favorites.findOne(req.param('id'), function foundFavorite(err, favorite) {
          if (err) return next(err);
    
          if (!favorite) return next('Favorite doesn\'t exist.');
    
          Favorites.destroy(req.param('id'), function favoriteDestroyed(err) {
            if (err) return next(err);
          });        
          return res.redirect(req.param('path'));
        });
      },
};

