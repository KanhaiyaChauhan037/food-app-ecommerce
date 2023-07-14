const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// POST /order
router.post('/', orderController.placeOrder);

// GET /order/:orderId
router.get('/:orderId', orderController.getOrder);


module.exports = router;
