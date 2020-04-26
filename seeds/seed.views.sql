BEGIN;

SET CLIENT_ENCODING TO 'utf8';

TRUNCATE
  views, tests
  RESTART IDENTITY CASCADE;

INSERT INTO views (user_id, question_id, chosen_answer_id)
VALUES
  (1, 1, 1),
  (1, 2, 2),
  (1, 4, 1),
  (1, 5, 1),
  (1, 6, 3),
  (1, 7, 1),
  (1, 8, 1);

INSERT INTO tests (user_id, module_id, score)
VALUES
  (1, 1, 0.8),
  (1, 1, 0.6);

COMMIT;