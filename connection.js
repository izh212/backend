
const mongoose = require('mongoose');

const connectToMongoDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Employees');
        mongoose.connection.once('open', () => console.log('Connected to MongoDB'));
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
};

module.exports = connectToMongoDB;
