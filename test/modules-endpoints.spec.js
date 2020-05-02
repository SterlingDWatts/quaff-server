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
          const expectedModules = testModules.map(mod =>
            helpers.makeExpectedModule(mod, [])
          );
          expectedModules[0].next = true;
          return supertest(app)
            .get("/api/modules")
            .expect(200, expectedModules);
        });
      });

      context("Given a logged in user", () => {
        it("responds with 200 and all the modules with scores", () => {
          const expectedModules = helpers.makeExpectedModules(
            testModules,
            testUser.id,
            testTests
          );
          return supertest(app)
            .get("/api/modules")
            .set("Authorization", helpers.makeAuthHeader(testUser))
            .expect(200, expectedModules);
        });
      });
    });
  });

  describe("GET /api/modules/:module_id", () => {
    context("Given no modules", () => {
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

      it("responds with 404", () => {
        const nonExistantModule = 123456789;
        return supertest(app)
          .get(`/api/modules/${nonExistantModule}`)
          .expect(404, { error: "Module doesn't exist" });
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

      it("responds with 200 and the specified module", () => {
        const moduleId = 1;
        const expectedModule = helpers.makeExpectedTest(
          testModules,
          testQuestions,
          testAnswers,
          moduleId
        );

        return supertest(app)
          .get(`/api/modules/${moduleId}`)
          .expect(200, expectedModule);
      });
    });
  });
});
