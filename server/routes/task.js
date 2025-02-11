const express = require('express');

const taskController = require('../controllers/task');

const router = express.Router();

//GET
router.get("/user-data", taskController.getTaskData);

//POST

//PATCH
router.patch('/', taskController.patchTask);

module.exports = router;