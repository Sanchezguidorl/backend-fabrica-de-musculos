const mongoose = require('mongoose');
const { config } = require('./config.js');

const connectDB = async () => {
    try {
        const db = await mongoose.connect(`mongodb+srv://${config.user_db}:${config.password_db}@fabrica-de-musculos.hgodup2.mongodb.net/?retryWrites=true&w=majority`);
        console.log("Database is connected to: ", db.connection.name);
    } catch (error) {
        console.error(error);
    }
};

module.exports = { connectDB };