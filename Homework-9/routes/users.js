/**
 * @swagger
 * components:
 *  schemas:
 *    Users:
 *      type: object
 *      required:
 *        - email
 *        - gender
 *        - password
 *        - role
 *      properties:
 *        id:
 *          type: integer
 *          description: The auto-generated id of the user
 *        email:
 *          type: string
 *          description: The email of the user
 *        gender:
 *          type: string
 *          description: The gender of the user
 *        password:
 *          type: string
 *          description: The password of the user
 *        role:
 *          type: string
 *          description: The role of the user
 *      example:
 *        id: 12
 *        email: "dwoodrooffeb@purevolume.com"
 *        gender: "Female"
 *        password: "IdyhrRQZ718W"
 *        role: Supervisor
 */

const express = require("express");
const router = express.Router();
const { signToken } = require("../middleware/authMiddleware");

const pool = require("../query");

/**
 * @swagger
 * /users:
 *  get:
 *    tags:
 *      - Users
 *    summary: Get all users with pagination
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
 *        description: A list of users
 *        content:
 *         application/json:
 *           type: array
 *           $ref: '#/components/schemas/Users'
 */

// Get all list of movie
router.get("/", (request, response) => {
  const { page, limit } = request.query;
  const offset = (page - 1) * limit;

  pool.query(
    "SELECT * FROM users LIMIT $1 OFFSET $2",
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
 * /users/register:
 *  post:
 *    tags:
 *      - Users
 *    name: Register
 *    summary: Register a new user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: User's email address
 *                example: users@rakamin.com
 *              gender:
 *                type: string
 *                description: User's gender
 *                example: Female
 *              password:
 *                type: string
 *                description: User's password
 *                example: IJt6J9k
 *              role:
 *                type: string
 *                description: User's role
 *                example: Engineer
 *    responses:
 *      200:
 *        description: Successfully registered a new user
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Registration success message
 *                  example: User registered successfully
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message
 *                  example: Bad request
 */

router.post("/register", (request, response) => {
  pool.query(
    "INSERT INTO users (email, gender, password, role) VALUES ($1, $2, $3, $4)",
    [
      request.body.email,
      request.body.gender,
      request.body.password,
      request.body.role,
    ],
    (error, result) => {
      if (error) response.status(401).json({ message: "Error!" });
      response.status(201).json({ message: "Users created successfuly!" });
    }
  );
});

/**
 * @swagger
 * /users/login:
 *  post:
 *    tags:
 *      - Users
 *    name: Login
 *    summary: Authenticate user and receive a JWT token
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                description: User's email address
 *                example: amooresc@wikispaces.com
 *              password:
 *                type: string
 *                description: User's password
 *                example: RDrCEPDuJ
 *    responses:
 *      200:
 *        description: Successfully authenticated and received a JWT token
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                token:
 *                  type: string
 *                  description: JWT token for user authentication
 *                  example: your-jwt-token
 *      401:
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: Error message
 *                  example: Unauthorized
 */

router.post("/login", (request, response) => {
  pool.query(
    "SELECT * FROM users WHERE email=$1 AND password=$2",
    [request.body.email, request.body.password],
    (error, result) => {
      if (error) {
        throw error;
      } else {
        const token = signToken(result.rows[0]);
        response.json({ token: token });
      }
    }
  );
});

module.exports = router;
