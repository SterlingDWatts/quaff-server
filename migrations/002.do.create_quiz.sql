CREATE TABLE modules (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  picture TEXT NOT NULL,
  position INTEGER NOT NULL
);

CREATE TABLE topics (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  picture TEXT NOT NULL
);

CREATE TABLE topic_relationships (
  child_id INTEGER REFERENCES topics(id) NOT NULL,
  parent_id INTEGER REFERENCES topics(id) NOT NULL,
  CONSTRAINT relationship PRIMARY KEY (child_id, parent_id)
);

CREATE TABLE questions (
  id SERIAL PRIMARY KEY,
  module_id INTEGER REFERENCES modules(id) NOT NULL,
  content TEXT NOT NULL
);

CREATE TABLE question_topics (
  question_id INTEGER REFERENCES questions(id) NOT NULL,
  topic_id INTEGER REFERENCES topics(id) NOT NULL,
  CONSTRAINT qt_id PRIMARY KEY (question_id,topic_id)
);

CREATE TABLE answers (
  id SERIAL PRIMARY KEY,
  question_id INTEGER REFERENCES questions(id) NOT NULL,
  correct BOOLEAN NOT NULL DEFAULT FALSE,
  content TEXT NOT NULL
);

CREATE TABLE views (
  id SERIAL PRIMARY KEY,
  date_viewed TIMESTAMP NOT NULL DEFAULT now(),
  user_id INTEGER REFERENCES users(id) NOT NULL,
  question_id INTEGER REFERENCES  questions(id) NOT NULL,
  chosen_answer_id INTEGER REFERENCES answers(id) NOT NULL
);

CREATE TABLE tests (
  id SERIAL PRIMARY KEY,
  date_taken TIMESTAMP NOT NULL DEFAULT now(),
  user_id INTEGER REFERENCES users(id) NOT NULL,
  module_id INTEGER REFERENCES modules(id) NOT NULL,
  score NUMERIC(5,4) NOT NULL
);