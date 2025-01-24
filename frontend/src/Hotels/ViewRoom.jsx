import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ViewRoom = () => {
    const { id } = useParams(); // Extract the room ID from the URL
    const [room, setRoom] = useState(null);
    const [duration, setDuration] = useState(1);
    const [guests, setGuests] = useState(1);
    const [checkInDate, setCheckInDate] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [paymentType, setPaymentType] = useState(""); // To store the selected payment type
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoomDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/room/get_single_room/${id}`);
                setRoom(response.data.data); // Assuming room details are in the "data" field
            } catch (error) {
                console.error("Error fetching room details:", error);
            }
        };

        fetchRoomDetails();
    }, [id]);

    const handleDurationChange = (e) => {
        const value = Math.max(1, e.target.value); // Ensure duration is at least 1
        setDuration(value);
    };

    const handleGuestsChange = (e) => {
        const value = Math.max(1, e.target.value); // Ensure guests is at least 1
        setGuests(value);
    };

    const handleCheckInChange = (e) => {
        const selectedDate = e.target.value;
        setCheckInDate(selectedDate);
    };

    const handleBooking = () => {
        if (!checkInDate) {
            toast.error("Please select a valid check-in date.");
            return;
        }

        setShowModal(true); // Show the booking modal
    };

    const confirmBooking = async () => {
        if (!paymentType) {
            toast.error("Please select a payment type.");
            return;
        }

        try {
            const token = localStorage.getItem("token"); // Assuming user token is stored in localStorage
            const bookingData = {
                roomId: id,
                checkInDate,
                duration,
                guests,
                paymentType,
            };

            const response = await axios.post("http://localhost:5000/api/booking/create", bookingData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 201) {
                setShowModal(false); // Close the modal
                toast.success("Room booked successfully!");
                navigate("/bookings"); // Redirect to bookings page
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to book the room. Please try again."
            );
        }
    };

    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

    if (!room) return <div>Loading...</div>;

    return (
        <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#FFF2E5", padding: "20px" }}>

            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
                {/* Left Section */}
                <div style={{ flex: 2 }}>
                    <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "20px" }}>
                        <img
                            src={`http://localhost:5000/rooms/${room.image}`}
                            alt={room.roomName}
                            style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "8px" }}
                        />
                        <h2 style={{ marginTop: "20px" }}>{room.roomName}</h2>
                        <p style={{ fontSize: "14px", color: "#555" }}>{room.hotelName}, {room.location}</p>
                    </div>
                </div>

                {/* Right Section */}
                <div style={{ flex: 1 }}>
                    <div
                        style={{
                            border: "1px solid #ccc",
                            borderRadius: "8px",
                            padding: "20px",
                            backgroundColor: "#FFF",
                        }}
                    >
                        <h3 style={{ margin: "10px 0" }}>NPR {room.price} (inclusive of all taxes)</h3>
                        <div style={{ marginBottom: "10px" }}>
                            <label style={{ fontWeight: "bold" }}>Check-in</label>
                            <input
                                type="date"
                                value={checkInDate}
                                onChange={handleCheckInChange}
                                min={today}
                                style={{
                                    display: "block",
                                    width: "100%",
                                    padding: "10px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    marginTop: "5px",
                                }}
                            />
                        </div>
                        <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ fontWeight: "bold" }}>Guests</label>
                                <input
                                    type="number"
                                    value={guests}
                                    onChange={handleGuestsChange}
                                    min={1}
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        padding: "10px",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        marginTop: "5px",
                                    }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ fontWeight: "bold" }}>Duration</label>
                                <input
                                    type="number"
                                    value={duration}
                                    onChange={handleDurationChange}
                                    min={1}
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        padding: "10px",
                                        border: "1px solid #ccc",
                                        borderRadius: "5px",
                                        marginTop: "5px",
                                    }}
                                />
                            </div>
                        </div>
                        <h3>Total Price: NPR {room.price * duration}</h3>
                        <button
                            onClick={handleBooking}
                            style={{
                                backgroundColor: "#13361C",
                                color: "#FFF",
                                border: "none",
                                borderRadius: "5px",
                                padding: "10px 20px",
                                marginTop: "10px",
                                cursor: "pointer",
                                width: "100%",
                            }}
                        >
                            Continue to Book
                        </button>
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
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#FFF",
                            padding: "20px",
                            borderRadius: "8px",
                            width: "400px",
                            textAlign: "center",
                        }}
                    >
                        <h2>Payment Type</h2>
                        <div style={{ display: "flex", justifyContent: "space-around", margin: "20px 0" }}>
                            <button
                                onClick={() => setPaymentType("Khalti")}
                                style={{
                                    padding: "10px 20px",
                                    borderRadius: "5px",
                                    border: paymentType === "Khalti" ? "2px solid #4caf50" : "1px solid #ccc",
                                    backgroundColor: paymentType === "Khalti" ? "#E8F5E9" : "#FFF",
                                    cursor: "pointer",
                                }}
                            >
                                Khalti
                            </button>
                            <button
                                onClick={() => setPaymentType("Esewa")}
                                style={{
                                    padding: "10px 20px",
                                    borderRadius: "5px",
                                    border: paymentType === "Esewa" ? "2px solid #4caf50" : "1px solid #ccc",
                                    backgroundColor: paymentType === "Esewa" ? "#E8F5E9" : "#FFF",
                                    cursor: "pointer",
                                }}
                            >
                                E-sewa
                            </button>
                            <button
                                onClick={() => setPaymentType("Cash")}
                                style={{
                                    padding: "10px 20px",
                                    borderRadius: "5px",
                                    border: paymentType === "Cash" ? "2px solid #4caf50" : "1px solid #ccc",
                                    backgroundColor: paymentType === "Cash" ? "#E8F5E9" : "#FFF",
                                    cursor: "pointer",
                                }}
                            >
                                Cash
                            </button>
                        </div>
                        <p>Booking Details</p>
                        <p>Check-in: {checkInDate}</p>
                        <p>Duration: {duration} days</p>
                        <p>Guests: {guests}</p>
                        <h3>Total: NPR {room.price * duration}</h3>
                        <button
                            onClick={confirmBooking}
                            style={{
                                backgroundColor: "#4caf50",
                                color: "#FFF",
                                border: "none",
                                borderRadius: "5px",
                                padding: "10px 20px",
                                marginTop: "10px",
                                cursor: "pointer",
                            }}
                        >
                            Confirm Booking
                        </button>
                        <button
                            onClick={() => setShowModal(false)}
                            style={{
                                backgroundColor: "#ccc",
                                border: "none",
                                borderRadius: "5px",
                                padding: "10px 20px",
                                marginTop: "10px",
                                cursor: "pointer",
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewRoom;
