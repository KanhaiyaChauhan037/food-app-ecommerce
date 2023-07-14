const Menu = require('../models/menuModel');

// Controller function to retrieve the menu
const getMenu = async (req, res) => {
     try {
          const menu = await Menu.find();
          res.json(menu);
     } catch (error) {
          res.status(500).json({ message: 'Error retrieving menu', error });
     }
};
const getMenuId = async (req, res) => {
     try {
          const { id } = req.params;
          const menu = await Menu.findById(id);
          if (!menu) {
               return res.status(404).json({ message: 'Menu not found' });
          }
          res.json(menu);
     } catch (error) {
          res.status(500).json({ message: 'Error retrieving order', error });
     }
};
module.exports = {
     getMenu,
     getMenuId
};
