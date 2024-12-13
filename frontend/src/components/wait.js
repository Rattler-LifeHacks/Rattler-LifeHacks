import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar"; // Optional: Use the Navbar component

const WaitTimes = () => {
    const [waitTimes, setWaitTimes] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/waittimes/") // Correct API endpoint
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
        <div className="waittimes">  {/* Apply specific class to isolate styles */}
            {/* Navbar component can be used here if required */}
            <Navbar />
            
            <h5>Wait Times</h5>

            {error && <p className="error-message">{error}</p>}

            {waitTimes.length > 0 ? (
                <div className="wait-times-container">
                    {waitTimes.map((wt) => (
                        <div key={wt.locationId} className="wait-time-card">
                            <h3>{wt.locationId}</h3>
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
