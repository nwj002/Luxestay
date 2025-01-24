import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const AdminRoomTable = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/room/get_all_rooms");
                setRooms(response.data.data); // Assuming rooms are returned in the "data" field
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch rooms.");
            }
        };
        fetchRooms();
    }, []);

    const handleDelete = async (roomId) => {
        if (!window.confirm("Are you sure you want to delete this room?")) {
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/api/room/delete_room/${roomId}`);
            setRooms(rooms.filter((room) => room._id !== roomId));
            toast.success("Room deleted successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete room.");
        }
    };

    const styles = {
        container: {
            padding: "20px",
            textAlign: "center",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
        },
        thTd: {
            border: "1px solid #ddd",
            padding: "10px",
            textAlign: "center",
            verticalAlign: "middle",
        },
        th: {
            backgroundColor: "#f4f4f4",
            fontWeight: "bold",
        },
        thumbnail: {
            width: "80px",
            height: "80px",
            objectFit: "cover",
            borderRadius: "5px",
        },
        button: {
            padding: "5px 10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "bold",
            cursor: "pointer",
            margin: "0 5px",
        },
        deleteButton: {
            backgroundColor: "#f44336",
        },
    };

    return (
        <div style={styles.container}>
            <h1>Manage Rooms</h1>
            {rooms.length === 0 ? (
                <p>No rooms available at the moment.</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>#</th>
                            <th style={styles.th}>Image</th>
                            <th style={styles.th}>Room Name</th>
                            <th style={styles.th}>Hotel Name</th>
                            <th style={styles.th}>Location</th>
                            <th style={styles.th}>Price</th>
                            <th style={styles.th}>Beds</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room, index) => (
                            <tr key={room._id}>
                                <td style={styles.thTd}>{index + 1}</td>
                                <td style={styles.thTd}>
                                    <img
                                        src={`http://localhost:5000/rooms/${room.image}`}
                                        alt={room.image}
                                        style={styles.thumbnail}
                                    />
                                </td>
                                <td style={styles.thTd}>{room.roomName}</td>
                                <td style={styles.thTd}>{room.hotelName}</td>
                                <td style={styles.thTd}>{room.location}</td>
                                <td style={styles.thTd}>${room.price}</td>
                                <td style={styles.thTd}>{room.noOfBeds}</td>
                                <td style={styles.thTd}>
                                    <Link
                                        to={`/room/update-delete/${room._id}`}
                                        style={styles.button}
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(room._id)}
                                        style={{ ...styles.button, ...styles.deleteButton }}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminRoomTable;
