const express = require('express');

const groupController = require('../controllers/group');

const router = express.Router();

//GET
router.get("/group-data", groupController.getGroupData);
router.get("/members", groupController.getMembers);
router.get("/dailies", groupController.getDailies);
router.get("/todos", groupController.getTodos);
router.get("/task-data", groupController.getTaskData);

//POST
router.post("/create", groupController.postCreate);
router.post("/add-task", groupController.postAddTask);
router.post("/check-todo", groupController.postCheckTodo);
router.post("/check-daily", groupController.postCheckDaily);

//DELETE
router.delete("/task", groupController.deleteTask);

module.exports = router;