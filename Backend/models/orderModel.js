const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
     dishes: [
          {
               dish: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Cart',
                    required: true,
               },
               quantity: {
                    type: Number,
                    required: true,
               },
          },
     ],
     total: {
          type: Number,
          required: true,
     },
     deliveryTime: {
          type: String,
          required: true,
     },
     customerName: {
          type: String,
          required: true,
     },
     customerAddress: {
          type: String,
          required: true,
     },
     customerPhone: {
          type: String,
          required: true,
     }
   
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
