const pool = require("../../config/connection");
const path = require("path");

function findAllMovies() {
  return pool.query(`SELECT * FROM movies`);
}

function findMovieById(id) {
  return pool.query(`SELECT * FROM movies WHERE id=$1`, [id]);
}

function createMovie(movieData) {
  const { title, genres, year, photo } = movieData;

  const fileName = path.basename(photo);

  return pool.query(
    `INSERT INTO movies (title, genres, year, photo) VALUES ($1, $2, $3, $4)`,
    [title, genres, year, fileName]
  );
}

function updateMovieById(id, movieData) {
  const { title, genres, year, photo } = movieData;

  const fileName = path.basename(photo);

  return pool.query(
    `UPDATE movies SET title=$1, genres=$2, year=$3, photo=$4 WHERE id=$5`,
    [title, genres, year, fileName, id]
  );
}

function deleteMovieById(id) {
  return pool.query(`DELETE FROM movies WHERE id=$1`, [id]);
}

module.exports = {
  findAllMovies,
  findMovieById,
  createMovie,
  updateMovieById,
  deleteMovieById,
};
