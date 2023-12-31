const express = require("express");
const UsersRouter = express.Router();
const { userController } = require("../controllers/index");

UsersRouter.get("/api/users", userController.getAllUsers);
UsersRouter.get("/api/users/:id", userController.getUsersById);
UsersRouter.post("/api/users/", userController.registerNewUsers);
UsersRouter.put("/api/users/:id", userController.updateUsersById);
UsersRouter.delete("/api/users/:id", userController.deleteUsersById);

module.exports = UsersRouter;
