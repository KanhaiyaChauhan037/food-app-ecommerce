const Order = require('../models/orderModel');
const Menu = require("../models/cartModel");


const placeOrder = async (req, res) => {
     try {
          const { dishes, total, deliveryTime, customerName, customerAddress, customerPhone } = req.body;

          const orderItems = await Promise.all(
               dishes.map(async (dish) => {
                    const { dishId, quantity } = dish;
                    const menuDish = await Menu.findById(dishId);
                    if (!menuDish) {
                         throw new Error(`Dish with ID ${dishId} not found`);
                    }
                    return {
                         dish: menuDish,
                         quantity,
                    };
               })
          );

          const order = await Order.create({ dishes: orderItems, total, deliveryTime, customerName, customerAddress, customerPhone });

          const orderSummary = {
               orderId: order._id,
               dishes: orderItems.map((item) => ({
                    dishId: item.dish._id,
                    dishName: item.dish.name,
                    dishDescription: item.dish.description,
                    quantity: item.quantity,
                    price: item.dish.price,
                    image: item.dish.image,

               })),
               total: order.total,
               deliveryTime: order.deliveryTime,
               customerName: order.customerName,
               customerAddress: order.customerAddress,
               customerPhone: order.customerPhone,


          };
          console.log(orderSummary)

          res.status(201).json(orderSummary);
     } catch (error) {
          res.status(500).json({ message: 'Error placing order', error: error.message });
     }
};

const getOrder = async (req, res) => {
     try {
          const { orderId } = req.params;
          const order = await Order.findById(orderId);
          if (!order) {
               return res.status(404).json({ message: 'Order not found' });
          }
          res.json(order);
     } catch (error) {
          res.status(500).json({ message: 'Error retrieving order', error });
     }
};

module.exports = {
     placeOrder,
     getOrder,
};




