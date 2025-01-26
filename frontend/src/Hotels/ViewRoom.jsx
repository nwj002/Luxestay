import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import EsewaForm from "../paymentGateways/Esewa/EsewaForm";

const ViewRoom = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [duration, setDuration] = useState(1);
  const [guests, setGuests] = useState(1);
  const [checkInDate, setCheckInDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [showReviewOverlay, setShowReviewOverlay] = useState(false);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("roomid", id);
    localStorage.setItem("duration", duration);
    localStorage.setItem("guests", guests);
    localStorage.setItem("checkInDate", checkInDate);
  }, [id, duration, guests, checkInDate]);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/room/get_single_room/${id}`
        );
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

  const submitReview = () => {
    const newReview = { rating, review };
    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem("reviews", JSON.stringify(updatedReviews));
    setShowReviewOverlay(false);
    setRating(0);
    setReview("");
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

      const response = await axios.post(
        "http://localhost:5000/api/booking/create",
        bookingData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        toast.success("Room booked successfully!");
        setShowModal(false);
        navigate("/bookings");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to book the room. Please try again."
      );
    }
  };

  const today = new Date().toISOString().split("T")[0];

  if (!room) return <div>Loading...</div>;

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#FFFFFFFF",
        padding: "20px",
      }}
    >
      {/* Main Section */}
      <div style={{ display: "flex", gap: "20px" }}>
        {/* Left Section */}
        <div style={{ flex: 2 }}>
          {/* Image Container */}
          <div
            style={{
              marginBottom: "20px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            <img
              src={`http://localhost:5000/rooms/${room.image}`}
              alt={room.roomName}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>

          {/* Room Details Container */}
          <div
            style={{
              marginBottom: "20px",
              backgroundColor: "#FFF9F5",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ marginBottom: "10px", fontWeight: "bold", fontSize: "24px", color: "#333" }}>
              {room?.hotelName}
            </h2>
            <p style={{ marginBottom: "10px", fontSize: "18px", fontStyle: "italic", color: "#777" }}>
              {room?.location}
            </p>
            <p style={{ marginBottom: "20px", fontSize: "16px", lineHeight: "1.8", color: "#555" }}>
              {room?.description}
            </p>
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "14px", fontWeight: "bold", margin: "0", color: "#444" }}>Room Name</p>
                <p style={{ fontSize: "16px", margin: "0", color: "#333" }}>{room?.roomName}</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "14px", fontWeight: "bold", margin: "0", color: "#444" }}>Beds</p>
                <p style={{ fontSize: "16px", margin: "0", color: "#333" }}>{room?.noOfBeds}</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: "14px", fontWeight: "bold", margin: "0", color: "#444" }}>Price</p>
                <p style={{ fontSize: "16px", margin: "0", color: "#333" }}>NPR {room?.price}</p>
              </div>
            </div>
          </div>


          {/* Review and Rating Container */}
          <div
            style={{
              backgroundColor: "#FFF9F5",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <h3 style={{ marginBottom: "10px" }}>Review and Rating</h3>
            {reviews.map((r, index) => (
              <div key={index}>
                <p>
                  <strong>User:</strong> "{r.review}"
                </p>
                <p>Rating: {r.rating}/5</p>
              </div>
            ))}
            <button
              onClick={() => setShowReviewOverlay(true)}
              style={{
                backgroundColor: "#CC9A48",
                color: "#FFF",
                border: "none",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              Write a Review
            </button>
          </div>
        </div>
        {/* </div> */}
        {/* </div> */}

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
              href='https://www.google.com/maps'
              target='_blank'
              rel='noopener noreferrer'
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
          <div
            style={{
              backgroundColor: "#FFF9F5",
              padding: "20px",
              borderRadius: "8px",
              marginBottom: "20px",
            }}
          >
            <h3>Total Price: NPR {room.price * duration}</h3>
            <label>Check-in</label>
            <input
              type='date'
              value={checkInDate}
              onChange={handleCheckInChange}
              min={today}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
            <label>Guests</label>
            <input
              type='number'
              value={guests}
              onChange={handleGuestsChange}
              min={1}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
            <label>Duration</label>
            <input
              type='number'
              value={duration}
              onChange={handleDurationChange}
              min={1}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
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
          <div
            style={{
              backgroundColor: "#FFF9F5",
              padding: "20px",
              borderRadius: "8px",
            }}
          >
            <h3>Hotel Policies</h3>
            <p>
              <strong>Check-in:</strong> 12:15 PM
            </p>
            <p>
              <strong>Check-out:</strong> 11:15 AM
            </p>
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
          <div
            style={{
              backgroundColor: "#FFF",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              width: "450px",
              fontFamily: "Arial, sans-serif",
            }}
          >
            <h2 style={{ fontSize: "22px", marginBottom: "20px" }}>Payment Type</h2>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                marginBottom: "20px",
              }}
            >
              {/* Khalti Button */}
              <button
                onClick={() => setPaymentType("Khalti")}
                style={{
                  backgroundColor: "#FFF",
                  border: "1px solid #ccc",
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <img
                  src="/assets/icons/khalti.png"
                  alt="Khalti"
                  style={{ width: "40px", height: "40px" }}
                />
              </button>

              {/* Esewa Button */}
              <div
                style={{
                  backgroundColor: "#FFF",
                  border: "1px solid #ccc",
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <EsewaForm roomDetails={room} />
              </div>

              {/* Cash Button */}
              <button
                onClick={() => setPaymentType("Cash")}
                style={{
                  backgroundColor: "#D4AF37",
                  border: "none",
                  borderRadius: "8px",
                  color: "#FFF",
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
              >
                Cash
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderTop: "1px solid #ccc",
                paddingTop: "20px",
                fontSize: "14px",
              }}
            >
              <div style={{ textAlign: "left" }}>
                <p>
                  <strong>Check-in:</strong> {checkInDate}
                </p>
                <p>
                  <strong>Duration:</strong> {duration} days
                </p>
                <p>
                  <strong>Guests:</strong> {guests}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p>
                  <strong>Total:</strong> NPR {room.price * duration}
                </p>
                <input
                  type="text"
                  placeholder="Promo code"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "5px",
                    width: "100%",
                  }}
                />
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <button
                style={{
                  backgroundColor: "#D4AF37",
                  border: "none",
                  color: "#FFF",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
                onClick={confirmBooking}
              >
                Confirm Booking
              </button>
              <button
                style={{
                  backgroundColor: "#ccc",
                  border: "none",
                  color: "#000",
                  padding: "10px 20px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}


      {showReviewOverlay && (
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
          <div
            style={{
              backgroundColor: "#FFF",
              padding: "20px",
              borderRadius: "8px",
              textAlign: "center",
              width: "400px",
            }}
          >
            <h2>Review and Rating</h2>
            <div style={{ marginBottom: "20px" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  style={{
                    fontSize: "24px",
                    cursor: "pointer",
                    color: rating >= star ? "#FFD700" : "#ccc",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Submit your Feedback"
              style={{
                width: "100%",
                height: "100px",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginBottom: "10px",
              }}
            ></textarea>
            <button
              onClick={submitReview}
              style={{
                backgroundColor: "#CC9A48",
                color: "#FFF",
                border: "none",
                padding: "10px",
                borderRadius: "8px",
              }}
            >
              Submit
            </button>
            <button
              onClick={() => setShowReviewOverlay(false)}
              style={{
                backgroundColor: "#CCC",
                color: "#000",
                border: "none",
                padding: "10px",
                borderRadius: "8px",
                marginLeft: "10px",
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
