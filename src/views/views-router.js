const express = require("express");
const ViewsService = require("./views-service");
const { requireAuth } = require("../middleware/jwt-auth");

const viewsRouter = express.Router();
const jsonBodyParser = express.json();

viewsRouter.route("/").post(requireAuth, jsonBodyParser, (req, res, next) => {
  const newViews = req.body.views.map(view => {
    return {
      user_id: req.user.id,
      question_id: view.questionId,
      chosen_answer_id: view.chosenAnswerId
    };
  });

  ViewsService.insertViews(req.app.get("db"), newViews, req.user.id).then(
    topics => {
      res.json(topics);
    }
  );
});

module.exports = viewsRouter;
