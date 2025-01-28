const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

//GET

//POST
router.post("/register", authController.postRegister);
router.post("/login", authController.postLogin);
router.post("/validate-token", authController.postValidateToken);
router.post("/logout", authController.postLogout);

module.exports = router;