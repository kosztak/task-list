const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

//GET
router.get("/dailies", userController.getDailies);
router.get("/todos", userController.getTodos);

//POST
router.post("/add-task", userController.postAddTask);
router.post("/check-todo", userController.postCheckTodo);

module.exports = router;