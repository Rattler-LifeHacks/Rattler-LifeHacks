import React, { useEffect, useState } from "react";
import axios from "axios";

const StudyRooms = () => {
    const [studyRooms, setStudyRooms] = useState([]);

    useEffect(() => {
        axios
            .get("/api/studyrooms/")
            .then((response) => setStudyRooms(response.data.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h1>Study Rooms</h1>
            <ul>
                {studyRooms.map((room) => (
                    <li key={room.roomId}>{room.roomName}</li>
                ))}
            </ul>
        </div>
    );
};

export default StudyRooms;