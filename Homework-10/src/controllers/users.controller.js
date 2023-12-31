const { response, request } = require("express");
const { userService } = require("../services/index");
const getAllUsers = async (request, response) => {
  const users = await userService.getAllUsers();
  response.json({ data: users.rows });
};

const getUsersById = async (request, response) => {
  const id = request.params.id;
  const user = await userService.getUserById(id);

  if (!user) return response.status(404).json({ message: "User not found!" });

  response.json({ data: user.rows });
};

const registerNewUsers = async (request, response) => {
  const userData = request.body;
  const user = await userService.registerNewUser(userData);

  response.status(201).json({ message: "User registered successfuly" });
};

const updateUsersById = async (request, response) => {
  const id = request.params.id;
  const userData = request.body;

  const user = await userService.updateUserById(id, userData);

  if (!user) return response.status(404).json({ message: "User not found!" });

  response.status(201).json({ message: "User updated successfuly" });
};

const deleteUsersById = async (request, response) => {
  const id = request.params.id;
  const user = await userService.deleteUserById(id);

  if (!user) return response.status(404).json({ message: "User not found!" });

  response.status(201).json({ message: "User deleted successfuly" });
};

module.exports = {
  getAllUsers,
  getUsersById,
  registerNewUsers,
  updateUsersById,
  deleteUsersById,
};
