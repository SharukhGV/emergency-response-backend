DROP DATABASE IF EXISTS hive_heaven_database;
CREATE DATABASE hive_heaven_database; 

\c hive_heaven_database; 

-- DROP TABLE findspot;
CREATE TABLE findspot (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  latitude DECIMAL(10, 6), -- Adjust precision and scale as needed
  longitude DECIMAL(10, 6), -- Adjust precision and scale as needed
  description TEXT,
  skybrightness TEXT,
  date DATE NOT NULL,
  image_url TEXT,
  username TEXT,
  CONSTRAINT fk_findspot_username FOREIGN KEY (username) REFERENCES users(username)
);
-- DROP TABLE findspot;

-- DROP TABLE users;
CREATE TABLE users (
  id serial PRIMARY KEY,
  createdAt BIGINT,
  username TEXT UNIQUE,
  hashed_password bytea,
  salt INTEGER
);