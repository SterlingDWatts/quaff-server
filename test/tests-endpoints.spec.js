const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Test Endpoints", () => {
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

  describe("POST /api/test/:module_id", () => {
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

    context("Given a logged in user", () => {
      const testModuleId = 2;
      const newTestArray = [
        ...testTests,
        { id: 4, user_id: testUser.id, module_id: testModuleId, score: 0.8 }
      ];
      const expectedModules = helpers.makeExpectedModules(
        testModules,
        testUser.id,
        newTestArray
      );
      const test = {
        score: 0.8,
        views: [
          {
            questionId: 1,
            chosenAnswerId: 1
          },
          {
            questionId: 2,
            chosenAnswerId: 6
          },
          {
            questionId: 3,
            chosenAnswerId: 10
          }
        ]
      };
      it("responds with 200 and updated modules list", () => {
        return supertest(app)
          .post(`/api/tests/${testModuleId}`)
          .set("Authorization", helpers.makeAuthHeader(testUser))
          .send(test)
          .expect(200, expectedModules);
      });
    });
  });
});
