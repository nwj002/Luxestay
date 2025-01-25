import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ViewRoom = () => {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [duration, setDuration] = useState(1);
    const [guests, setGuests] = useState(1);
    const [checkInDate, setCheckInDate] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [paymentType, setPaymentType] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/room/get_single_room/${id}`);
                setRoom(response.data.data);
            } catch (error) {
                console.error("Error fetching room details:", error);
            }
        };

        fetchRoomDetails();
    }, [id]);

    const handleDurationChange = (e) => setDuration(Math.max(1, e.target.value));
    const handleGuestsChange = (e) => setGuests(Math.max(1, e.target.value));
    const handleCheckInChange = (e) => setCheckInDate(e.target.value);

    const handleBooking = () => {
        if (!checkInDate) {
            toast.error("Please select a valid check-in date.");
            return;
        }
        setShowModal(true);
    };

    const confirmBooking = async () => {
        if (!paymentType) {
            toast.error("Please select a payment type.");
            return;
        }

        try {
            const token = localStorage.getItem("token");
            const bookingData = {
                roomId: id,
                checkInDate,
                duration,
                guests,
                paymentType,
            };

            const response = await axios.post("http://localhost:5000/api/booking/create", bookingData, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.status === 201) {
                toast.success("Room booked successfully!");
                setShowModal(false);
                navigate("/bookings");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to book the room. Please try again.");
        }
    };

    const today = new Date().toISOString().split("T")[0];

    if (!room) return <div>Loading...</div>;

    return (
        
        <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#FFF2E5", padding: "20px" }}>
            {/* Main Section */}
            <div style={{ display: "flex", gap: "20px" }}>
                {/* Left Section */}
                <div style={{ flex: 2 }}>
                    {/* Image Container */}
                    <div style={{ marginBottom: "20px", border: "1px solid #ddd", borderRadius: "8px", padding: "10px" }}>
                        <img
                            src={`http://localhost:5000/rooms/${room.image}`}
                            alt={room.roomName}
                            style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "8px" }}
                        />
                    </div>

                    {/* Room Details Container */}
                    <div style={{ marginBottom: "20px", backgroundColor: "#FFF9F5", padding: "20px", borderRadius: "8px" }}>
                        <h2 style={{ marginBottom: "10px", fontWeight: "bold" }}>{room.hotelName}</h2>
                        <p style={{ marginBottom: "10px" }}>{room.location}</p>
                        <p>{room.description}</p>
                        <ul>
                            <li><strong>Room Name:</strong> {room.roomName}</li>
                            <li><strong>No. of Beds:</strong> {room.noOfBeds}</li>
                            <li><strong>Price:</strong> NPR {room.price}</li>
                        </ul>
                    </div>

                    {/* Review and Rating Container */}
                    <div style={{ backgroundColor: "#FFF9F5", padding: "20px", borderRadius: "8px" }}>
                        <h3 style={{ marginBottom: "10px" }}>Review and Rating</h3>
                        <p><strong>John Doe:</strong> "The room was spacious and well-maintained."</p>
                        <p>Rating: 4.3/5</p>
                        <button style={{ backgroundColor: "#CC9A48", color: "#FFF", border: "none", padding: "10px", borderRadius: "8px" }}>
                            Write a Review
                        </button>
                    </div>
                </div>

                {/* Right Section */}
                <div style={{ flex: 1 }}>
                    {/* Map Container */}
                    <div
                        style={{
                            backgroundColor: "#FFF9F5",
                            padding: "20px",
                            borderRadius: "8px",
                            textAlign: "center",
                            marginBottom: "20px",
                        }}
                    >
                        <a
                            href="https://www.google.com/maps"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "block",
                                padding: "10px",
                                border: "1px solid #ccc",
                                borderRadius: "8px",
                                textDecoration: "none",
                                color: "#000",
                                fontWeight: "bold",
                            }}
                        >
                            Click here to view in map
                        </a>
                    </div>

                    {/* Booking Section */}
                    <div style={{ backgroundColor: "#FFF9F5", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
                        <h3>Total Price: NPR {room.price * duration}</h3>
                        <label>Check-in</label>
                        <input
                            type="date"
                            value={checkInDate}
                            onChange={handleCheckInChange}
                            min={today}
                            style={{ width: "100%", padding: "10px", borderRadius: "8px", marginBottom: "10px" }}
                        />
                        <label>Guests</label>
                        <input
                            type="number"
                            value={guests}
                            onChange={handleGuestsChange}
                            min={1}
                            style={{ width: "100%", padding: "10px", borderRadius: "8px", marginBottom: "10px" }}
                        />
                        <label>Duration</label>
                        <input
                            type="number"
                            value={duration}
                            onChange={handleDurationChange}
                            min={1}
                            style={{ width: "100%", padding: "10px", borderRadius: "8px", marginBottom: "10px" }}
                        />
                        <button
                            onClick={handleBooking}
                            style={{
                                backgroundColor: "#CC9A48",
                                color: "#FFF",
                                padding: "10px",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                                width: "100%",
                            }}
                        >
                            Continue to Book
                        </button>
                    </div>

                    {/* Hotel Policies */}
                    <div style={{ backgroundColor: "#FFF9F5", padding: "20px", borderRadius: "8px" }}>
                        <h3>Hotel Policies</h3>
                        <p><strong>Check-in:</strong> 12:15 PM</p>
                        <p><strong>Check-out:</strong> 11:15 AM</p>
                    </div>
                </div>
            </div>

            {/* Booking Modal */}
            {showModal && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div style={{ backgroundColor: "#FFF", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
                        <h2>Select Payment Type</h2>
                        <div style={{ margin: "20px 0" }}>
                            <button onClick={() => setPaymentType("Khalti")} style={{ margin: "5px" }}>Khalti</button>
                            <button onClick={() => setPaymentType("Esewa")} style={{ margin: "5px" }}>Esewa</button>
                            <button onClick={() => setPaymentType("Cash")} style={{ margin: "5px" }}>Cash</button>
                        </div>
                        <p><strong>Check-in:</strong> {checkInDate}</p>
                        <p><strong>Duration:</strong> {duration} days</p>
                        <p><strong>Guests:</strong> {guests}</p>
                        <h3>Total Price: NPR {room.price * duration}</h3>
                        <button onClick={confirmBooking}>Confirm Booking</button>
                        <button onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                </div>
            )}


        </div>
    );
};

export default ViewRoom;
