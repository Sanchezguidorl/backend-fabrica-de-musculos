const express = require("express");
const {
  createButton,
  deleteButton,
  getButtons,
} = require("./controllers/buttons.controller.js");
const { validateToken } = require("./authentication/authMethods.js");
const router = express.Router();

router.get("/buttons", validateToken, getButtons);

router.post("/buttons/add", validateToken, createButton);

router.delete("/buttons/delete/:id", validateToken, deleteButton);

module.exports = router;
