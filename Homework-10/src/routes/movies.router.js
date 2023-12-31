const express = require("express");
const moviesRouter = express.Router();
const { movieController } = require("../controllers/index");
const multer = require("multer");
const path = require("path");

// konfigurasi multer
const diskStorage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, path.join(__dirname, "../public/upload"));
  },
  filename: function (request, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: diskStorage });

moviesRouter.get("/api/movies", movieController.getAllMovies);
moviesRouter.get("/api/movies/:id", movieController.getMoviesById);
moviesRouter.post(
  "/api/movies/",
  upload.single("photo"),
  movieController.createNewMovies
);
moviesRouter.put(
  "/api/movies/:id",
  upload.single("photo"),
  movieController.updateMoviesById
);
moviesRouter.delete("/api/movies/:id", movieController.deleteMoviesById);

module.exports = moviesRouter;
