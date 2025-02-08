const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

//GET
router.get("/dailies", userController.getDailies);
router.get("/todos", userController.getTodos);

//POST
router.post("/add-task", userController.postAddTask);
router.post("/delete-todo", userController.postDeleteTodo);
router.post("/delete-daily", userController.postDeleteDaily);
router.post("/check-daily", userController.postCheckDaily);

module.exports = router;