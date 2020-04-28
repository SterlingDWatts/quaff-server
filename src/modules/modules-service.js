const Treeize = require("treeize");

const ModulesService = {
  getAllModules(db, userId) {
    return db
      .select(
        "m.name",
        "m.id",
        "m.picture",
        db.raw("MAX(t.score) AS max_score")
      )
      .from("modules AS m")
      .leftJoin(
        db.raw(
          `(SELECT score, module_id, user_id FROM tests WHERE user_id = ${userId}) AS t`
        ),
        "m.id",
        "t.module_id"
      )
      .groupBy("m.id")
      .orderBy("m.position");
  },
  findNextModule(modules) {
    return modules.findIndex(
      mod => parseFloat(mod.max_score) < 0.75 || mod.max_score == null
    );
  },
  getById(db, modId) {
    return db
      .from("modules AS m")
      .select(
        "a.id AS questions:answers:id",
        "a.correct AS questions:answers:correct",
        "a.content AS questions:answers:content",
        "a.question_id AS questions:answers:question_id",
        "q.id AS questions:id",
        "q.content AS questions:content",
        "q.module_id AS questions:module_id",
        "m.id",
        "m.name",
        "m.picture",
        "m.position"
      )
      .leftJoin("questions AS q", "m.id", "q.module_id")
      .leftJoin("answers AS a", "q.id", "a.question_id")
      .where("m.id", modId);
  },
  serializeModule(mod) {
    const moduleTree = new Treeize();
    const moduleData = moduleTree.grow(mod).getData()[0];
    return moduleData;
  }
};

module.exports = ModulesService;
