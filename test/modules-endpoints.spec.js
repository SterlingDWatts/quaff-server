const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Modules endpoints", () => {
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

  describe("GET /api/modules", () => {
    context("Given no modules", () => {
      it("responds with 200 and an empty list", () => {
        return supertest(app)
          .get("/api/modules")
          .expect(200, []);
      });
    });

    context("Given there are modules in the database", () => {
      beforeEach("insert quaff", () =>
        helpers.seedQuaff(
          db,
          testUsers,
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

      context("Given an anonymous user", () => {
        it("responds with 200 and all the modules", () => {
          const expetedModules = testModules.map(mod => {
            return helpers.makeExpectedModule(mod, -1, testTests);
          });
          return supertest(app)
            .get("/api/modules")
            .expect(200, expetedModules);
        });
      });

      context("Given a logged in user", () => {
        it("responds with 200 and all the modules with scores", () => {
          const expetedModules = testModules.map(mod => {
            return helpers.makeExpectedModule(mod, testUser.id, testTests);
          });
          return supertest(app)
            .get("/api/modules")
            .set("Authorization", helpers.makeAuthHeader(testUser))
            .expect(200)
            .expect(res => {
              expect(res.body[0].id).to.eql(expetedModules[0].id);
              expect(res.body[0].name).to.eql(expetedModules[0].name);
              expect(res.body[0].picture).to.eql(expetedModules[0].picture);
              expect(parseFloat(res.body[0].max_score)).to.eql(
                expetedModules[0].max_score
              );
            });
        });
      });
    });
  });
});
