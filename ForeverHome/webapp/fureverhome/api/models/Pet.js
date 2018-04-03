/**
 * Pet.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  schema: true,
  attributes: {
    name:{
      type: 'string'
    },
    size:{
      type: 'string',
    },
    age:{
      type:'string'
    },
    typeOfPet:{
      type: 'string'
    },
    breed:{
      type:'string'
    },
    summary:{
      type:'string'
    },
    sex:{
      type: 'string',
    },
    shelterCreator:{
      model: 'shelter'
    }
  }
};

