BEGIN;

SET CLIENT_ENCODING TO 'utf8';

TRUNCATE
  views, tests
  RESTART IDENTITY CASCADE;

INSERT INTO views (user_id, question_id, chosen_answer_id)
VALUES
  (1, 1, 1),
  (1, 2, 6),
  (1, 4, 9),
  (1, 5, 21),
  (1, 6, 27),
  (1, 7, 29),
  (1, 8, 33),
  (1, 1, 1),
  (1, 2, 6),
  (1, 4, 10),
  (1, 5, 21),
  (1, 6, 28),
  (1, 7, 29);

INSERT INTO tests (user_id, module_id, score)
VALUES
  (1, 1, 0.8),
  (1, 1, 0.6);

COMMIT;