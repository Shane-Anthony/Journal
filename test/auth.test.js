const request = require("supertest");
const app = require("../server/index.js");
const { user } = require('../server/mongo');
let entryId;



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

// Testing the POST route '/create-entry'
describe("POST /create-entry", function () {
  // Testing if the response is in json format
  it("responds with json", function (done) {
    request(app)
      .post("/create-entry")
      .send({
        title: "Test Entry",
        body: "This is a test entry",
        username: "user1",
        colour: "blue",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        entryId = res.body._id;
        done();
      });
  });

  // Testing if the response returns an error for a non-existing user
  it("responds with error for non-existing user", function (done) {
    request(app)
      .post("/create-entry")
      .send({
        title: "Test Entry",
        body: "This is a test entry",
        username: "nonexistinguser",
        colour: "blue",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, { message: "User not found" }, done);
  });
});

// Testing the POST route '/contacts'
describe("POST /contacts", function() {
  // Testing if the response is in json format
  it("responds with json", function(done) {
    request(app)
      .post("/contacts")
      .send({ name: "John Doe", contact: "user2", username: "user1" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(201, done);
  });
});

// Testing the GET route '/contacts/:userId'
describe("GET /contacts/:userId", function() {
  // Testing if the response is in json format
  it("responds with json", function(done) {
    request(app)
      .get("/contacts/user1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});


// Testing the POST route '/share-entry/:username/:entryId/:shareUsername'
describe("POST /share-entry/:username/:entryId/:shareUsername", function () {
  beforeEach(async function () {
    // Reset the sharedWith array in the journalEntries field for all users
    await user.updateMany({}, { $set: { 'journalEntries.$[].sharedWith': [] } });
  });
  // Testing if the response is in json format
  it("responds with json", function (done) {
    request(app)
      .post(`/share-entry/user1/646a8a0be7df4fc61fb8c8da/user2`) // Use the mocked entry ID for sharing
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});


// Testing the GET route '/shared-entries/:userId'
describe("GET /shared-entries/:userId", function() {
  // Testing if the response is in json format
  it("responds with json", function(done) {
    request(app)
      .get("/shared-entries/user1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// Testing the GET route '/home/:userId'
describe("GET /home/:userId", function() {
  // Testing if the response is in json format
  it("responds with json", function(done) {
    request(app)
      .get("/home/user1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});