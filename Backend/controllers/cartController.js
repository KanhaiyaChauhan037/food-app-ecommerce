const Cart = require('../models/cartModel');

// Controller function to retrieve the menu
const getCart = async (req, res) => {
     try {
          const cart = await Cart.find();
          res.json(cart);
     } catch (error) {
          res.status(500).json({ message: 'Error retrieving menu', error });
     }
};

const postCart = async (req, res) => {
     try {
          const cartItem = await Cart.create({ ...req.body });
          res.send(cartItem);
     } catch (e) {
          res.send(e.message);
     }
};


const deletcart = async (req, res) => {
     try {
          const { id } = req.params
          const cartItem = await Cart.findByIdAndDelete({ _id: id })
          res.send("Item is deleted from your cart")
     }
     catch (e) {
          res.send(e.message)
     }
}
const deleteAllCartItems = async (req, res) => {
     try {
          await Cart.deleteMany();

          res.send("All cart items have been deleted");
     } catch (error) {
          res.status(500).send(error.message);
     }
};
module.exports = {
     getCart,
     postCart,
     deletcart,
     deleteAllCartItems
};
