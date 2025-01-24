import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Bookingdetail.css"; // Add styles based on the design

const Bookingdetail = () => {
    const [bookings, setBookings] = useState([]); // Store booking details
    const [loading, setLoading] = useState(true); // Loading state
    const [selectedBooking, setSelectedBooking] = useState(null); // Selected booking for popup

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/api/booking/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBookings(response.data.bookings); // Assuming bookings are in the response
                setLoading(false);
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch booking details");
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    const handleCloseModal = () => {
        setSelectedBooking(null);
    };

    const handleCancelBooking = async (bookingId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                `http://localhost:5000/api/booking/${bookingId}/status`,
                { status: "cancelled" },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 200) {
                toast.success("Booking cancelled successfully!");
                setBookings((prevBookings) =>
                    prevBookings.map((booking) =>
                        booking._id === bookingId ? { ...booking, status: "cancelled" } : booking
                    )
                );
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to cancel booking");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="booking-detail-container">
            <h1>My Bookings</h1>
            <hr />
            {bookings.length > 0 ? (
                <div className="booking-list">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="booking-item">
                            <div className="hotel-image">
                                <img
                                    src={`http://localhost:5000/rooms/${booking.room.image}`}
                                    alt={booking.room.roomName}
                                />
                            </div>
                            <div className="booking-info">
                                <h2>{booking.room.hotelName}</h2>
                                <p>Status: {booking.status}</p>
                                <button
                                    className="btn-details"
                                    onClick={() => setSelectedBooking(booking)}
                                >
                                    Booking Details
                                </button>
                            </div>
                            {/* Show cancel button only if status is "pending" */}
                            {booking.status === "pending" && (
                                <button
                                    className="btn-cancel"
                                    onClick={() => handleCancelBooking(booking._id)}
                                >
                                    Cancel Booking
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>No bookings found.</p>
            )}

            {/* Popup Modal */}
            {selectedBooking && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="close-modal" onClick={handleCloseModal}>
                            ×
                        </button>
                        <h2>Booking Details</h2>
                        <table>
                            <tbody>
                                <tr>
                                    <td><strong>Booking ID:</strong></td>
                                    <td>{selectedBooking._id}</td>
                                </tr>
                                <tr>
                                    <td><strong>Full Name:</strong></td>
                                    <td>{selectedBooking.user.name}</td>
                                </tr>
                                <tr>
                                    <td><strong>Phone:</strong></td>
                                    <td>{selectedBooking.user.phone}</td>
                                </tr>
                                <tr>
                                    <td><strong>Check-In:</strong></td>
                                    <td>{new Date(selectedBooking.checkInDate).toLocaleDateString()}</td>
                                </tr>
                                <tr>
                                    <td><strong>Duration:</strong></td>
                                    <td>{selectedBooking.duration} Day(s)</td>
                                </tr>
                                <tr>
                                    <td><strong>Guests:</strong></td>
                                    <td>{selectedBooking.guests}</td>
                                </tr>
                                <tr>
                                    <td><strong>Payment Method:</strong></td>
                                    <td>{selectedBooking.paymentType}</td>
                                </tr>
                                <tr>
                                    <td><strong>Total Price:</strong></td>
                                    <td>NPR {selectedBooking.totalPrice}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="modal-actions">
                            <button className="btn-invoice">Print Invoice</button>
                            <button className="btn-done" onClick={handleCloseModal}>Done</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Bookingdetail;
