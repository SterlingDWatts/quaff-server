const express = require("express");
const TopicsService = require("./topics-service");
const { getUserId } = require("../middleware/jwt-auth");

const topicsRouter = express.Router();

topicsRouter.route("/").get(getUserId, (req, res, next) => {
  TopicsService.getAllTopics(req.app.get("db"), req.user.id)
    .then(topics => {
      res.json(topics);
    })
    .catch(next);
});

topicsRouter
  .route("/:topic_id")
  .get(getUserId, checkTopicExists, (req, res) => {
    res.json(TopicsService.serializeTopic(res.topic));
  });

async function checkTopicExists(req, res, next) {
  try {
    const topic = await TopicsService.getById(
      req.app.get("db"),
      req.params.topic_id,
      req.user.id
    );

    if (!topic || topic.length < 1) {
      return res.status(404).json({ error: "Topic doesn't exist" });
    }

    res.topic = topic;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = topicsRouter;
