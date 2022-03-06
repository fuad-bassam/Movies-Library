DROP TABLE IF EXISTS fuadMovie;

CREATE TABLE IF NOT EXISTS FuadMovie(
id SERIAL PRIMARY KEY,
title VARCHAR(5000),
release_date INTEGER,
poster_path VARCHAR(5000),
overview VARCHAR(5000),
user_comment VARCHAR(5000) 
);