const express = require('express');
const router = express.Router();
const { authGuard, adminGuard } = require('../middleware/authGuard');
const {
    createBooking,
    getUserBookings,
    getBookingById,
    getAllBookings,
    updateBookingStatus,
} = require('../controller/bookingController');

// User Routes
router.post('/bookings', authGuard, createBooking); // Create a booking
router.get('/bookings', authGuard, getUserBookings); // Get all bookings for logged-in user
router.get('/bookings/:id', authGuard, getBookingById); // Get specific booking for logged-in user

// Admin Routes
router.get('/admin/bookings', authGuard, adminGuard, getAllBookings); // Get all bookings (admin)
router.put('/admin/bookings/:id', authGuard, adminGuard, updateBookingStatus); // Update booking status (admin)

module.exports = router;
