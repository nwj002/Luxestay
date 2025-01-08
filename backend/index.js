const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDatabase = require('./database/database');

dotenv.config();

// const connectDB = async () => {
//     try {
//         const mongoURI = process.env.MONGODB_CLOUD; // Use local database
//         await mongoose.connect(mongoURI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });
//         console.log('MongoDB connected successfully');
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error.message);
//         process.exit(1);
//     }
// };

connectDatabase();

const app = express();
app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));


// routes
app.use('/api/users', require('./routes/userRoutes')); // User-related routes
app.use('/api/hotels', require('./routes/hotelRoutes')); // Hotel-related routes
app.use('/api/rooms', require('./routes/hotelRoutes')); // Room-related routes
app.use('/api/bookings', require('./routes/bookingRoutes')); // Booking-related routes
app.use('/api/reviews', require('./routes/reviewRoutes')); // Review-related routes
app.use('/api/payments', require('./routes/paymentRoutes')); // Payment-related routes


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
