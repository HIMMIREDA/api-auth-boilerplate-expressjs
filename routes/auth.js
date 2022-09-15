const express = require("express");
const router = express.Router();
const loginController = require("../controllers/authControllers/loginController.js");
const registerController = require("../controllers/authControllers/registerController.js");
const logoutController = require("../controllers/authControllers/logoutController.js");
const refreshTokenController = require("../controllers/authControllers/refreshTokenController.js");

router.post("/register", registerController.registerUser);

router.post("/login", loginController.loginUser);

router.get("/logout", logoutController.logoutUser);

router.get("/refresh",refreshTokenController.refreshToken)

module.exports = router;
