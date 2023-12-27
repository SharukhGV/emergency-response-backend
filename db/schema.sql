DROP DATABASE IF EXISTS hive_heaven_database;
CREATE DATABASE hive_heaven_database; 

\c hive_heaven_database; 

-- DROP TABLE findspot;
CREATE TABLE findspot (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  latitude DECIMAL,
  longitude DECIMAL,
  description TEXT,
  skybrightness TEXT,
  date DATE NOT NULL,
  username TEXT,
  CONSTRAINT fk_findspot_username FOREIGN KEY (username) REFERENCES users(username)
);
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  createdAt date,
  username TEXT UNIQUE,
  hashed_password BLOB,
);