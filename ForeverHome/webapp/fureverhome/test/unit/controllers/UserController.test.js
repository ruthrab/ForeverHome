var supertest = require('supertest');

describe("user model", function () {
      it("create a new normal user", function (done) {
          supertest(sails.hooks.http.app)
            .post('/user/create')
            .send({
                username: "user1",
                email: "user1@email.com",
                password: "1234",
                confirmation: "1234",
                isShelter: "undefined"
            })
            .expect(302)
            .expect('location', '/pet', done);
        }),
        it("create a normal user with same username", function (done) {
            supertest(sails.hooks.http.app)
              .post('/user/create')
              .send({
                  username: "user1",
                  email: "user@email.com",
                  password: "1234",
                  confirmation: "1234",
                  isShelter: "undefined"
              })
              .expect(302)
              .expect('location', '/user/register', done);
          }),
          it("create a new normal user with same email", function (done) {
            supertest(sails.hooks.http.app)
              .post('/user/create')
              .send({
                  username: "user2",
                  email: "user1@email.com",
                  password: "1234",
                  confirmation: "1234",
                  isShelter: "undefined"
              })
              .expect(302)
              .expect('location', '/user/register', done);
          }),
          it("create a normal user without matching passwords", function (done) {
            supertest(sails.hooks.http.app)
              .post('/user/create')
              .send({
                  username: "user2",
                  email: "user2@email.com",
                  password: "1234",
                  confirmation: "12345",
                  isShelter: "undefined"
              })
              .expect(302)
              .expect('location', '/user/register', done);
          }),
          it("create a new shelter user", function (done) {
            supertest(sails.hooks.http.app)
              .post('/user/create')
              .send({
                  username: "shelter1",
                  email: "shelter1@email.com",
                  password: "1234",
                  confirmation: "1234",
                  isShelter: "on"
              })
              .expect(302)
              .expect('location', '/shelter/new', done);
          }),
          it("create a new shelter user with same username", function (done) {
            supertest(sails.hooks.http.app)
              .post('/user/create')
              .send({
                  username: "shelter1",
                  email: "shelter@email.com",
                  password: "1234",
                  confirmation: "1234",
                  isShelter: "on"
              })
              .expect(302)
              .expect('location', '/user/register', done);
          }),
          it("create a new shelter user with same email", function (done) {
            supertest(sails.hooks.http.app)
              .post('/user/create')
              .send({
                  username: "shelter2",
                  email: "shelter1@email.com",
                  password: "1234",
                  confirmation: "1234",
                  isShelter: "on"
              })
              .expect(302)
              .expect('location', '/user/register', done);
          }),
          it("create a new shelter user without matching passwords", function (done) {
            supertest(sails.hooks.http.app)
              .post('/user/create')
              .send({
                  username: "shelter2",
                  email: "shelter2@email.com",
                  password: "1234",
                  confirmation: "12345",
                  isShelter: "on"
              })
              .expect(302)
              .expect('location', '/user/register', done);
          })
          
    })