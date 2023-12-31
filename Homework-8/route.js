const express = require("express");
const router = express.Router();
const pool = require("./query.js");

router.get("/home", (request, response) => {
  response.render("home");
});

// 1. Menampilkan data seluruh list film
router.get("/films", (request, response) => {
  pool.query("SELECT * FROM film ORDER BY film_id ASC", (error, result) => {
    if (error) {
      throw error;
    }
    response.render("films", { films: result.rows });
  });
});

// 2. Menampilkan data film tertentu berdasarkan id
router.get("/films/:id", (request, response) => {
  const { id } = request.params;
  pool.query("SELECT * FROM film WHERE film_id = $1", [id], (error, result) => {
    if (error) {
      throw error;
    }
    if (result.rows.length === 0) {
      // Handle jika film tidak ditemukan
      response.status(404).send("Film tidak ditemukan");
    } else {
      response.render("filmDetail", { film: result.rows[0] });
    }
  });
});

// 3. Menampilkan data list category
router.get("/categories", (request, response) => {
  pool.query("SELECT * FROM category", (error, result) => {
    if (error) {
      throw error;
    }
    response.render("categories", { categories: result.rows });
  });
});

// 4. Menampilkan data list film berdasarkan category
router.get("/films/categories/:category_id", (request, response) => {
  const { category_id } = request.params;
  pool.query(
    "SELECT * FROM film WHERE film_id IN (SELECT film_id FROM film_category WHERE category_id = $1)",
    [category_id],
    (error, result) => {
      if (error) {
        throw error;
      }
      response.render("filmsByCategory", { films: result.rows });
    }
  );
});

module.exports = router;
