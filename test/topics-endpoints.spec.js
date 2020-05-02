const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Topics Endpoints", () => {
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

  describe("GET /api/topics", () => {
    context("Given no topics", () => {
      it("responds with 404 and an empty list", () => {
        return supertest(app)
          .get("/api/topics")
          .expect(200, []);
      });
    });

    context("Given topics in the database", () => {
      beforeEach("insert topics", () =>
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
        it("responds with 200 and all the topics", () => {
          const expectedTopics = [
            {
              id: 4,
              name: "The 4th TOPIC!",
              picture: "https://this-is-the-4th-pic.com",
              seen: null,
              correct: null
            },
            {
              id: 1,
              name: "Topic 1",
              picture: "https://topic-1-pic.com",
              seen: null,
              correct: null
            },
            {
              id: 2,
              name: "Topic 2",
              picture: "https://tpicpic2.com",
              seen: null,
              correct: null
            },
            {
              id: 3,
              name: "Topic 3",
              picture: "https://the-third-topic.com",
              seen: null,
              correct: null
            }
          ];

          return supertest(app)
            .get("/api/topics")
            .expect(200, expectedTopics);
        });
      });

      context("Given an existing user", () => {
        it("responds with 200 and all the topics as well as seen count and correct count", () => {
          const expectedTopics = [
            {
              id: 4,
              name: "The 4th TOPIC!",
              picture: "https://this-is-the-4th-pic.com",
              seen: "1",
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
              seen: "1",
              correct: "1"
            },
            {
              id: 3,
              name: "Topic 3",
              picture: "https://the-third-topic.com",
              seen: "1",
              correct: null
            }
          ];

          return supertest(app)
            .get("/api/topics")
            .set("Authorization", helpers.makeAuthHeader(testUser))
            .expect(200, expectedTopics);
        });
      });
    });
  });

  describe("GET /api/topics/:topic_id", () => {
    context("Given no topics in the database", () => {
      beforeEach("insert topics", () =>
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
        const nonExistantTopic = 123456789;
        return supertest(app)
          .get(`/api/topics/${nonExistantTopic}`)
          .expect(404, { error: "Topic doesn't exist" });
      });
    });

    context("Given there are topics in the database", () => {
      beforeEach("insert topics", () =>
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

      it("responds with 200 and the specified topic", () => {
        const topicId = 2;
        const expectedTopic = helpers.makeExpectedTopicTest(
          testTopics,
          testQuestionTopics,
          testQuestions,
          testAnswers,
          testTopicRelationships,
          testViews,
          topicId,
          testUser.id
        );
        const expectedTopicIds = [];
        const expectedQuestionIds = [];
        expectedTopic.forEach(topic => {
          expectedTopicIds.push(topic.id);
          expectedQuestionIds.push(
            ...topic.questions.map(question => question.id)
          );
        });
        return supertest(app)
          .get(`/api/topics/${topicId}`)
          .set("Authorization", helpers.makeAuthHeader(testUser))
          .expect(200)
          .expect(res => {
            res.body.forEach(topic => {
              expect(expectedTopicIds).to.include(topic.id);
              topic.questions.forEach(question => {
                expect(expectedQuestionIds).to.include(question.id);
              });
            });
          });
      });
    });
  });
});
