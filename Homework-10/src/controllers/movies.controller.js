const { movieService } = require("../services/index");

const getAllMovies = async (request, response) => {
  const movies = await movieService.getAllMovies();
  response.json({ data: movies.rows });
};

const getMoviesById = async (request, response) => {
  const id = request.params.id;
  const movie = await movieService.getMovieById(id);

  if (!movie) return response.status(404).json({ message: "Not Found" });

  response.json({ data: movie.rows });
};

const createNewMovies = async (request, response) => {
  const movieData = request.body;
  const newPhoto = request.file;

  if (newPhoto) {
    movieData.photo = newPhoto.path;
  }

  const movie = await movieService.createNewMovie(movieData);

  response.status(201).json({ message: "Film created successfuly" });
};

const updateMoviesById = async (request, response) => {
  const id = request.params.id;
  const movieData = request.body;
  const newPhoto = request.file;

  if (newPhoto) {
    movieData.photo = newPhoto.path;
  }

  const movie = await movieService.updateMovieById(id, movieData);

  if (!movie) return response.status(404).json({ message: "Movie Not Found" });

  response.json({ message: "Movie updated successfuly" });
};

const deleteMoviesById = async (request, response) => {
  const id = request.params.id;
  const movie = await movieService.deleteMovieById(id);

  if (!movie) return response.status(404).json({ message: "Movie Not Found" });

  response.json({ message: "Movie deleted successfuly" });
};

module.exports = {
  getAllMovies,
  getMoviesById,
  createNewMovies,
  updateMoviesById,
  deleteMoviesById,
};
