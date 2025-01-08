const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true, minlength: 6 },
    isAdmin: { type: Boolean, default: false },
    phone: { type: String, required: true, match: /^\d{10,15}$/ },
    resetPasswordOTP: { type: Number, min: 100000, max: 999999, default: null },
    resetPasswordExpires: { type: Date, default: null },
}, { timestamps: true });

UserSchema.index({ email: 1 });

// Hotel Schema
const HotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    priceRange: { type: String, required: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    rooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Room' }],
}, { timestamps: true });

// Room Schema
const RoomSchema = new mongoose.Schema({
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    type: { type: String, required: true, enum: ['Single', 'Double', 'Suite'] },
    price: { type: Number, required: true, min: 0 },
    maxGuests: { type: Number, required: true, min: 1 },
    availability: { type: Boolean, default: true },
}, { timestamps: true });

// Booking Schema
const BookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    totalPrice: { type: Number, required: true, min: 0 },
    status: { type: String, default: 'Booked', enum: ['Booked', 'Cancelled', 'CheckedOut'] },
}, { timestamps: true });

// Review Schema
const ReviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hotelId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String },
}, { timestamps: true });

// Payment Schema
const PaymentSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true, min: 0 },
    method: { type: String, required: true },
    status: { type: String, default: 'Paid', enum: ['Paid', 'Failed', 'Pending'] },
}, { timestamps: true });

module.exports = {
    User: mongoose.model('User', UserSchema),
    Hotels: mongoose.model('Hotel', HotelSchema),
    Room: mongoose.model('Room', RoomSchema),
    Booking: mongoose.model('Booking', BookingSchema),
    Review: mongoose.model('Review', ReviewSchema),
    Payment: mongoose.model('Payment', PaymentSchema),
};
