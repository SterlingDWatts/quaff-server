const knex = require("knex");
const jwt = require("jsonwebtoken");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Auth Endpoints", () => {
  let db;

  const {
    testUsers,
    testModules,
    testTopics,
    testTopicRelationships,
    testQuestions,
    testQuestionTopics,
    testAnswers,
    testViews,
    testTests
  } = helpers.makeQuaffFixtures();
  const testUser = testUsers[0];

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe("POST /api/auth/login", () => {
    beforeEach("insert users", () => helpers.seedUsers(db, testUsers));

    const requiredFields = ["username", "password"];

    requiredFields.forEach(field => {
      const loginAttemptBody = {
        username: testUser.username,
        password: testUser.password
      };

      it(`responds with 400 required error when '${field}' is missing`, () => {
        delete loginAttemptBody[field];

        return supertest(app)
          .post("/api/auth/login")
          .send(loginAttemptBody)
          .expect(400, {
            error: `Missing '${field}' in request body`
          });
      });
    });

    it("responds 400 'invalid username or password' when bad username", () => {
      const userInvalidUser = { username: "user-not", password: "existy" };
      return supertest(app)
        .post("/api/auth/login")
        .send(userInvalidUser)
        .expect(400, { error: "Invalid username or password" });
    });

    it("responds 400 'invalid username or password' when bad password", () => {
      const userInvalidPassword = {
        username: testUser.username,
        password: "abCD56&*"
      };
      return supertest(app)
        .post("/api/auth/login")
        .send(userInvalidPassword)
        .expect(400, { error: "Invalid username or password" });
    });

    it("responds 200 and JWT auth token using secret when valid credentials", () => {
      const userValidCreds = {
        username: testUser.username,
        password: testUser.password
      };
      const expectedToken = jwt.sign(
        { id: testUser.id },
        process.env.JWT_SECRET,
        {
          subject: testUser.username,
          algorithm: "HS256"
        }
      );
      return supertest(app)
        .post("/api/auth/login")
        .send(userValidCreds)
        .expect(200, {
          authToken: expectedToken
        });
    });
  });

  describe("POST /api/auth/refresh", () => {
    beforeEach("insert users", () => helpers.seedUsers(db, testUsers));

    it("responds 200 and JWT auth token using secret", () => {
      const expectedToken = jwt.sign(
        { id: testUser.id },
        process.env.JWT_SECRET,
        {
          subject: testUser.username,
          algorithm: "HS256"
        }
      );
      return supertest(app)
        .post("/api/auth/refresh")
        .set("Authorization", helpers.makeAuthHeader(testUser))
        .expect(200, {
          authToken: expectedToken
        });
    });
  });

  describe("GET /api/auth/demo", () => {
    const updatedTestUsers = testUsers.slice();
    updatedTestUsers[2] = { ...testUsers[2], username: "DemoAccount" };
    const demoUser = updatedTestUsers[2];
    beforeEach("insert quaff", () =>
      helpers.seedQuaff(
        db,
        updatedTestUsers,
        testModules,
        testTopics,
        testTopicRelationships,
        testQuestions,
        testQuestionTopics,
        testAnswers,
        testViews,
        testTests
      )
    );
    it("responds 200 and JWT auth token", () => {
      const expectedToken = jwt.sign(
        { id: demoUser.id },
        process.env.JWT_SECRET,
        {
          subject: demoUser.username,
          algorithm: "HS256"
        }
      );
      return supertest(app)
        .get("/api/auth/demo")
        .expect(200, {
          authToken: expectedToken
        });
    });
  });
});
