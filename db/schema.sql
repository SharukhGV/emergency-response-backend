DROP DATABASE IF EXISTS hive_heaven_database;
CREATE DATABASE hive_heaven_database; 

\c hive_heaven_database; 

-- DROP TABLE findspot;
CREATE TABLE findspot (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  latitude DECIMAL(10, 6),
  longitude DECIMAL(10, 6), 
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


CREATE TABLE comments (
  id serial PRIMARY KEY,
  description TEXT,
  date DATE NOT NULL,
  my_username TEXT,
  findspot_id INTEGER,
  CONSTRAINT current_username_loggedin FOREIGN KEY (my_username) REFERENCES users(username),
  CONSTRAINT findspot_id_post FOREIGN KEY (findspot_id) REFERENCES findspot(id)
);


CREATE TABLE profile (
  id serial PRIMARY KEY,
  image_url TEXT,
  about TEXT,
  occupation TEXT,
  my_username TEXT,
  CONSTRAINT current_username_loggedin FOREIGN KEY (my_username) REFERENCES users(username)
);