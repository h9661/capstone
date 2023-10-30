const express = require("express");
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { login, join, logout } = require("../controller/authController");

router.post("/login", isNotLoggedIn, login);

router.post("/join", isNotLoggedIn, join);

router.get("/logout", isLoggedIn, logout);

module.exports = router;
