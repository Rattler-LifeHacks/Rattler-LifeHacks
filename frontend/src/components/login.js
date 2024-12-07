import React, { useState } from "react";
import axios from "axios"; 

const Login = ({ setUser }) => {
    const [username, setUsername] = useState("");

    const loginHandler = async () => {
        try {
            const response = await axios.get(`http:localhost:8080/api/user/${username}`);
            if (response.data.success) {
                setUser(response.data.data);
                alert("Login Successful");
            } else {
                alert("User not found");
            }
        } catch (error) {
            console.error(error);
            alert("Error logging in");
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={loginHandler}>Login</button>
            <button onClick={() => (window.location.href = "/create")}>
                Create Profile
            </button>
        </div>
    );
};

export default Login;
