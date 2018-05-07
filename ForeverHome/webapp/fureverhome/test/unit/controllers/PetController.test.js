var url = 'http://localhost:1337/';
var request = require('supertest')(url);

describe("pet model", function(){
    it("insert new record into pets table", function(done){
        var req = request.post("pet/create/");
        req.send({
            data:{
                name: "Roxie",
                size: "Small",
                age: 8,
                typeOfPet: "Dog",
                breed: "Dauschund",
                summary: "The best pet",
                sex: "Female",
                linkToImage: "",
                shelterCreator: 1
            }
        });
        req.end(function(err,res){
            if(err){
                throw err;
            }
            done();
        })
    }),
    it("update record in pets table", function(done){
        var req = request.post("pet/update/");
        req.send({
            find:{
                name: "Roxie"
            },
            data:{
                name: "Roxie",
                size: "Small",
                age: 8,
                typeOfPet: "Dog",
                breed: "Dauschund",
                summary: "The best pet",
                sex: "Female",
                linkToImage: "haha",
                shelterCreator: 1
            }

        });
        req.end(function(err,res){
            if(err){
                throw err;
            }
            done();
        })
    })
})