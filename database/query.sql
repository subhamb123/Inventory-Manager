CREATE TABLE IF NOT EXISTS USER (username TEXT PRIMARY KEY NOT NULL, password TEXT NOT NULL, level TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS ITEM (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, owner TEXT NOT NULL, alert TEXT NOT NULL);

INSERT INTO ITEM VALUES(0, 'Chainsaw', '', 'F');
INSERT INTO ITEM VALUES(1, 'Welding Machine', '', 'F');
INSERT INTO ITEM VALUES(2, 'Hammer', '', 'F');
INSERT INTO ITEM VALUES(3, 'Air Compressor', '', 'F');
INSERT INTO ITEM VALUES(4, 'Drill', '', 'F');