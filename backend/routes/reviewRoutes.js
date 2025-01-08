const express = require('express');
const { addReview, getReviewsForHotel, deleteReview } = require('../controller/reviewController');
const { authGuard, adminGuard } = require('../middleware/authGuard');

const router = express.Router();

// User Routes
router.post('/', authGuard, addReview);
router.get('/hotel/:hotelId', getReviewsForHotel);

// Admin Routes
router.delete('/admin/:id', authGuard, adminGuard, deleteReview);

module.exports = router;
