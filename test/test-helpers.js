const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function makeUsersArray() {
  return [
    {
      id: 1,
      first_name: "test-one",
      last_name: "user-one",
      username: "test-user-one",
      email: "test-one@gmail.com",
      password: "aaAA11!!",
      nickname: "testy",
      date_created: new Date("2029-01-22T20:28:32.615Z")
    },
    {
      id: 2,
      first_name: "test-two",
      last_name: "user-two",
      username: "test-user-two",
      email: "test-two@gmail.com",
      password: "bbBB22@@",
      nickname: "twomy",
      date_created: new Date("2029-02-22T16:28:32.615Z")
    },
    {
      id: 3,
      first_name: "test-three",
      last_name: "user-three",
      username: "test-user-three",
      email: "test-three@gmail.com",
      password: "ccCC33##",
      nickname: "bob",
      date_created: new Date("2020-01-22T14:28:32.615Z")
    },
    {
      id: 4,
      first_name: "test-four",
      last_name: "user-four",
      username: "test-user-four",
      email: "test-four@gmail.com",
      password: "ddDD44$$",
      nickname: null,
      date_created: new Date("2019-10-23T01:28:32.615Z")
    }
  ];
}

function makeModulesArray() {
  return [
    {
      id: 1,
      name: "Module 1",
      picture: "https://picture1.com",
      position: 0
    },
    {
      id: 2,
      name: "Mod #2",
      picture: "https://pic2.com",
      position: 1
    },
    {
      id: 3,
      name: "Mod the rod # 3",
      picture: "https://pictureThree.com",
      position: 2
    },
    {
      id: 4,
      name: "The 4th Module",
      picture: "https://444444444444.com",
      position: 3
    }
  ];
}

function makeTopicsArray() {
  return [
    {
      id: 1,
      name: "Topic 1",
      picture: "https://topic-1-pic.com"
    },
    {
      id: 2,
      name: "Topic 2",
      picture: "https://tpicpic2.com"
    },
    {
      id: 3,
      name: "Topic 3",
      picture: "https://the-third-topic.com"
    },
    {
      id: 4,
      name: "The 4th TOPIC!",
      picture: "https://this-is-the-4th-pic.com"
    }
  ];
}

function makeTopicRelationshipsArray(topics) {
  return [
    {
      child_id: topics[0].id,
      parent_id: topics[1].id
    },
    {
      child_id: topics[1].id,
      parent_id: topics[2].id
    }
  ];
}

function makeQuestionsArray(modules) {
  return [
    {
      id: 1,
      module_id: modules[0].id,
      content: "This is a smart question"
    },
    {
      id: 2,
      module_id: modules[0].id,
      content: "This is an even better question"
    },
    {
      id: 3,
      module_id: modules[0].id,
      content: "How much wood could..."
    },
    {
      id: 4,
      module_id: modules[0].id,
      content: "How far away is the moon?"
    },
    {
      id: 5,
      module_id: modules[1].id,
      content: "How long will it take to drive to Alaska?"
    },
    {
      id: 6,
      module_id: modules[1].id,
      content: "Where in the world is Carmen?"
    },
    {
      id: 7,
      module_id: modules[1].id,
      content: "Another great question"
    },
    {
      id: 8,
      module_id: modules[1].id,
      content: "The last great question"
    },
    {
      id: 9,
      module_id: modules[2].id,
      content: "Another question"
    },
    {
      id: 10,
      module_id: modules[2].id,
      content: "What time is it in England?"
    },
    {
      id: 11,
      module_id: modules[2].id,
      content: "Where is the bathroom?"
    },
    {
      id: 12,
      module_id: modules[2].id,
      content: "How tall am I?"
    },
    {
      id: 13,
      module_id: modules[3].id,
      content: "What's up Doc?"
    },
    {
      id: 14,
      module_id: modules[3].id,
      content: "Where for art though?"
    },
    {
      id: 15,
      module_id: modules[3].id,
      content: "Sooooo close"
    },
    {
      id: 16,
      module_id: modules[3].id,
      content: "Wooo hooo!"
    }
  ];
}

function makeQuestionTopicsArray(questions, topics) {
  const questionTopicArray = [];
  questions.forEach(question => {
    questionTopicArray.push({
      question_id: question.id,
      topic_id: topics[question.id % topics.length].id
    });
  });
  return questionTopicArray;
}

function makeAnswersArray(questions) {
  const possibleAnswers = [
    "pie times cosine",
    "The tangent of Sweden",
    "Oh no you didn't",
    "you go girl",
    "I just need a few more",
    "12",
    "Yaaaaaaas!"
  ];
  const answersArray = [];
  questions.forEach(question => {
    let idBase = (question.id - 1) * 4;
    idBase++;
    answersArray.push({
      id: idBase,
      question_id: question.id,
      content: possibleAnswers[idBase % possibleAnswers.length],
      correct: true
    });
    idBase++;
    answersArray.push({
      id: idBase,
      question_id: question.id,
      content: possibleAnswers[idBase % possibleAnswers.length],
      correct: false
    });
    idBase++;
    answersArray.push({
      id: idBase,
      question_id: question.id,
      content: possibleAnswers[idBase % possibleAnswers.length],
      correct: false
    });
    idBase++;
    answersArray.push({
      id: idBase,
      question_id: question.id,
      content: possibleAnswers[idBase % possibleAnswers.length],
      correct: false
    });
  });
  return answersArray;
}

function makeViewsArray(users, questions, answers) {
  return [
    {
      id: 1,
      user_id: users[0].id,
      question_id: questions[0].id,
      chosen_answer_id: answers[0].id
    },
    {
      id: 2,
      user_id: users[0].id,
      question_id: questions[1].id,
      chosen_answer_id: answers[5].id
    },
    {
      id: 3,
      user_id: users[0].id,
      question_id: questions[2].id,
      chosen_answer_id: answers[10].id
    }
  ];
}

function makeTestsArray(users, modules) {
  return [
    {
      id: 1,
      user_id: users[0].id,
      module_id: modules[0].id,
      score: 0.6
    },
    {
      id: 2,
      user_id: users[0].id,
      module_id: modules[0].id,
      score: 0.8
    },
    {
      id: 3,
      user_id: users[0].id,
      module_id: modules[0].id,
      score: 0.6
    }
  ];
}

function makeExpectedModule(mod, userId, tests) {
  let score = null;
  const testScores = tests.filter(
    test => test.user_id === userId && test.module_id === mod.id
  );
  if (testScores && testScores.length > 0) {
    const scores = testScores
      .map(test => test.score)
      .reduce((curr, prev) => (curr > prev ? curr : prev));

    score = scores;
  }
  return {
    id: mod.id,
    max_score: score,
    name: mod.name,
    picture: mod.picture
  };
}

function makeQuaffFixtures() {
  const testUsers = makeUsersArray();
  const testModules = makeModulesArray();
  const testTopics = makeTopicsArray();
  const testTopicRelationships = makeTopicRelationshipsArray(testTopics);
  const testQuestions = makeQuestionsArray(testModules);
  const testQuestionTopics = makeQuestionTopicsArray(testQuestions, testTopics);
  const testAnswers = makeAnswersArray(testQuestions);
  const testViews = makeViewsArray(testUsers, testQuestions, testAnswers);
  const testTests = makeTestsArray(testUsers, testModules);
  return {
    testUsers,
    testModules,
    testTopics,
    testTopicRelationships,
    testQuestions,
    testQuestionTopics,
    testAnswers,
    testViews,
    testTests
  };
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx
      .raw(
        `TRUNCATE
          users,
          tests, 
          views, 
          answers, 
          topic_relationships, 
          question_topics, 
          topics, 
          questions, 
          modules
        `
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE tests_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE views_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE answers_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE topics_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE questions_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE modules_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('users_id_seq', 0)`),
          trx.raw(`SELECT setval('tests_id_seq', 0)`),
          trx.raw(`SELECT setval('views_id_seq', 0)`),
          trx.raw(`SELECT setval('answers_id_seq', 0)`),
          trx.raw(`SELECT setval('topics_id_seq', 0)`),
          trx.raw(`SELECT setval('questions_id_seq', 0)`),
          trx.raw(`SELECT setval('modules_id_seq', 0)`)
        ])
      )
  );
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }));
  return db
    .into("users")
    .insert(preppedUsers)
    .then(() =>
      db.raw(`SELECT setval('users_id_seq', ?)`, [users[users.length - 1].id])
    );
}

function seedQuaff(
  db,
  users,
  modules,
  topics,
  topicRelationships,
  questions,
  questionTopics,
  answers,
  views,
  tests
) {
  return db.transaction(async trx => {
    await seedUsers(trx, users);
    await trx.into("modules").insert(modules);
    await trx.raw(`SELECT setval('modules_id_seq', ?)`, [
      modules[modules.length - 1].id
    ]);
    await trx.into("topics").insert(topics);
    await trx.raw(`SELECT setval('topics_id_seq', ?)`, [
      topics[topics.length - 1].id
    ]);
    await trx.into("topic_relationships").insert(topicRelationships);
    await trx.into("questions").insert(questions);
    await trx.raw(`SELECT setval('questions_id_seq', ?)`, [
      questions[questions.length - 1].id
    ]);
    await trx.into("question_topics").insert(questionTopics);
    await trx.into("answers").insert(answers);
    await trx.raw(`SELECT setval('answers_id_seq', ?)`, [
      answers[answers.length - 1].id
    ]);
    await trx.into("views").insert(views);
    await trx.raw(`SELECT setval('views_id_seq', ?)`, [
      views[views.length - 1].id
    ]);
    await trx.into("tests").insert(tests);
    await trx.raw(`SELECT setval('tests_id_seq', ?)`, [
      tests[tests.length - 1].id
    ]);
  });
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ id: user.id }, secret, {
    subject: user.username,
    algorithm: "HS256"
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeUsersArray,
  makeModulesArray,
  makeTopicsArray,
  makeTopicRelationshipsArray,
  makeQuestionsArray,
  makeQuestionTopicsArray,
  makeAnswersArray,
  makeViewsArray,
  makeTestsArray,
  makeExpectedModule,

  makeQuaffFixtures,
  cleanTables,
  seedUsers,
  seedQuaff,
  makeAuthHeader
};
