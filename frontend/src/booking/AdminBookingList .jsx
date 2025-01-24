import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AdminBookingList.css";

const AdminBookingList = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/api/booking/all", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBookings(response.data.bookings);
                setLoading(false);
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch bookings");
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="admin-booking-list-container">
            <h1>Admin Booking Management</h1>
            {bookings.length > 0 ? (
                <div className="admin-booking-list">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="booking-card">
                            <h2>{booking.room.roomName}</h2>
                            <p><strong>Booking ID:</strong> {booking._id}</p>
                            <p><strong>User:</strong> {booking.user.name} ({booking.user.email})</p>
                            <p><strong>Hotel:</strong> {booking.room.hotelName}</p>
                            <p><strong>Check-In Date:</strong> {new Date(booking.checkInDate).toLocaleDateString()}</p>
                            <p><strong>Status:</strong> {booking.status}</p>
                            <button
                                className="btn-edit"
                                onClick={() => navigate(`/admin/booking/edit/${booking._id}`)}
                            >
                                Edit
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No bookings found.</p>
            )}
        </div>
    );
};

export default AdminBookingList;
