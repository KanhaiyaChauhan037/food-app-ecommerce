const mongoose = require('mongoose');

const connectDatabase = async () => {
     try {
          await mongoose.connect('mongodb+srv://food:food@cluster0.xizvvvw.mongodb.net/', {
               useNewUrlParser: true,
               useUnifiedTopology: true,
          });
          console.log('Connected to the database');
     } catch (error) {
          console.error('Failed to connect to the database', error);
     }
};

module.exports = connectDatabase;
