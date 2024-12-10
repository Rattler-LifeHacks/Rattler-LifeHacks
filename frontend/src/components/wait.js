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
