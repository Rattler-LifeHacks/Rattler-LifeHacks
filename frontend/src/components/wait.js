import React, { useEffect, useState } from "react";
import axios from "axios";

const WaitTimes = () => {
    const [waitTimes, setWaitTimes] = useState([]);

    useEffect(() => {
        axios
            .get("/api/waittimes/")
            .then((response) => setWaitTimes(response.data.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h1>Wait Times</h1>
            <ul>
                {waitTimes.map((wt) => (
                    <li key={wt.locationId}>
                        {wt.locationName}: {wt.currentWaitTime} mins
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WaitTimes;
