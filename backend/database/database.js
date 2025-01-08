const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect(process.env.MONGODB_CLOUD, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then(() => {
            console.log('Database connected successfully');
        })
        .catch((error) => {
            console.error('Database connection failed:', error.message);
            process.exit(1); // Exit the application on connection failure
        });
};

// Exporting the function
module.exports = connectDatabase;
