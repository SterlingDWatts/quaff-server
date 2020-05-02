const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Views Endpoints", () => {
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

  describe("POST /api/views", () => {
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
      const newViews = {
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
      const expectedTopics = [
        {
          id: 4,
          name: "The 4th TOPIC!",
          picture: "https://this-is-the-4th-pic.com",
          seen: "2",
          correct: null
        },
        {
          id: 1,
          name: "Topic 1",
          picture: "https://topic-1-pic.com",
          seen: "2",
          correct: null
        },
        {
          id: 2,
          name: "Topic 2",
          picture: "https://tpicpic2.com",
          seen: "2",
          correct: "2"
        },
        {
          id: 3,
          name: "Topic 3",
          picture: "https://the-third-topic.com",
          seen: "2",
          correct: null
        }
      ];
      it("responds with 200 and updated topics", () => {
        return supertest(app)
          .post("/api/views")
          .set("Authorization", helpers.makeAuthHeader(testUser))
          .send(newViews)
          .expect(200, expectedTopics);
      });
    });
  });
});
