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
            <div className="dashboard" style={{ backgroundColor: '#FFF2E5', minHeight: '100vh' }}>

                {/* First Section */}
                <div className="section-one mt-5" style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
                    <div className="container d-flex justify-content-between" style={{ width: '90%', gap: '30px' }}>
                        {/* Left Container (65%) */}
                        <div className="left-container" style={{ width: '65%', textAlign: 'center' }}>
                            <h2 style={{ fontSize: '32px', fontWeight: '600' }}>Featured Rooms</h2>
                            <p style={{ fontSize: '16px', margin: '10px 0 20px' }}>
                                Discover the best rooms for your stay at Luxestay. Whether you're looking for comfort, luxury, or convenience, our featured rooms cater to all your needs.
                            </p>
                            <div className="product-cards" style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                                {rooms.slice(0, 2).map((room) => (
                                    <div
                                        key={room._id}
                                        className="product-card"
                                        style={{
                                            width: '48%',
                                            backgroundColor: '#fff',
                                            padding: '15px',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                                            textAlign: 'center',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => navigate(`/room/${room._id}`)} // Navigate to the room details page
                                    >
                                        <img
                                            src={`http://localhost:5000/rooms/${room.image}`}
                                            alt={room.roomName}
                                            style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px' }}
                                        />
                                        <h4 style={{ marginTop: '10px' }}>{room.roomName}</h4>
                                        <p>{room.description}</p>
                                        <p style={{ fontWeight: 'bold', marginTop: '10px' }}>Price: NPR {room.price}</p>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* Right Container (35%) */}
                        <div
                            className="right-container"
                            style={{
                                width: '35%',
                                textAlign: 'center',
                                backgroundColor: '#fff',
                                padding: '20px',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            }}
                        >
                            <h3 style={{ fontSize: '24px', fontWeight: '600' }}>Find a Hotel</h3>
                            <form>
                                <div className="form-group" style={{ marginBottom: '1rem' }}>
                                    <label htmlFor="location" style={{ fontSize: '16px', fontWeight: '500' }}>
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        className="form-control"
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '5px',
                                            border: '1px solid #ccc',
                                        }}
                                    />
                                    {errors.location && <span style={{ color: 'red', fontSize: '12px' }}>{errors.location}</span>}
                                </div>

                                <div className="form-group" style={{ marginBottom: '1rem' }}>
                                    <label htmlFor="checkin" style={{ fontSize: '16px', fontWeight: '500' }}>
                                        Check-in
                                    </label>
                                    <input
                                        type="date"
                                        id="checkin"
                                        name="checkin"
                                        value={formData.checkin}
                                        onChange={handleChange}
                                        className="form-control"
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '5px',
                                            border: '1px solid #ccc',
                                        }}
                                    />
                                    {errors.checkin && <span style={{ color: 'red', fontSize: '12px' }}>{errors.checkin}</span>}
                                </div>

                                <div className="form-group" style={{ marginBottom: '1rem' }}>
                                    <label htmlFor="duration" style={{ fontSize: '16px', fontWeight: '500' }}>
                                        Duration
                                    </label>
                                    <input
                                        type="number"
                                        id="duration"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        className="form-control"
                                        placeholder="Duration in days"
                                        style={{
                                            width: '100%',
                                            padding: '8px',
                                            borderRadius: '5px',
                                            border: '1px solid #ccc',
                                        }}
                                    />
                                    {errors.duration && <span style={{ color: 'red', fontSize: '12px' }}>{errors.duration}</span>}
                                </div>

                                <div className="form-group" style={{ marginBottom: '1rem', textAlign: 'center' }}>
                                    <button
                                        type="submit"
                                        onClick={handleSearch}
                                        style={{
                                            backgroundColor: '#4caf50',
                                            color: 'white',
                                            padding: '10px 20px',
                                            border: 'none',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            fontSize: '16px',
                                            fontWeight: 'bold',
                                            transition: 'background-color 0.3s ease',
                                        }}
                                        onMouseEnter={(e) => (e.target.style.backgroundColor = '#45a049')}
                                        onMouseLeave={(e) => (e.target.style.backgroundColor = '#4caf50')}
                                    >
                                        Search
                                    </button>
                                </div>
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
