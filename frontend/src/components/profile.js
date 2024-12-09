import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

const Profile = ({ user, setUser }) => {
    const [newUsername, setNewUsername] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle the dropdown

    const updateUsernameHandler = async () => {
        if (!newUsername.trim()) {
            alert("Please enter a new username.");
            return;
        }

        try {
            // Make PUT request to update the userId with query parameter
            const response = await axios.put(
                `http://localhost:8080/api/user/update/${user.userId}?newUserId=${newUsername}`
            );

            if (response.data.success) {
                alert("Username updated successfully!");
                // Update the user state with the new userId
                setUser({ ...user, userId: newUsername });
                setNewUsername(""); // Clear the input field
            } else {
                alert(response.data.message || "Failed to update username.");
            }
        } catch (error) {
            console.error("Error updating username:", error);
            alert("Error updating username. Please try again.");
        }
    };

    const deleteProfileHandler = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your profile? This action cannot be undone."
        );
        if (!confirmDelete) return;

        try {
            // Make DELETE request to delete the user profile
            const response = await axios.delete(`http://localhost:8080/api/user/delete/${user.userId}`);
            if (response.data.success) {
                alert("Profile deleted successfully!");
                setUser(null); // Log the user out
            } else {
                alert(response.data.message || "Failed to delete profile.");
            }
        } catch (error) {
            console.error("Error deleting profile:", error);
            alert("Error deleting profile. Please try again.");
        }
    };

    return (
        <div>
            <Navbar />
            <h1>Update Username</h1>
            {/* Display the current userId */}
            <p>
                <strong>Username:</strong> {user?.userId || "No username available"}
            </p>
            <div>
                <input
                    type="text"
                    placeholder="Enter New Username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
                <button onClick={updateUsernameHandler}>Update Username</button>
            </div>
            <button onClick={deleteProfileHandler}>Delete Profile</button>
        </div>
    );
};

export default Profile;
