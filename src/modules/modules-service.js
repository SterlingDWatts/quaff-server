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
  }
};

module.exports = ModulesService;
