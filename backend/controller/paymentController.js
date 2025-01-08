const { Booking } = require('../models/models');

// Process Payment
exports.processPayment = async (req, res) => {
    const { bookingId, paymentMethod, paymentAmount } = req.body;

    try {
        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Simulating payment success (replace with actual payment gateway integration)
        const paymentDetails = {
            method: paymentMethod,
            amount: paymentAmount,
            status: 'Paid', // Assume payment is successful
        };

        // Update booking status
        booking.status = 'Paid';
        await booking.save();

        res.status(200).json({ message: 'Payment processed successfully', paymentDetails });
    } catch (error) {
        res.status(500).json({ message: 'Payment processing failed', error });
    }
};
