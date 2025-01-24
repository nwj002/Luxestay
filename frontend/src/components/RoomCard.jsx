import React from "react";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room }) => {
    const navigate = useNavigate();
    const { _id, roomName, hotelName, price, location, description, noOfBeds, image } = room;

    const styles = {
        card: {
            width: "22%",
            backgroundColor: "#fff",
            padding: "15px",
            borderRadius: "8px",
            textAlign: "center",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            transition: "transform 0.3s ease",
            cursor: "pointer",
        },
        image: {
            width: "100%",
            height: "150px",
            objectFit: "cover",
            borderRadius: "8px",
        },
        title: {
            fontSize: "18px",
            fontWeight: "bold",
            margin: "10px 0",
        },
        description: {
            fontSize: "14px",
            color: "#555",
            marginBottom: "10px",
        },
        info: {
            fontSize: "14px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "10px",
        },
        iconText: {
            display: "flex",
            alignItems: "center",
            gap: "5px",
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
            <h4 style={styles.title}>{roomName}</h4>
            <p style={styles.description}>{description}</p>
            <p style={styles.description}>
                {hotelName}, {location}
            </p>
            <div style={styles.info}>
                <div style={styles.iconText}>🛏️ {noOfBeds} Beds</div>
                <div style={styles.iconText}>Price: NPR {price}</div>
            </div>
        </div>
    );
};

export default RoomCard;
