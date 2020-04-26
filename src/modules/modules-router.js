const express = require("express");
const ModulesService = require("./modules-service");
const { getUserId } = require("../middleware/jwt-auth");

const modulesRouter = express.Router();

modulesRouter.route("/").get(getUserId, (req, res, next) => {
  ModulesService.getAllModules(req.app.get("db"), req.user.id)
    .then(modules => {
      res.json(modules);
    })
    .catch(next);
});

module.exports = modulesRouter;
