/**
 * @swagger
 * components:
 *  securitySchemes:
 *    bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *  schemas:
 *    Movies:
 *      type: object
 *      required:
 *        - title
 *        - genres
 *        - year
 *      properties:
 *        id:
 *         type: integer
 *         description: The auto-generated id of the movie
 *        title:
 *         type: string
 *         description: The title of the movie
 *        genres:
 *         type: string
 *         description: The genres of the movie
 *        year:
 *         type: string
 *         description: The year release of the movie
 *      example:
 *        id: 54
 *        title: "Spider-Man 2"
 *        genres: "Action|Adventure|Sci-Fi|IMAX"
 *        year: 2006
 */

const express = require("express");
const pool = require("../query");
const router = express.Router();
const { authentication } = require("../middleware/authMiddleware");

/**
 * @swagger
 * /movies:
 *  get:
 *    tags:
 *      - Movies
 *    summary: Get all movies with pagination
 *    consumes:
 *      - application/json
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: query
 *        name: page
 *        schema:
 *         type: integer
 *        required: true
 *        description: Page number
 *      - in: query
 *        name: limit
 *        schema:
 *         type: integer
 *        required: true
 *        description: Number of items per page
 *    responses:
 *      200:
 *        description: A list of movies
 *        content:
 *         application/json:
 *           type: array
 *           $ref: '#/components/schemas/Movies'
 */

// Get all list of movie
router.get("/", (request, response) => {
  const { page, limit } = request.query;
  const offset = (page - 1) * limit;

  pool.query(
    "SELECT * FROM movies LIMIT $1 OFFSET $2",
    [limit, offset],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.json(result.rows);
    }
  );
});

/**
 * @swagger
 * /movies/{id}:
 *  get:
 *    tags:
 *      - Movies
 *    summary: Get a movie by ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the movies to retrieve
 *        schema:
 *         type: integer
 *    responses:
 *      200:
 *        description: A single of movies
 *        content:
 *         application/json:
 *           type: array
 *           $ref: '#/components/schemas/Movies'
 *      404:
 *        description: Movie not found
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: "Movie not found"
 */

// Get a movie by id
router.get("/:id", (request, response) => {
  pool.query(
    "SELECT * FROM movies WHERE id=$1",
    [request.params.id],
    (error, result) => {
      if (error) response.status(401).json({ message: "Error!" });
      if (result.rowCount === 0) {
        response.status(404).json({ message: "Movie Not Found!" });
      } else {
        response.json(result.rows);
      }
    }
  );
});

/**
 * @swagger
 * /movies:
 *  post:
 *    tags:
 *      - Movies
 *    summary: Create a movie
 *    security:
 *      - bearerAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          title:
 *            type: string
 *            description: The movie title
 *            example : Spider-Man 2
 *          genres:
 *            type: string
 *            description: The movie genre
 *            example : Action|Adventure|Sci-Fi|IMAX
 *          year:
 *            type: string
 *            description: The movie release year
 *            example : 2006
 *    responses:
 *      200:
 *        description: Created Succesfully
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              message:
 *                type: string
 *                description: Create data successfulty
 *                example: Movie created successfuly!
 *      401:
 *        description: Created Failed
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              message:
 *                type: string
 *                description: Create data failed
 *                example: Error!
 */

// Add a movie
router.post("/", authentication, (request, response) => {
  pool.query(
    "INSERT INTO movies (title, genres, year) VALUES ($1, $2, $3)",
    [request.body.title, request.body.genres, request.body.year],
    (error, result) => {
      if (error) {
        console.error("Database error:", error); // Tambahkan logging kesalahan
        response.status(500).json({ message: "Error!" }); // Menggunakan kode status 500 untuk kesalahan server
      } else {
        response.status(201).json({ message: "Movie created successfully!" });
      }
    }
  );
});

/**
 * @swagger
 * /movies/{id}:
 *  put:
 *    tags:
 *      - Movies
 *    summary: Update a movie by ID
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the movies to update
 *        schema:
 *         type: integer
 *    requestBody:
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *         type: object
 *         properties:
 *          title:
 *            type: string
 *            description: The updated movie title
 *            example : Spider-Man 2
 *          genres:
 *            type: string
 *            description: The updated movie genre
 *            example : Action|Adventure|Sci-Fi|IMAX
 *          year:
 *            type: string
 *            description: The updated movie release year
 *            example : 2006
 *    responses:
 *      200:
 *        description: Updated Succesfully
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              message:
 *                type: string
 *                description: Update data successfulty
 *                example: Movie updated successfuly!
 *      401:
 *        description: Updated Failed
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              message:
 *                type: string
 *                description: Update data failed
 *                example: Error!
 */

// Edit a movie
router.put("/:id", authentication, (request, response) => {
  pool.query(
    "UPDATE movies SET title=$1, genres=$2, year=$3 WHERE id=$4",
    [
      request.body.title,
      request.body.genres,
      request.body.year,
      request.params.id,
    ],
    (error, result) => {
      if (error) response.status(401).json({ message: "Error!" });
      response.status(201).json({ message: "Movie updated successfuly!" });
    }
  );
});

/**
 * @swagger
 * /movies/{id}:
 *  delete:
 *    tags:
 *      - Movies
 *    summary: Delete a movies by ID
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the movies to delete
 *        schema:
 *         type: integer
 *    responses:
 *      200:
 *        description: Deleted Succesfully
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              message:
 *                type: string
 *                description: Delete data successfulty
 *                example: Movie deleted successfuly!
 *      401:
 *        description: Deleted Failed
 *        content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              message:
 *                type: string
 *                description: Delete data failed
 *                example: Error!
 */

// Delete a movie
router.delete("/:id", authentication, (request, response) => {
  pool.query(
    "DELETE FROM movies WHERE id=$1",
    [request.params.id],
    (error, result) => {
      if (error) response.status(401).json({ message: "Error!" });
      response.status(201).json({ message: "Movie deleted successfuly!" });
    }
  );
});

module.exports = router;
