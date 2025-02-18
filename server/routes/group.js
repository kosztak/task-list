const express = require('express');

const groupController = require('../controllers/group');

const router = express.Router();

//GET
router.get("/group-data", groupController.getGroupData);
router.get("/members", groupController.getMembers);

//POST
router.post("/create", groupController.postCreate);
router.post("/add-task", groupController.postAddTask);
router.post("/check-todo", groupController.postCheckTodo);
router.post("/check-daily", groupController.postCheckDaily);

module.exports = router;