import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar"; // Navbar component for navigation

const StudyRooms = () => {
    const [studyRooms, setStudyRooms] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/studyrooms/") // Corrected HTTP endpoint
            .then((response) => {
                if (response.data.success) {
                    setStudyRooms(response.data.data || []); // Update state with study room data
                } else {
                    console.error("Error fetching study rooms:", response.data.message);
                }
            })
            .catch((error) => console.error("Error fetching study rooms:", error));
    }, []);

    const formatReservationTime = (timestamp) => {
        if (!timestamp || !timestamp.seconds) return "No reservation time";
        return new Date(timestamp.seconds * 1000).toLocaleString(); // Convert to readable date
    };

    return (
        <div>
            <Navbar />
            <h1>Study Rooms</h1>
            {studyRooms.length > 0 ? (
                <ul>
                    {studyRooms.map((room) => (
                        <li key={room.roomId}>
                            <strong>Name:</strong> {room.roomName} <br />
                            <strong>Location:</strong> {room.location} <br />
                            <strong>Availability:</strong> {room.availablilityStatus} <br />
                            <strong>Reservation Time:</strong> {formatReservationTime(room.reservationTime)} <br />
                            <strong>Reserved By:</strong> {room.reservedBy || "Not Reserved"}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No study rooms available at the moment.</p>
            )}
        </div>
    );
};

export default StudyRooms;
