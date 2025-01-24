import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import RoomCard from '../components/RoomCard';

const RoomPage = () => {
    const [rooms, setRooms] = useState([]);

    // Fetch rooms from backend
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/room/get_all_rooms");
                setRooms(response.data.data); // Assuming backend returns a "data" array
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        fetchRooms();
    }, []);

    return (
        <>
            


                {/* Third Section (Hotel Booking) */}
                {/* Third Section (Hotel Booking) */}
                <div className="section-three mt-5" style={{ marginBottom: '40px', textAlign: 'center' }}>
                    <div className="hotel-rooms" style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '20px',
                        justifyContent: 'center',
                        padding: '0 10px'
                    }}>
                        {/* Map over rooms and render RoomCard components */}
                        {rooms.length > 0 ? (
                            rooms.map((room) => (
                                <RoomCard key={room._id} room={room} />
                            ))
                        ) : (
                            <p>No rooms available at the moment.</p>
                        )}
                    </div>
                </div>

                <Footer />
           
        </>
    );
};

export default RoomPage;
