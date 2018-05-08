require("./UserController.test");

var supertest = require('supertest');

describe("session controller", function () {
      it("login to site using invalid username and password", function (done) {
          supertest(sails.hooks.http.app)
            .post('/session/create')
            .send({
                username: "user2",
                password: "12345",
            })
            .expect(302)
            .expect('location', '/session/login', done);
        }),
        it("login to site using invalid username", function (done) {
            supertest(sails.hooks.http.app)
              .post('/session/create')
              .send({
                  username: "user2",
                  password: "1234",
              })
              .expect(302)
              .expect('location', '/session/login', done);
          }),
          it("login to site using invalid password", function (done) {
            supertest(sails.hooks.http.app)
              .post('/session/create')
              .send({
                  username: "user1",
                  password: "12345",
              })
              .expect(302)
              .expect('location', '/session/login', done);
          }),
          it("login to site as normal user using valid username and password", function (done) {
            supertest(sails.hooks.http.app)
              .post('/session/create')
              .send({
                  username: "user1",
                  password: "1234",
              })
              .expect(302)
              .expect('location', '/pet', done);
          }),
          it("login to site as shelter user using valid username and password", function (done) {
            supertest(sails.hooks.http.app)
              .post('/session/create')
              .send({
                  username: "shelter1",
                  password: "1234",
              })
              .expect(302)
              .expect('location', '/pet', done);
          })
          
          
    })