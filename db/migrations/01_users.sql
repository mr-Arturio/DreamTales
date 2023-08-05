DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS stories CASCADE;


CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE stories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  story TEXT,
  genre VARCHAR(255),
  photo VARCHAR(255),
  created_at TIMESTAMP, 
  favorites BOOLEAN NOT NULL DEFAULT FALSE
);