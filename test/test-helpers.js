const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function makeUsersArray() {
  return [
    {
      id: 1,
      first_name: "test-one",
      last_name: "user-one",
      username: "test-user-one",
      email: "test-one@gmail.com",
      password: "aaAA11!!",
      nickname: "testy",
      date_created: new Date("2029-01-22T20:28:32.615Z")
    },
    {
      id: 2,
      first_name: "test-two",
      last_name: "user-two",
      username: "test-user-two",
      email: "test-two@gmail.com",
      password: "bbBB22@@",
      nickname: "twomy",
      date_created: new Date("2029-02-22T16:28:32.615Z")
    },
    {
      id: 3,
      first_name: "test-three",
      last_name: "user-three",
      username: "test-user-three",
      email: "test-three@gmail.com",
      password: "ccCC33##",
      nickname: "bob",
      date_created: new Date("2020-01-22T14:28:32.615Z")
    },
    {
      id: 4,
      first_name: "test-four",
      last_name: "user-four",
      username: "test-user-four",
      email: "test-four@gmail.com",
      password: "ddDD44$$",
      nickname: null,
      date_created: new Date("2019-10-23T01:28:32.615Z")
    }
  ];
}

function cleanTables(db) {
  return db.transaction(trx =>
    trx
      .raw(
        `TRUNCATE
          users
        `
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE users_id_seq minvalue 0 START WITH 1`),
          trx.raw(`SELECT setval('users_id_seq', 0)`)
        ])
      )
  );
}

function seedUsers(db, users) {
  const preppedUsers = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1)
  }));
  return db
    .into("users")
    .insert(preppedUsers)
    .then(() =>
      db.raw(`SELECT setval('users_id_seq', ?)`, [users[users.length - 1].id])
    );
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ id: user.id }, secret, {
    subject: user.username,
    algorithm: "HS256"
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeUsersArray,

  cleanTables,
  seedUsers,
  makeAuthHeader
};
