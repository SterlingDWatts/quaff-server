BEGIN;

SET CLIENT_ENCODING TO 'utf8';

TRUNCATE
  modules, topics, topic_relationships, questions, question_topics
  RESTART IDENTITY CASCADE;

INSERT INTO modules (name, picture, position)
VALUES
  ('5 vine needs', 'https://sterlingdwatts.github.io/quaff_quizz/images/viticulture2.jpg', 0),
  ('Climate v Weather', 'https://sterlingdwatts.github.io/quaff_quizz/images/viticulture2.jpg', 1),
  ('Grape Selection', 'https://sterlingdwatts.github.io/quaff_quizz/images/viticulture2.jpg', 2);

INSERT INTO topics (name, picture)
VALUES
  ('Viticulture', 'https://sterlingdwatts.github.io/quaff_quizz/images/viticulture2.jpg'),
  ('Climate', 'https://sterlingdwatts.github.io/quaff_quizz/images/viticulture2.jpg'),
  ('Grapes', 'https://sterlingdwatts.github.io/quaff_quizz/images/viticulture2.jpg');

INSERT INTO topic_relationships (child_id, parent_id)
VALUES
  (2, 1),
  (3, 1);

INSERT INTO questions (module_id, content)
VALUES
  (1, 'What 5 things are needed to produce grapes?'),
  (1, 'What characteristics are expected from a cool climate?'),
  (1, 'What affect does rain at harvest have?'),
  (1, 'How can a large body of water affect a vine?'),
  (1, 'How can clay help vines that need more water?'),
  (1, 'What is used to produce sugar in grapes?'),
  (1, 'What can help vines attain more sunlight in areas further away from the equator?'),
  (1, 'What does diurnal shift mean?'),
  (2, 'What is a trait of a Mediterranean Climate?'),
  (2, 'What is a Macroclimate?'),
  (2, 'What is a Mesoclimate?'),
  (2, 'What is a Microclimate?'),
  (2, 'What is does climate mean?'),
  (2, 'How could weather positively affect an area?'),
  (2, 'What is a trait of a Continental Climate?'),
  (2, 'What is a trait of a Maritime Climate?'),
  (3, 'What is vine species used in most wine?'),
  (3, 'What is a reason for choosing a rootstock?'),
  (3, 'What pest has had the largest impact on rootstock choice?'),
  (3, 'What type of climate does Pinot Noir do well in?'),
  (3, 'Why does Cabernet Sauvignon have lots of tannin?');

INSERT INTO question_topics (question_id, topic_id)
VALUES
  (1, 1),
  (2, 1),
  (3, 1),
  (4, 1),
  (5, 1),
  (6, 1),
  (7, 1),
  (8, 1),
  (9, 2),
  (10, 2),
  (11, 2),
  (12, 2),
  (13, 2),
  (14, 2),
  (15, 2),
  (16, 2),
  (17, 3),
  (18, 3),
  (19, 3),
  (20, 3),
  (21, 3);

INSERT INTO answers (question_id, correct, content)
VALUES
  (1, true, 'Sunlight, Carbon Dioxide, Water, Warmth, Nutrients'),
  (1, false, 'Glucose, Rain, Sunlight, Nutrients, Carbon Dioxide'),
  (1, false, 'Water, Acid, Sugar, Tannin, Pulp'),
  (1, false, 'Carbon Dioxide, Glucose, Water, Sunlight, Warmth'),
  (2, true, 'Lighter body and higher acid'),
  (2, false, 'Lower Alcohol and lower acid'),
  (2, false, 'Fuller body and higher acid'),
  (2, false, 'Higher Alcohol and higher acid'),
  (3, true, 'Grapes swell with water'),
  (3, false, 'Higher alcohol wines'),
  (3, false, 'More glucose is produced'),
  (3, false, 'Grapes absorb more nutrients'),
  (4, true, 'It moderates the temperature'),
  (4, false, 'It leads to a larger diurnal shift'),
  (4, false, 'It reduces sunlight on the grapes'),
  (4, false, 'It increases the metabolic process in the grapes'),
  (5, true, 'The small particle size holds more water'),
  (5, false, 'It prevents evaporation'),
  (5, false, 'It can bond with water molocules to hold more'),
  (5, false, 'It is found near rivers'),
  (6, true, 'Water and Carbon Dioxide'),
  (6, false, 'Nutrients and Acid'),
  (6, false, 'Rain and Oxygen'),
  (6, false, 'Tannin and Pulp'),
  (7, true, 'A steep equator facing slope'),
  (7, false, 'Solar panels'),
  (7, false, 'Higher elevation'),
  (7, false, 'Being planted on the top of a hill'),
  (8, true, 'The difference in day and night temperature'),
  (8, false, 'When the vine starts producing sugar'),
  (8, false, 'The proximity to the equator'),
  (8, false, 'When it starts getting warm'),
  (9, true, 'Low temperature difference'),
  (9, false, 'Rain tends to be evenly spread'),
  (9, false, 'Rapid temperature drop in autumn'),
  (9, false, 'Usually cool or moderate during growing season'),
  (10, true, 'Overarching region'),
  (10, false, 'Vineyard level'),
  (10, false, 'Canopy of the vine'),
  (10, false, 'Winery level'),
  (11, true, 'Vineyard level'),
  (11, false, 'Overarching region'),
  (11, false, 'Winery level'),
  (11, false, 'Canopy of the vine'),
  (12, true, 'Canopy of the vine'),
  (12, false, 'Winery level'),
  (12, false, 'Overarching region'),
  (12, false, 'Vineyard level'),
  (13, true, 'The weather conditions that can be expected in a year'),
  (13, false, 'Measure of the temperature in a given year'),
  (13, false, 'The difference in weather between years'),
  (13, false, 'How warm a region is'),
  (14, true, 'A warm year could help grapes ripen in a cool climate'),
  (14, false, 'By bringing rain at harvest'),
  (14, false, 'A warm year could lead to more acid in grapes'),
  (14, false, 'A cool year could increase the body of wine'),
  (15, true, 'Short summers'),
  (15, false, 'Low temperature difference'),
  (15, false, 'Growing season often continues far into autumn'),
  (15, false, 'High rainfall'),
  (16, true, 'Rainfall tends to be evenly spread'),
  (16, false, 'Large difference in temperatures'),
  (16, false, 'Often deals with drought'),
  (16, false, 'Large temperature drop in autumn'),
  (17, true, 'Vitis Vinifera'),
  (17, false, 'Vitis Riparia'),
  (17, false, 'Vitis Rupestris'),
  (17, false, 'Vitis Berlandieri'),
  (18, true, 'Pest tolerance'),
  (18, false, 'To avoid Botrytis'),
  (18, false, 'To help match the grape clone'),
  (18, false, 'To avoid unpleasant flavors in wine'),
  (19, true, 'Phylloxera'),
  (19, false, 'Glassy-winged sharpshooter'),
  (19, false, 'Botrytis'),
  (19, false, 'Aphids'),
  (20, true, 'Moderate or cool'),
  (20, false, 'Humid or hot'),
  (20, false, 'Dry or tropical'),
  (20, false, 'Arrid or hot'),
  (21, true, 'It has thick skin'),
  (21, false, 'It has thin skin'),
  (21, false, 'It has large seeds'),
  (21, false, 'It has a large berry size');

COMMIT;