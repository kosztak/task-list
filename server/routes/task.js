const express = require('express');

const taskController = require('../controllers/task');

const router = express.Router();

//GET
router.get("/daily-data", taskController.getDailyData);

//POST

//PATCH
router.patch('/daily', taskController.patchDaily);

module.exports = router;