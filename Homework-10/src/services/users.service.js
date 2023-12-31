const { userRepository } = require("../repositories/index");

function getAllUsers() {
  return userRepository.findAllUsers();
}

function getUserById(id) {
  return userRepository.findUserById(id);
}

function registerNewUser(userData) {
  return userRepository.registerUser(userData);
}

function updateUserById(id, userData) {
  return userRepository.updateUserById(id, userData);
}

function deleteUserById(id) {
  return userRepository.deleteUserById(id);
}

module.exports = {
  getAllUsers,
  getUserById,
  registerNewUser,
  updateUserById,
  deleteUserById,
};
