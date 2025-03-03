const express = require('express');
const multer = require('multer');

const userController = require('../controllers/user');
const user = require('../models/user');

const router = express.Router();

//GET
router.get("/data", userController.getUserData);
router.get("/dailies", userController.getDailies);
router.get("/todos", userController.getTodos);
router.get("/groups", userController.getGroups);
router.get("/has-group", userController.getHasGroup);

//POST
router.post("/add-task", userController.postAddTask);
router.post("/check-todo", userController.postCheckTodo);
router.post("/check-daily", userController.postCheckDaily);
router.post("/join-group", userController.postJoinGroup);

//PATCH
router.patch("/info", multer(multer.memoryStorage()).single("image"), userController.patchInfo);

//DELETE
router.delete("/task", userController.deleteTask);

module.exports = router;