const { Review, Hotels } = require('../models/models');

// Add a Review
exports.addReview = async (req, res) => {
    const { hotelId, rating, comment } = req.body;
    const existingReview = await Review.findOne({ userId: req.user.id, hotelId });

    if (existingReview) {
        return res.status(400).json({ success: false, message: "You have already reviewed this hotel!" });
    }

    const review = new Review({ userId: req.user.id, hotelId, rating, comment });
    await review.save();

    res.status(201).json({ success: true, data: review });
};


// Get Reviews for a Hotel
exports.getReviewsForHotel = async (req, res) => {
    const { hotelId } = req.params;

    try {
        const reviews = await Review.find({ hotelId }).populate('userId', 'name email');
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reviews', error });
    }
};

// Delete a Review (Admin)
exports.deleteReview = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Only admins can perform this action.' });
    }

    const { id } = req.params;

    try {
        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete review', error });
    }
};
