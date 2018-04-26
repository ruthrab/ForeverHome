/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcryptNodejs = require("bcrypt-nodejs")
module.exports = {
  schema: true,
  attributes: {
      username: {
          type: 'string',
          unique: true,
          required: true
      },
      email:{
        type: 'string',
        unique: true,
        email: true,
        required: true
      },
      encryptedPassword:{
        type: 'string'
      },
      isShelter:{
        type: 'boolean',
        defaultsTo: 'false'
      },
      toJSON: function(){
        var obj = this.toObject();
        delete obj.password;
        delete obj.confirmation;
        delete obj.encryptedPassword;
        delete obj._csrf;
        return obj;
      }
    },

  beforeCreate: function (values, next) {

    // This checks to make sure the password and password confirmation match before creating record
    if(values.password == undefined || values.confirmation == undefined){
      return next({formErrors: ["Please fully complete the form"]});
    }
    if (!values.password || values.password != values.confirmation) {
      return next({formErrors: ["Password doesn't match password confirmation."]});
    }

    bcryptNodejs.hash(values.password, bcryptNodejs.genSaltSync(10), null ,function passwordEncrypted(err, encryptedPassword) {
      console.log(err);
      if (err) return next(err);
      values.encryptedPassword = encryptedPassword;
      // values.online= true;
      next();
    });
  }
      
};

