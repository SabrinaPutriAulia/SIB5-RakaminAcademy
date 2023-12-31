const { movieRepository } = require("../repositories/index");

function getAllMovies() {
  return movieRepository.findAllMovies();
}

function getMovieById(id) {
  return movieRepository.findMovieById(id);
}

function createNewMovie(movieData) {
  return movieRepository.createMovie(movieData);
}

function updateMovieById(id, movieData) {
  return movieRepository.updateMovieById(id, movieData);
}

function deleteMovieById(id) {
  return movieRepository.deleteMovieById(id);
}

module.exports = {
  getAllMovies,
  getMovieById,
  createNewMovie,
  updateMovieById,
  deleteMovieById,
};
