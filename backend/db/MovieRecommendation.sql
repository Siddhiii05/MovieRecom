CREATE TABLE movie_recommendation.tbl_TopRated (
	id SERIAL PRIMARY KEY,
	title VARCHAR(255),
	year INT,
	video BOOLEAN,
	adult BOOLEAN,
	backdrop_path VARCHAR(255),
	genre_ids TEXT
);