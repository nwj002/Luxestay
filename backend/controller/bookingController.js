const { Booking, Room, Hotel } = require('../models/models');

// Create a Booking
exports.createBooking = async (req, res) => {
    const { roomId, hotelId, checkIn, checkOut, totalPrice } = req.body;

    try {
        const room = await Room.findById(roomId);
        if (!room || !room.availability) {
            return res.status(400).json({ message: 'Room is not available.' });
        }

        const newBooking = new Booking({
            userId: req.user.id,
            roomId,
            hotelId,
            checkIn,
            checkOut,
            totalPrice,
        });

        await newBooking.save();

        // Mark room as unavailable
        room.availability = false;
        await room.save();

        res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Get All Bookings for Logged-In User
exports.getUserBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ userId: req.user.id }).populate('roomId hotelId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Get Specific Booking Details for Logged-In User
exports.getBookingById = async (req, res) => {
    const { id } = req.params;

    try {
        const booking = await Booking.findOne({ _id: id, userId: req.user.id }).populate('roomId hotelId');
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Get All Bookings (Admin Only)
exports.getAllBookings = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Only admins can perform this action.' });
    }

    try {
        const bookings = await Booking.find().populate('userId roomId hotelId');
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Update Booking Status (Admin Only)
exports.updateBookingStatus = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Only admins can perform this action.' });
    }

    const { id } = req.params;
    const { status } = req.body;

    try {
        const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // If the status is 'Cancelled', make the room available again
        if (status === 'Cancelled') {
            const room = await Room.findById(booking.roomId);
            if (room) {
                room.availability = true;
                await room.save();
            }
        }

        res.status(200).json({ message: 'Booking status updated successfully', booking });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};
