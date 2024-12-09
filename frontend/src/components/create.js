import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Create = () => {
    const [name, setName] = useState(""); // State for name
    const [username, setUsername] = useState(""); // State for username
    const [email, setEmail] = useState(""); // State for email
    const [password, setPassword] = useState(""); // State for password
    const [errorMessage, setErrorMessage] = useState(""); // State for error messages
    const [successMessage, setSuccessMessage] = useState(""); // State for success messages
    const navigate = useNavigate(); // For redirecting to login after successful account creation

    const createUserHandler = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setErrorMessage("");
        setSuccessMessage("");

        // Check if all fields are filled
        if (!name || !username || !email || !password) {
            setErrorMessage("All fields are required.");
            return;
        }

        // Prepare user data
        const userData = {
            name,
            username,
            email,
            password,
        };

        try {
            const response = await axios.post("http://localhost:8080/api/user/create", userData);

            if (response.data.success) {
                setSuccessMessage("Account created successfully! Redirecting to login...");
                setTimeout(() => {
                    navigate("/"); // Redirect to login page after success
                }, 2000);
            } else {
                setErrorMessage("Failed to create account. Please try again.");
            }
        } catch (error) {
            console.error("Error creating account:", error);
            setErrorMessage("Error creating account. Please try again.");
        }
    };

    return (
        <div className="create-container">
            <h1>Create New Account</h1>

            {/* Success or error messages */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}

            {/* Form to create a new user */}
            <form onSubmit={createUserHandler}>
                <div>
                    <label htmlFor="name" className="green-label">NAME</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="green-label">EMAIL</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>
                <div>
                    <label htmlFor="username" className="green-label">USERNAME</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="green-label">PASSWORD</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>

                <button type="submit">Create Account</button>
            </form>
        </div>
    );
};

export default Create;
