const TopicsService = require("../topics/topics-service");

const ViewsService = {
  insertViews(db, newViews, userId) {
    return db
      .insert(newViews)
      .into("views")
      .then(res => TopicsService.getAllTopics(db, userId));
  }
};

module.exports = ViewsService;
