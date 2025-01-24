import React from "react";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
    const navigate = useNavigate();
    const { _id, roomName, hotelName, price, location, noOfBeds, image } = room;

    const styles = {
        card: {
            width: "300px",
            backgroundColor: "#FFF7ED",
            padding: "15px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease",
            cursor: "pointer",
            margin: "20px auto",
        },
        image: {
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "15px",
        },
        title: {
            fontSize: "20px",
            fontWeight: "600",
            marginBottom: "10px",
            color: "#2C2C2C",
        },
        subtitle: {
            fontSize: "16px",
            color: "#555",
            marginBottom: "8px",
            textAlign: "left",
        },
        location: {
            fontSize: "14px",
            color: "#555",
            marginBottom: "15px",
            textAlign: "left",
        },
        infoSection: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "16px",
            fontWeight: "500",
            color: "#2C2C2C",
        },
        iconText: {
            display: "flex",
            alignItems: "center",
            gap: "5px",
        },
        price: {
            color: "#2C7A1F",
            fontWeight: "bold",
        },
    };

    const handleCardClick = () => {
        navigate(`/room/${_id}`); // Navigate to the detailed view page
    };

    return (
        <div
            style={styles.card}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            onClick={handleCardClick}
        >
            <img src={`http://localhost:5000/rooms/${image}`} alt={roomName} style={styles.image} />
            <h4 style={styles.title}>{hotelName}</h4>
            <p style={styles.subtitle}>
                <strong>Room Type:</strong> {roomName}
            </p>
            <p style={styles.location}>
                <strong>Location:</strong> {location}
            </p>
            <div style={styles.infoSection}>
                <div style={styles.iconText}>🛏️ {noOfBeds} Beds</div>
                <div style={styles.price}>NPR {price}</div>
            </div>
        </div>
    );
};

export default RoomCard;
