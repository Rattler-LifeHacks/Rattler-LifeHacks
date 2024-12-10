 import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Navbar from "./navbar";

const StudyRooms = () => {
    const [studyRooms, setStudyRooms] = useState([]);

    useEffect(() => {
        axios
            .get("http:localhost:8080/api/studyrooms/")
            .then((response) => setStudyRooms(response.data.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            
            <h4>Study Rooms</h4>
            <ul>
                {studyRooms.map((room) => (
                    <li key={room.roomId}>{room.roomName}</li>
                ))}
            </ul>
        </div>
    );
};

export default StudyRooms;
