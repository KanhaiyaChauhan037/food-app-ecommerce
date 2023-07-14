const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');

// GET /menu
router.get('/', menuController.getMenu);
router.get('/:id', menuController.getMenuId);

module.exports = router;
