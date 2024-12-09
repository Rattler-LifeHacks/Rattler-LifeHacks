import React, { useState } from "react";
import axios from "axios";

const Login = ({ setUser }) => {
    const [userId, setUserId] = useState(""); // State for User ID
    const [password, setPassword] = useState(""); // State for Password

    const loginHandler = async () => {
        try {
            // Send POST request with userId and password
            const response = await axios.post("/api/user/login", {
                userId, // Corrected variable name
                password, // Corrected variable name
            });

            if (response.data.success) {
                setUser(response.data.data); // Pass user data to parent
                alert("Login Successful");
            } else {
                alert(response.data.message || "Invalid User ID or Password");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            if (error.response && error.response.data.message) {
                alert(`Error: ${error.response.data.message}`);
            } else {
                alert("Error logging in. Please try again.");
            }
        }
    };

    return (
        <div>
            <h1>Rattler Life Hacks</h1>
            <img src="/assets/famulogo1.png" alt="FAMU Logo" />
            <div>
                <label htmlFor="userId" className="green-text">User ID:</label>
                <input
                    type="text"
                    id="userId"
                    placeholder="Enter User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="password" className="green-text">Password:</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={loginHandler}>Login</button>
            <button onClick={() => (window.location.href = "/create")}>
                Create Profile
            </button>
        </div>
    );
};

export default Login;
