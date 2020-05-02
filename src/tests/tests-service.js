const ModulesService = require("../modules/modules-service");

const TestsService = {
  insertTest(db, newTest) {
    return db
      .insert(newTest)
      .into("tests")
      .then(res => ModulesService.getAllModules(db, newTest.user_id));
  }
};

module.exports = TestsService;
