BEGIN;

SET CLIENT_ENCODING TO 'utf8';

TRUNCATE users RESTART IDENTITY CASCADE;

INSERT INTO users (first_name, last_name, username, email, password)
VALUES 
  ('Sterling', 'Watts', 'SterlingDWatts', 'SterlingDWatts@gmail.com', '$2a$12$sxCa9GPk3.d2iksb.bbnGet9UGMVqiWnYsOQf7Pxt0TQz7vTnNlzu'),
  ('Dunder', 'Mifflin', 'dunder', 'dunder-mifflin@gmail.com', '$2a$12$376O2QeDKyl8aws73gsrO.LwSSQVdRI7/LJEAsK7Zz5ps0XDS6LxS'),
  ('Charlie', 'Bloggs', 'c.bloggs', 'charlie-blogs@gmail.com', '$2a$12$WFmOFYPDLkRKHTT0byF7/.dPRMNM7/csiQTvfAur60GDLu1gYMYgG'),
  ('Bodeep', 'Deboop', 'b.deboop', 'bodeep-deboop@yahoo.com', '$2a$12$B0I/lgve9D22NurcgFNxtO6uSdIpDczNItB1DE0J8OJ/ol2lPPRdS'),
  ('Sam', 'Smith', 's.smith', 'sammy_smith1234567@hotmail.com', '$2a$12$C10Xr7ggwj3Ujlebuf7Uue4/ny136QXlL6ru9LQn8wWR16RlcUj6a'),
  ('Alex', 'Taylor', 'lexlor', 'lexlorTheRexlor@gmail.com', '$2a$12$HdJelNB6IQbaiR00oZ299O4olkj86VenAm89T1PRs6QvhOPW4N5Fi'),
  ('Ping', 'Won-In', 'wippy', 'wip-it-ping@excite.com', '$2a$12$WRfMdG9jLdmfA.qKNShi3uML.KgDe3.smpA4p2EQQVpGS9QHW7e3K');

COMMIT;