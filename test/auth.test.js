const request = require("supertest");
const app = require("../server/index.js");

// Testing the POST route '/'
describe("POST /", function() {
  // Testing if the response is in json format
  it("responds with json", function(done) {
    request(app)
      .post("/")
      .send({ username: "user1", password: "Password1." })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// Testing the POST route '/signup'
describe("POST /signup", function() {
  // Testing if the response is in json format
  it("responds with json", function(done) {
    request(app)
      .post("/signup")
      .send({ username: "user1", password: "Password1." })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// Testing a non-existent route '/nonexistentroute'
describe("GET /nonexistentroute", function() {
   // Testing if the response returns a 404 status code
  it("responds with 404 status code", function(done) {
    request(app)
      .get("/nonexistentroute")
      .expect(404, done);
  });
});

// Testing the POST route '/signup' with a new username
describe("POST /signup with new username", function() {
  // Generate a unique username for each test run
  const uniqueUsername = "user_" + new Date().getTime();

  // Testing if the response returns a 201 status code
  it("responds with 201 status code", function(done) {
    request(app)
      .post("/signup")
      .send({ username: uniqueUsername, password: "Password2." })
      .set("Accept", "application/json")
      .expect(201, "User created successfully", done);
  });
});

// Testing the GET route '/'
describe("GET /", function() {
  // Testing if the response returns a 200 status code
  it("responds with 200 status code", function(done) {
    request(app)
      .get("/")
      .expect(200, done);
  });
});

// Testing the POST route '/' with an incorrect username and password
describe("POST / with incorrect username and password", function() {
  // Testing if the response returns 'does not exist'
  it("responds with 'does not exist'", function(done) {
    request(app)
      .post("/")
      .send({ username: "nonexistentuser", password: "wrongpassword" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, "\"does not exist\"", done);
  });
});

// Testing the POST route '/signup' with an existing username
describe("POST /signup with existing username", function() {
   // Testing if the response returns 'exist'
  it("responds with 'exist'", function(done) {
    request(app)
      .post("/signup")
      .send({ username: "user1", password: "Password1." })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, "\"exist\"", done);
  });
});