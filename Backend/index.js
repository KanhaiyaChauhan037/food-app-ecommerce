const express = require('express');
const bodyParser = require('body-parser');
const connectDatabase = require('./utils/database');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require("./routes/cartRoutes");
const cors = require("cors");
const app = express();
const PORT = 5500;
connectDatabase();

// Middleware
app.use(bodyParser.json());

// Routes
app.use(cors());
app.use('/menu', menuRoutes);
app.use('/order', orderRoutes);
app.use('/cart', cartRoutes);

// Start the server
app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
});
