const express = require('express');

const groupController = require('../controllers/group');

const router = express.Router();

//GET
router.get("/group-data", groupController.getGroupData);

//POST
router.post("/create", groupController.postCreate);

module.exports = router;