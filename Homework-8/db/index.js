const pool = require("../query.js");
const fs = require("fs");

const seedQuery = fs.readFileSync("db/seeding.sql", { encoding: "utf8" });
pool.query(seedQuery, (error, response) => {
  console.log(error, response);
  console.log("Seeding complete");
  pool.end();
});
