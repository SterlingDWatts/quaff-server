const knex = require("knex");
const bcrypt = require("bcryptjs");
const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Users endpoints", () => {
  let db;

  const testUsers = helpers.makeUsersArray();
  const testUser = testUsers[0];

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  describe("POST /api/users", () => {
    context("User Validation", () => {
      beforeEach("insert users", () => helpers.seedUsers(db, testUsers));

      const requiredFields = [
        "first_name",
        "last_name",
        "username",
        "email",
        "password"
      ];

      requiredFields.forEach(field => {
        const registerAttemptBody = {
          ...testUser
        };

        it(`responds with 400 required error when '${field}' is missing`, () => {
          delete registerAttemptBody[field];

          return supertest(app)
            .post("/api/users")
            .send(registerAttemptBody)
            .expect(400, { error: `Missing '${field}' in request body` });
        });
      });

      it("responds 400 'Password must be longer than 8 characters' when empty password", () => {
        const userShortPassword = {
          ...testUser,
          password: "short"
        };
        return supertest(app)
          .post("/api/users")
          .send(userShortPassword)
          .expect(400, {
            error: "Password must be between 8 and 72 characters"
          });
      });

      it("responds 400 'Password must be between 8 and 72 characters' when password too long", () => {
        const userLongPassword = {
          ...testUser,
          password: "*".repeat(73)
        };
        return supertest(app)
          .post("/api/users")
          .send(userLongPassword)
          .expect(400, {
            error: "Password must be between 8 and 72 characters"
          });
      });

      it("responds 400 error when password starts with spaces", () => {
        const userPasswordStartsSpace = {
          ...testUser,
          password: " password"
        };
        return supertest(app)
          .post("/api/users")
          .send(userPasswordStartsSpace)
          .expect(400, {
            error: "Password must not start or end with a space"
          });
      });

      it("responds 400 error when password ends with a spaces", () => {
        const userPasswordEndsSpace = {
          ...testUser,
          password: "password "
        };
        return supertest(app)
          .post("/api/users")
          .send(userPasswordEndsSpace)
          .expect(400, {
            error: "Password must not start or end with a space"
          });
      });

      const notComplexPasswords = [
        "aaAA1111",
        "aaAA!!!!",
        "aaaa11!!",
        "AAAA11!!"
      ];
      notComplexPasswords.forEach(password => {
        it("responds 400 error when password is not complex enough", () => {
          const userSimplePassword = {
            ...testUser,
            password
          };
          return supertest(app)
            .post("/api/users")
            .send(userSimplePassword)
            .expect(400, {
              error:
                "Password must contain one upper case, lower case, number, and special character"
            });
        });
      });

      it("responds 400 error when username is already taken", () => {
        return supertest(app)
          .post("/api/users")
          .send(testUser)
          .expect(400, {
            error: "Username already taken"
          });
      });
    });

    context("Happy path", () => {
      it("responds 201, serialized user, storing bcrypted password", () => {
        const newUser = {
          first_name: "realperson",
          last_name: "notexampleson",
          username: "realPNotE",
          email: "real_p_not_e@aol.com",
          password: "aaAA11!!"
        };
        return supertest(app)
          .post("/api/users")
          .send(newUser)
          .expect(201)
          .expect(res => {
            expect(res.body).to.have.property("id");
            expect(res.body.first_name).to.eql(newUser.first_name);
            expect(res.body.last_name).to.eql(newUser.last_name);
            expect(res.body.username).to.eql(newUser.username);
            expect(res.body.email).to.eql(newUser.email);
            expect(res.body).to.not.have.property("password");
            expect(res.headers.location).to.eql(`/api/users/${res.body.id}`);
            const expectedDate = new Date().toLocaleString("en", {
              timeZone: "UTC"
            });
            const actualDate = new Date(res.body.date_created).toLocaleString();
            expect(actualDate).to.eql(expectedDate);
          })
          .expect(res => {
            db.from("users")
              .select("*")
              .where({ id: res.body.id })
              .first()
              .then(row => {
                expect(row.first_name).to.eql(newUser.first_name);
                expect(row.last_name).to.eql(newUser.last_name);
                expect(row.username).to.eql(newUser.username);
                expect(row.email).to.eql(newUser.email);
                const expectedDate = new Date().toLocaleString("en", {
                  timeZone: "UTC"
                });
                const actualDate = new Date(row.date_created).toLocaleString();
                expect(actualDate).to.eql(expectedDate);

                return bcrypt.compare(newUser.password, row.password);
              })
              .then(compareMatch => {
                expect(compareMatch).to.be.true;
              });
          });
      });
    });
  });
});
