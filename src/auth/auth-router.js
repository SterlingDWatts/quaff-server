const express = require("express");
const AuthService = require("./auth-service");
const { requireAuth } = require("../middleware/jwt-auth");

const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter.post("/login", jsonBodyParser, (req, res, next) => {
  const { username, password } = req.body;
  const loginUser = { username, password };

  for (const [key, value] of Object.entries(loginUser)) {
    if (value == null) {
      return res.status(400).json({
        error: `Missing '${key}' in request body`
      });
    }
  }

  AuthService.getUserWithUserName(req.app.get("db"), loginUser.username)
    .then(dbUser => {
      if (!dbUser) {
        return res.status(400).json({
          error: "Invalid username or password"
        });
      }
      return AuthService.comparePasswords(
        loginUser.password,
        dbUser.password
      ).then(compareMatch => {
        if (!compareMatch) {
          return res.status(400).json({
            error: "Invalid username or password"
          });
        }

        const sub = dbUser.username;
        const payload = { id: dbUser.id };
        res.send({
          authToken: AuthService.createJwt(sub, payload)
        });
      });
    })
    .catch(next);
});

authRouter.post("/refresh", requireAuth, (req, res) => {
  const sub = req.user.username;
  const payload = { id: req.user.id };
  res.send({
    authToken: AuthService.createJwt(sub, payload)
  });
});

authRouter.get("/demo", (req, res, next) => {
  AuthService.deleteViews(req.app.get("db"), 3)
    .then(response => {
      AuthService.deleteTests(req.app.get("db"), 3)
        .then(resp => {
          res.send({
            authToken: AuthService.createJwt("DemoAccount", { id: 3 })
          });
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = authRouter;
