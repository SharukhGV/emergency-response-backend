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
  CONSTRAINT current_user_post_username FOREIGN KEY (username) REFERENCES users(username)
);

CREATE TABLE comments (
  id serial PRIMARY KEY,
  description TEXT,
  date DATE NOT NULL,
  my_username TEXT,
  userpost_id INTEGER,
  CONSTRAINT current_username_loggedin FOREIGN KEY (my_username) REFERENCES users(username),
  CONSTRAINT current_user_post_id FOREIGN KEY (userpost_id) REFERENCES userpost(id) ON DELETE CASCADE
);

CREATE TABLE communityinteractions (
  id serial PRIMARY KEY,
  informative INTEGER NOT NULL DEFAULT 0,
  surprising INTEGER NOT NULL DEFAULT 0,
  thanks INTEGER NOT NULL DEFAULT 0,
  user_post_id INTEGER,
  username TEXT,
  UNIQUE (user_post_id, username),
  CONSTRAINT current_user_post_id FOREIGN KEY (user_post_id) REFERENCES userpost(id) ON DELETE CASCADE,
  CONSTRAINT current_username FOREIGN KEY (username) REFERENCES users(username)
);