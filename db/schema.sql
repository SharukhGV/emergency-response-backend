DROP DATABASE IF EXISTS hive_heaven_database;
CREATE DATABASE hive_heaven_database; 

\c hive_heaven_database; 


CREATE TABLE users (
  id serial PRIMARY KEY,
  createdAt BIGINT,
  username TEXT UNIQUE,
  hashed_password bytea,
  salt INTEGER
);


CREATE TABLE profile (
  id serial PRIMARY KEY,
  image_url TEXT,
  about TEXT,
  occupation TEXT,
  date DATE NOT NULL,
  my_username TEXT,
  CONSTRAINT current_username_loggedin FOREIGN KEY (my_username) REFERENCES users(username)
);

CREATE TABLE userpost (
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

CREATE TABLE comments (
  id serial PRIMARY KEY,
  description TEXT,
  date DATE NOT NULL,
  my_username TEXT,
  userpost_id INTEGER,
  CONSTRAINT current_username_loggedin FOREIGN KEY (my_username) REFERENCES users(username),
  CONSTRAINT findspot_id_post FOREIGN KEY (userpost_id) REFERENCES userpost(id) ON DELETE CASCADE
);

CREATE TABLE dreams (
  id serial PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  isDayDream BOOLEAN NOT NULL DEFAULT false,
  createdAt BIGINT,
  username TEXT,
  CONSTRAINT fk_user FOREIGN KEY (username) REFERENCES users(username)
);