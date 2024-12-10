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
           
            <h1 style={{ textAlign: "center", color: "#1b5633" }}>Wait Times</h1>
            {error && <p className="error-message" style={{ color: "red", textAlign: "center" }}>{error}</p>}
            {waitTimes.length > 0 ? (
                <div className="wait-times-container">
                    {waitTimes.map((wt) => (
                        <div key={wt.locationId} className="wait-time-card">
                            <h3 style={{ color: "#1b5633" }}>{wt.locationId}</h3>
                            <p><strong>Type:</strong> {wt.locationType}</p>
                            <p><strong>Wait Time:</strong> {wt.currentWaitTime} mins</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ textAlign: "center" }}>No wait times available.</p>
            )}
        </div>
    );
};

export default WaitTimes;
