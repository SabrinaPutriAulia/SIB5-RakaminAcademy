const pool = require("../../config/connection");

function findAllUsers() {
  return pool.query(`SELECT * FROM users`);
}

function findUserById(id) {
  return pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
}

function registerUser(userData) {
  const { email, gender, password, role } = userData;
  return pool.query(
    `INSERT INTO users (email, gender, password, role) VALUES ($1, $2, $3, $4)`,
    [email, gender, password, role]
  );
}

function updateUserById(id, userData) {
  const { email, gender, password, role } = userData;
  return pool.query(
    `UPDATE users SET email=$1, gender=$2, password=$3, role=$4 WHERE id=$5`,
    [email, gender, password, role, id]
  );
}

function deleteUserById(id) {
  return pool.query(`DELETE FROM users WHERE id=$1`, [id]);
}

module.exports = {
  findAllUsers,
  findUserById,
  registerUser,
  updateUserById,
  deleteUserById,
};
