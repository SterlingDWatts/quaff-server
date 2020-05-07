# Quaff Quizz

## About

Quaff Quizz is an interactive wine learning experience. Learn new material in bite sized chunks and later study the topics already encountered to solidify knowledge.

## Endpoints

1. /auth Endpoints
   - POST /login: handles loggin in
   - POST /refresh: handles refreshing credentials for logged in user
   - GET /demo: wipes all demo activity then sends demo token
2. /modules Endpoints
   - GET /: send all modules and scores for a given user
   - GET /:module_id: send module questions and answers
3. /topics Endpoints
   - GET /: send all topics for a given user
   - GET /:topic_id: send all topic questions and answers
4. /users Endpoints
   - POST /: handles creating a new account
5. /tests Endpoints
   - POST /: handles adding information from a test
6. /views Endpoints
   - POST /: handles adding information from answering questions

## Scripts

- Start 'Prettier' on-save `npm run prettier-watch`
- Run the tests `npm test`
- Migrate the server `npm run migrate`
- Migrate the test-server `npm run migrate:test`
- Start nodemon for the application `npm run dev`
- Start the application `npm start`

## Deploying

When your new project is ready for deployment, add a new Heroku application with `heroku create`. This will make a new git remote called "heroku" and you can then `npm run deploy` which will push to this remote's master branch.

## Live site

[Quaff Quizz](https://quaff.now.sh)
