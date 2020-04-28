const Treeize = require("treeize");

const TopicsService = {
  getAllTopics(db, userId) {
    return db
      .from("topics as T")
      .select(
        "t.id",
        "t.name",
        "t.picture",
        db.raw("SUM(s.seen) AS seen"),
        db.raw("SUM(c.correct) AS correct")
      )
      .from("topics AS t")
      .leftJoin("question_topics AS qt", "t.id", "qt.topic_id")
      .leftJoin(
        db.raw(
          `(SELECT question_id, COUNT(question_id) AS seen FROM views WHERE user_id = ${userId} GROUP BY question_id) AS s`
        ),
        "qt.question_id",
        "s.question_id"
      )
      .leftJoin(
        db.raw(
          `(SELECT v.question_id AS question_id, COUNT(v.question_id) AS correct FROM views AS v LEFT JOIN answers AS a ON v.chosen_answer_id = a.id WHERE user_id = ${userId} AND a.correct GROUP BY v.question_id) AS c`
        ),
        "qt.question_id",
        "c.question_id"
      )
      .groupBy("t.id")
      .orderBy("t.name");
  },
  getById(db, topicId) {
    return db
      .from("topics as t")
      .select(
        "t.id AS topics:id",
        "t.name AS topics:name",
        "t.picture AS topics:picture",
        "a.id AS topics:questions:answers:id",
        "a.correct AS topics:questions:answers:correct",
        "a.content AS topics:questions:answers:content",
        "a.question_id AS topics:questions:answers:question_id",
        "q.id AS topics:questions:id",
        "q.content AS topics:questions:content",
        "qt.topic_id AS topics:questions:topic_id"
      )
      .leftJoin("question_topics AS qt", "t.id", "qt.topic_id")
      .leftJoin("questions AS q", "qt.question_id", "q.id")
      .leftJoin("answers AS a", "q.id", "a.question_id")
      .leftJoin("topic_relationships AS tr", "t.id", "tr.parent_id")
      .where("t.id", topicId)
      .orWhere("tr.child_id", topicId);
  },
  serializeTopic(topic) {
    const topicTree = new Treeize();
    const topicData = topicTree.grow(topic).getData();
    return topicData;
  }
};

module.exports = TopicsService;
