import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar"; // Ensure this path is correct

const WaitTimes = () => {
    const [waitTimes, setWaitTimes] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/waittimes/") // Correct endpoint
            .then((response) => {
                if (response.data.success) {
                    setWaitTimes(response.data.data || []); // Update state with fetched data
                } else {
                    setError(response.data.message || "Failed to fetch wait times");
                }
            })
            .catch((err) => {
                console.error("Error fetching wait times:", err);
                setError("Error fetching wait times. Please try again later.");
            });
    }, []);

    return (
        <div>
           
            <h1>Wait Times</h1>
            {error && <p className="error-message">{error}</p>}
            {waitTimes.length > 0 ? (
                <ul>
                    {waitTimes.map((wt) => (
                        <li key={wt.locationId}>
                            <strong>Location:</strong> {wt.locationId} <br />
                            <strong>Type:</strong> {wt.locationType} <br />
                            <strong>Wait Time:</strong> {wt.currentWaitTime} mins
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No wait times available.</p>
            )}
        </div>
    );
};

export default WaitTimes;
