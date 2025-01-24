import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddRoom = () => {
    const [formData, setFormData] = useState({
        roomName: "",
        hotelName: "",
        price: "",
        location: "",
        description: "",
        noOfBeds: "",
    });

    const [image, setImage] = useState(null); // Image file
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Validation
        if (
            !formData.roomName ||
            !formData.hotelName ||
            !formData.price ||
            !formData.location ||
            !formData.description ||
            !formData.noOfBeds
        ) {
            toast.error("Please fill all the fields");
            setLoading(false);
            return;
        }

        if (!image) {
            toast.error("Please upload an image");
            setLoading(false);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("roomName", formData.roomName);
        formDataToSend.append("hotelName", formData.hotelName);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("location", formData.location);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("noOfBeds", formData.noOfBeds);
        formDataToSend.append("image", image);

        // Debug FormData
        for (let [key, value] of formDataToSend.entries()) {
            console.log(`${key}: ${value}`);
        }

        try {
            const response = await axios.post("http://localhost:5000/api/room/create", formDataToSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 201) {
                toast.success("Room created successfully!");
                setFormData({
                    roomName: "",
                    hotelName: "",
                    price: "",
                    location: "",
                    description: "",
                    noOfBeds: "",
                });
                setImage(null);
            }
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Failed to create room");
        } finally {
            setLoading(false);
        }
    };




    const styles = {
        container: {
            width: "100%",
            maxWidth: "500px",
            margin: "0 auto",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
        },
        input: {
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "16px",
        },
        textarea: {
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ddd",
            borderRadius: "5px",
            fontSize: "16px",
            resize: "none",
        },
        button: {
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            cursor: "pointer",
            marginTop: "10px",
        },
    };

    return (
        <div style={styles.container}>
            <h1>Add Room</h1>
            <form onSubmit={handleSubmit}>
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
                    required
                    style={styles.input}
                />
                <button type="submit" disabled={loading} style={styles.button}>
                    {loading ? "Adding Room..." : "Add Room"}
                </button>
            </form>
        </div>
    );
};

export default AddRoom;
