const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const AuthService = {
  getUserWithUserName(db, username) {
    return db("users")
      .where({ username })
      .first();
  },
  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject,
      algorithm: "HS256"
    });
  },
  verifyJwt(token) {
    return jwt.verify(token, config.JWT_SECRET, {
      algorithms: ["HS256"]
    });
  },
  deleteViews(db, userId) {
    return db("views")
      .where("user_id", userId)
      .del();
  },
  deleteTests(db, userId) {
    return db("tests")
      .where("user_id", userId)
      .del();
  }
};

module.exports = AuthService;
