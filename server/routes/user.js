const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

//GET
router.get("/dailies", userController.getDailies);
router.get("/todos", userController.getTodos);
router.get("/groups", userController.getGroups);

//POST
router.post("/add-task", userController.postAddTask);
router.post("/check-daily", userController.postCheckDaily);
router.post("/join-group", userController.postJoinGroup);

//DELETE
router.delete("/task", userController.deleteTask);
module.exports = router;