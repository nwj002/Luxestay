import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Profile.css"; // Add styles if needed

const Profile = () => {
    const [user, setUser] = useState(null); // Store user details
    const [editMode, setEditMode] = useState(false); // Toggle between view and edit mode
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    // Fetch user profile
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get("http://localhost:5000/api/users/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    phone: response.data.phone,
                });
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch user profile");
            }
        };

        fetchUserProfile();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Update user profile
    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");
            const response = await axios.put(
                "http://localhost:5000/api/users/profile/edit",
                formData,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(response.data.message);
            setUser(response.data.user); // Update user state
            setEditMode(false); // Exit edit mode
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update profile");
        }
    };

    // Delete user profile
    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete your profile?")) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete("http://localhost:5000/api/users/profile/delete", {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast.success("Profile deleted successfully");
            localStorage.clear(); // Clear local storage
            window.location.href = "/register"; // Redirect to registration
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete profile");
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="profile-container">
            <h1>Profile</h1>
            {!editMode ? (
                <div className="profile-view">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Phone:</strong> {user.phone}</p>
                    <div className="profile-actions">
                        <button onClick={() => setEditMode(true)} className="btn-edit">Edit</button>
                        <button onClick={handleDelete} className="btn-delete">Delete Profile</button>
                    </div>
                </div>
            ) : (
                <form className="profile-edit-form" onSubmit={handleUpdate}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="btn-save">Save</button>
                        <button onClick={() => setEditMode(false)} type="button" className="btn-cancel">Cancel</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default Profile;
