import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import RoomCard from '../components/RoomCard';

const Homepage = () => {
    // State to manage guest count (adults and children)
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [formData, setFormData] = useState({
        location: '',
        checkin: '',
        duration: '',
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const incrementAdults = () => setAdults(adults + 1);
    const decrementAdults = () => setAdults(adults > 0 ? adults - 1 : 0);

    const incrementChildren = () => setChildren(children + 1);
    const decrementChildren = () => setChildren(children > 0 ? children - 1 : 0);

    // State for rooms
    const [rooms, setRooms] = useState([]);

    // Fetch rooms from backend
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/room/get_all_rooms');
                setRooms(response.data.data); // Assuming backend returns a "data" array
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.location) newErrors.location = 'Location is required';
        if (!formData.checkin) newErrors.checkin = 'Check-in date is required';
        if (!formData.duration) newErrors.duration = 'Duration is required';
        if (formData.duration <= 0) newErrors.duration = 'Duration must be greater than 0';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Redirect to the rooms page with optional query params
            navigate(`/room?location=${formData.location}&checkin=${formData.checkin}&duration=${formData.duration}`);
        }
    };

    return (
        <>
            <div className="dashboard" style={{ backgroundColor: '#FFFFFFFF', minHeight: '100vh' }}>

                {/* First Section */}
                <div
                    className="section-one"
                    style={{ marginBottom: "40px", display: "flex", justifyContent: "center" }}
                >
                    <div
                        className="container d-flex justify-content-between"
                        style={{
                            width: "90%",
                            gap: "30px",
                            padding: "5px",
                            backgroundColor: "#FFFFFFFF",
                            borderRadius: "10px",
                        }}
                    >
                        {/* Left Container */}
                        <div className="left-container" style={{ width: "60%", textAlign: "left" }}>
                            <h1
                                style={{
                                    fontSize: "36px",
                                    fontWeight: "bold",
                                    color: "#13361C",
                                    marginBottom: "10px",
                                }}
                            >
                                The Perfect Combination of <br /> Luxury and Comfort
                            </h1>
                            <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                                <p
                                    style={{
                                        fontSize: "18px",
                                        fontWeight: "bold",
                                        color: "#555",
                                        marginBottom: "0",
                                        marginRight: "10px",
                                    }}
                                >
                                    Let’s get acquainted !
                                </p>
                                <hr style={{ flex: "1", borderTop: "2px solid #CC9A48" }} />
                            </div>
                            <p
                                style={{
                                    fontSize: "16px",
                                    color: "#777",
                                    lineHeight: "1.6",
                                    marginBottom: "20px",
                                }}
                            >
                                Luxestay is your go-to platform for booking the perfect hotel rooms with a blend
                                of luxury and comfort. Discover unparalleled experiences tailored to your needs
                                with just a few clicks. Our curated collection ensures you find the perfect stay
                                for every occasion. Whether you’re planning a family vacation, a romantic getaway,
                                or a business trip, we have you covered. Book your next stay with Luxestay and
                                experience the best of hospitality. Luxestay is your go-to platform for booking the perfect hotel rooms with a blend
                                of luxury and comfort. Discover unparalleled experiences tailored to your needs
                                with just a few clicks. Our curated collection ensures you find the perfect stay
                                for every occasion. Whether you’re planning a family vacation, a romantic getaway,
                                or a business trip, we have you covered.

                            </p>
                            <button
                                onClick={() => navigate("/about")}
                                style={{
                                    backgroundColor: "#CC9A48",
                                    color: "white",
                                    padding: "10px 20px",
                                    border: "none",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                }}
                            >
                                More →
                            </button>
                            <h4 style={{ marginTop: "20px", fontSize: "20px", fontWeight: "bold" }}>
                                Featured Rooms
                            </h4>

                            {/* Featured Hotels */}
                            <div
                                className="featured-hotels"
                                style={{
                                    marginTop: "20px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: "15px",
                                }}
                            >
                                {rooms.slice(0, 3).map((room, index) => (
                                    <div key={index} style={{ width: "48%" }}>
                                        <div
                                            style={{
                                                position: "relative",
                                                width: "100%",
                                                height: "150px",
                                                borderRadius: "8px",
                                                overflow: "hidden",
                                            }}
                                        >
                                            <img
                                                src={`http://localhost:5000/rooms/${room.image}`}
                                                alt={room.hotelName}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            <p
                                                style={{
                                                    position: "absolute",
                                                    top: "5px",
                                                    left: "10px",
                                                    color: "#FFD700",
                                                    fontSize: "14px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {room.location}
                                            </p>
                                            <p
                                                style={{
                                                    position: "absolute",
                                                    bottom: "5px",
                                                    left: "10px",
                                                    color: "#FF6347",
                                                    fontSize: "16px",
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {room.hotelName}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Container */}
                        <div
                            className="right-container"
                            style={{
                                width: "35%",
                                textAlign: "center",
                                backgroundColor: "#FFF",
                                padding: "20px",
                                borderRadius: "10px",
                                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: "24px",
                                    fontWeight: "bold",
                                    color: "#13361C",
                                    marginBottom: "15px",
                                }}
                            >
                                Find Hotel
                            </h3>
                            <form>
                                <div className="form-group" style={{ marginBottom: "15px" }}>
                                    <label
                                        htmlFor="location"
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: "500",
                                            marginBottom: "5px",
                                            display: "block",
                                        }}
                                    >
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Please enter a location"
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            borderRadius: "5px",
                                            border: "1px solid #ccc",
                                        }}
                                    />
                                    {errors.location && (
                                        <span style={{ color: "red", fontSize: "10px" }}>{errors.location}</span>
                                    )}
                                </div>

                                <div className="form-group" style={{ marginBottom: "15px" }}>
                                    <label
                                        htmlFor="checkin"
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: "500",
                                            marginBottom: "5px",
                                            display: "block",
                                        }}
                                    >
                                        Check-in
                                    </label>
                                    <input
                                        type="date"
                                        id="checkin"
                                        name="checkin"
                                        value={formData.checkin || new Date().toISOString().split("T")[0]}
                                        onChange={handleChange}
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            borderRadius: "5px",
                                            border: "1px solid #ccc",
                                        }}
                                    />
                                </div>

                                <div className="form-group" style={{ marginBottom: "15px" }}>
                                    <label
                                        htmlFor="duration"
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: "500",
                                            marginBottom: "5px",
                                            display: "block",
                                        }}
                                    >
                                        Duration
                                    </label>
                                    <input
                                        type="number"
                                        id="duration"
                                        name="duration"
                                        value={formData.duration || 1}
                                        onChange={handleChange}
                                        placeholder="Number of days"
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            borderRadius: "5px",
                                            border: "1px solid #ccc",
                                        }}
                                    />
                                </div>

                                <div className="form-group" style={{ marginBottom: "15px" }}>
                                    <label
                                        htmlFor="guests"
                                        style={{
                                            fontSize: "16px",
                                            fontWeight: "500",
                                            marginBottom: "5px",
                                            display: "block",
                                        }}
                                    >
                                        Guests
                                    </label>
                                    <input
                                        type="number"
                                        id="guests"
                                        name="guests"
                                        value={formData.guests || 1}
                                        onChange={handleChange}
                                        placeholder="Number of guests"
                                        style={{
                                            width: "100%",
                                            padding: "10px",
                                            borderRadius: "5px",
                                            border: "1px solid #ccc",
                                        }}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    onClick={handleSearch}
                                    style={{
                                        backgroundColor: "#CC9A48",
                                        color: "white",
                                        padding: "10px 20px",
                                        border: "none",
                                        borderRadius: "5px",
                                        cursor: "pointer",
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Search Hotels
                                </button>
                            </form>
                        </div>
                    </div>
                </div>



                {/* Second Section (About Us) */}
                <div
                    className="section-two mt-5 text-center"
                    style={{
                        marginBottom: '30px',
                        backgroundColor: '#13361C',
                        padding: '40px 20px',
                    }}
                >
                    <h1 style={{ color: 'white' }}>About Us</h1>
                    <p
                        style={{
                            maxWidth: '600px',
                            margin: '0 auto',
                            fontSize: '16px',
                            color: '#fff',
                            padding: '10px 0',
                        }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
                    </p>
                    <div
                        className="photo-gallery"
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            marginTop: '20px',
                            padding: '20px 0',
                        }}
                    >
                        <div
                            style={{
                                width: '22%',
                                height: '400px',
                                backgroundColor: '#FFFFFFFF',
                                margin: '10px',
                                padding: '10px',
                            }}
                        ></div>
                        <div
                            style={{
                                width: '22%',
                                height: '400px',
                                backgroundColor: '#FFFFFFFF',
                                margin: '10px',
                                padding: '10px',
                            }}
                        ></div>
                        <div
                            style={{
                                width: '22%',
                                height: '400px',
                                backgroundColor: '#FFFFFFFF',
                                margin: '10px',
                                padding: '10px',
                            }}
                        ></div>
                        <div
                            style={{
                                width: '22%',
                                height: '400px',
                                backgroundColor: '#D9D9D9',
                                margin: '10px',
                                padding: '10px',
                            }}
                        ></div>
                    </div>
                </div>

                {/* Third Section (Hotel Booking) */}
                <div
                    className="section-three mt-5"
                    style={{ marginBottom: '40px', textAlign: 'center' }}
                >
                    <div
                        className="hotel-rooms"
                        style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '20px',
                            justifyContent: 'center',
                            padding: '0 10px',
                        }}
                    >
                        {/* Map over rooms and render RoomCard components */}
                        {rooms.length > 0 ? (
                            rooms.map((room) => <RoomCard key={room._id} room={room} />)
                        ) : (
                            <p>No rooms available at the moment.</p>
                        )}
                    </div>
                </div>

                <Footer />
            </div>
        </>
    );
};

export default Homepage;
