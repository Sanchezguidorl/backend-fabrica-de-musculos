const express = require('express');
const { createButton, deleteButton, getButtons } = require('./controllers/buttons.controller.js');
const router = express.Router();

router.get('/buttons', getButtons);

router.post('/buttons/add', createButton);

router.delete('/buttons/delete/:id', deleteButton);

module.exports = router;