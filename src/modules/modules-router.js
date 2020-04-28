const express = require("express");
const ModulesService = require("./modules-service");
const { getUserId } = require("../middleware/jwt-auth");

const modulesRouter = express.Router();

modulesRouter.route("/").get(getUserId, (req, res, next) => {
  ModulesService.getAllModules(req.app.get("db"), req.user.id)
    .then(modules => {
      let nextModule = ModulesService.findNextModule(modules);
      if (nextModule >= 0 || modules.length > 0) {
        nextModule = nextModule >= 0 ? nextModule : modules.length - 1;
        modules[nextModule].next = true;
      }
      res.json(modules);
    })
    .catch(next);
});

modulesRouter
  .route("/:module_id")
  .all(checkModuleExists)
  .get((req, res, next) => {
    res.json(ModulesService.serializeModule(res.mod));
  });

async function checkModuleExists(req, res, next) {
  try {
    const mod = await ModulesService.getById(
      req.app.get("db"),
      req.params.module_id
    );

    if (!mod || mod.length < 1) {
      return res.status(404).json({ error: "Module doesn't exist" });
    }

    res.mod = mod;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = modulesRouter;
