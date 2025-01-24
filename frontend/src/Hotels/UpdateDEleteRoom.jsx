import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UpdateDeleteRoom = () => {
    const { id } = useParams(); // Room ID from URL
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        roomName: "",
        hotelName: "",
        price: "",
        location: "",
        description: "",
        noOfBeds: "",
    });
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/room/get_single_room/${id}`);
                setFormData(response.data.data);
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch room details.");
            }
        };
        fetchRoom();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (let key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        if (image) {
            formDataToSend.append("image", image);
        }

        try {
            await axios.put(`http://localhost:5000/api/room/update_room/${id}`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Room updated successfully!");
            navigate("/rooms");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update room.");
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this room?")) {
            try {
                await axios.delete(`http://localhost:5000/api/room/delete_room/${id}`);
                toast.success("Room deleted successfully!");
                navigate("/rooms");
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to delete room.");
            }
        }
    };

    const styles = {
        container: {
            maxWidth: "600px",
            margin: "0 auto",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        },
        form: {
            display: "flex",
            flexDirection: "column",
            gap: "10px",
        },
        input: {
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ddd",
            borderRadius: "5px",
        },
        textarea: {
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            resize: "none",
        },
        button: {
            padding: "10px",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "10px",
        },
        updateButton: {
            backgroundColor: "#4caf50",
            color: "white",
        },
        deleteButton: {
            backgroundColor: "#f44336",
            color: "white",
        },
    };

    return (
        <div style={styles.container}>
            <h1>Update or Delete Room</h1>
            <form onSubmit={handleUpdate} style={styles.form}>
                <input
                    type="text"
                    name="roomName"
                    placeholder="Room Name"
                    value={formData.roomName}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    name="hotelName"
                    placeholder="Hotel Name"
                    value={formData.hotelName}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    style={styles.textarea}
                />
                <input
                    type="number"
                    name="noOfBeds"
                    placeholder="Number of Beds"
                    value={formData.noOfBeds}
                    onChange={handleChange}
                    required
                    style={styles.input}
                />
                <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    accept="image/*"
                    style={styles.input}
                />
                <button type="submit" style={{ ...styles.button, ...styles.updateButton }}>
                    Update Room
                </button>
            </form>
            <button
                onClick={handleDelete}
                style={{ ...styles.button, ...styles.deleteButton }}
            >
                Delete Room
            </button>
        </div>
    );
};

export default UpdateDeleteRoom;
