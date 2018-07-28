
DROP DATABASE IF EXISTS super_ryan;

CREATE DATABASE super_ryan;
USE super_ryan;

CREATE TABLE users (
  name VARCHAR(100) NOT NULL,
  game_score INT(255),
  current_high_score_ INT(255),
  PRIMARY KEY (name)
);