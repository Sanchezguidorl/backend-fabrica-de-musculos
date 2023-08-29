const express = require("express");
const { authUser } = require("./controllers/user.controller");

const router = express.Router();

router.post("/user/auth", authUser);

module.exports = router;

