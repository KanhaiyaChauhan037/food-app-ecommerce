const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get("/", cartController.getCart)
// POST /order
router.post('/', cartController.postCart);

// GET /order/:orderId
router.delete('/:id', cartController.deletcart);
router.delete('/', cartController.deleteAllCartItems);

module.exports = router;
