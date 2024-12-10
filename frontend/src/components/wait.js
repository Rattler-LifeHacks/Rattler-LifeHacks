import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import Navbar from "./navbar";

const WaitTimes = () => {
    const [waitTimes, setWaitTimes] = useState([]);

    useEffect(() => {
        axios
            .get("http:localhost:8080/api/waittimes/")
            .then((response) => setWaitTimes(response.data.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <Navbar />
            <h1>Wait Times</h1>
            <div className="wait-times-container">
                {/* Display each location's wait time */}
                <ul>
                    {waitTimes.length > 0 ? (
                        waitTimes.map((wt) => (
                            <li key={wt.locationId} className="wait-time-item">
                                <strong>{wt.locationName}:</strong> {wt.currentWaitTime} mins
                            </li>
                        ))
                    ) : (
                        <p>Loading wait times...</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default WaitTimes;
