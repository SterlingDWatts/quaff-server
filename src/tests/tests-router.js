const express = require("express");
const ViewsService = require("../views/views-service");
const ModulesService = require("../modules/modules-service");
const TestsService = require("./tests-service");
const { requireAuth } = require("../middleware/jwt-auth");

const testsRouter = express.Router();
const jsonBodyParser = express.json();

testsRouter
  .route("/:module_id")
  .post(requireAuth, jsonBodyParser, (req, res, next) => {
    const newViews = req.body.views.map(view => {
      return {
        user_id: req.user.id,
        question_id: view.questionId,
        chosen_answer_id: view.chosenAnswerId
      };
    });

    ViewsService.insertViews(req.app.get("db"), newViews, req.user.id)
      .then(topics => {
        const newTest = {
          user_id: req.user.id,
          module_id: Number(req.params.module_id),
          score: req.body.score
        };
        TestsService.insertTest(req.app.get("db"), newTest).then(modules => {
          let nextModule = ModulesService.findNextModule(modules);
          if (nextModule >= 0 || modules.length > 0) {
            nextModule = nextModule >= 0 ? nextModule : modules.length - 1;
            modules[nextModule].next = true;
          }
          res.json(modules);
        });
      })

      .catch(next);
  });

module.exports = testsRouter;
