const express = require('express');

const taskController = require('../controllers/task');

const router = express.Router();

//GET
router.get("/user-data", taskController.getTaskData);

//POST

//PATCH
router.patch('/user-task', taskController.patchUserTask);
router.patch('/group-task', taskController.patchGroupTask);

module.exports = router;