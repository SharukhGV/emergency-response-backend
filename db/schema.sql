DROP DATABASE IF EXISTS find_spot_database;
CREATE DATABASE find_spot_database; 

\c find_spot_database; 

DROP TABLE findspot;
CREATE TABLE findspot (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  latitude TEXT,
  longitude TEXT,
  description TEXT,
  emergency TEXT,
  date DATE NOT NULL,
  archived BOOLEAN
,
);