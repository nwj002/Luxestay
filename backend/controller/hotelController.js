// / Hotel Controller
const { Hotel, Room } = require('../models/models');

// Create a New Hotel
exports.createHotel = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Only admins can perform this action.' });
    }

    const { name, location, description, priceRange } = req.body;

    try {
        const newHotel = new Hotel({
            name,
            location,
            description,
            priceRange,
        });

        await newHotel.save();

        res.status(201).json({ message: 'Hotel created successfully', hotel: newHotel });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Get All Hotels
exports.getAllHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find().populate('rooms');
        res.status(200).json(hotels);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Get Hotel By ID
exports.getHotelById = async (req, res) => {
    const { id } = req.params;

    try {
        const hotel = await Hotel.findById(id).populate('rooms');
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        res.status(200).json(hotel);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Update Hotel
exports.updateHotel = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Only admins can perform this action.' });
    }

    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedHotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        res.status(200).json({ message: 'Hotel updated successfully', hotel: updatedHotel });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Delete Hotel
exports.deleteHotel = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Only admins can perform this action.' });
    }

    const { id } = req.params;

    try {
        const deletedHotel = await Hotel.findByIdAndDelete(id);
        if (!deletedHotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        res.status(200).json({ message: 'Hotel deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Add Room to Hotel
exports.addRoomToHotel = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Only admins can perform this action.' });
    }

    const { hotelId } = req.params;
    const { type, price, maxGuests } = req.body;

    try {
        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        const newRoom = new Room({
            hotelId,
            type,
            price,
            maxGuests,
        });

        await newRoom.save();

        hotel.rooms.push(newRoom._id);
        await hotel.save();

        res.status(201).json({ message: 'Room added successfully', room: newRoom });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Update Room Details
exports.updateRoom = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Only admins can perform this action.' });
    }

    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedRoom = await Room.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.status(200).json({ message: 'Room updated successfully', room: updatedRoom });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Delete Room
exports.deleteRoom = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Only admins can perform this action.' });
    }

    const { id } = req.params;

    try {
        const deletedRoom = await Room.findByIdAndDelete(id);
        if (!deletedRoom) {
            return res.status(404).json({ message: 'Room not found' });
        }

        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};

// Admin Analytics
exports.getAnalytics = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied. Only admins can perform this action.' });
    }

    try {
        const totalUsers = await User.countDocuments();
        const totalHotels = await Hotel.countDocuments();
        const totalRooms = await Room.countDocuments();
        const totalBookings = await Booking.countDocuments();

        const analytics = {
            totalUsers,
            totalHotels,
            totalRooms,
            totalBookings,
        };

        res.status(200).json(analytics);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};
