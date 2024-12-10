import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

const Profile = ({ user, setUser }) => {
    const [newUsername, setNewUsername] = useState("");
    const [profilePicture, setProfilePicture] = useState(user?.profilePicture || ""); // State for profile picture
    const [selectedFile, setSelectedFile] = useState(null); // File for upload

    const updateUsernameHandler = async () => {
        if (!newUsername.trim()) {
            alert("Please enter a new username.");
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:8080/api/user/update/${user.userId}?newUserId=${newUsername}`
            );

            if (response.data.success) {
                alert("Username updated successfully!");
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

    const uploadProfilePicture = async () => {
        if (!selectedFile) {
            alert("Please select a file.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("userId", user.userId);

        try {
            const response = await axios.post("http://localhost:8080/api/user/uploadProfilePicture", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.data.success) {
                alert("Profile picture updated successfully!");
                setProfilePicture(response.data.profilePictureUrl); // Update the profile picture
            } else {
                alert(response.data.message || "Failed to upload profile picture.");
            }
        } catch (error) {
            console.error("Error uploading profile picture:", error);
            alert("Error uploading profile picture. Please try again.");
        }
    };

    const deleteProfileHandler = async () => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete your profile? This action cannot be undone."
        );
        if (!confirmDelete) return;

        try {
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
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center", // Center everything horizontally and vertically
                height: "100vh", // Ensure the content takes full viewport height
                padding: "20px",
            }}
        >
            <h2 style={{ textAlign: "center", color: "#1b5633" }}>{user?.name || "Your Profile"}</h2>

            {/* Profile Picture */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "20px",
                }}
            >
                <img
                    src={profilePicture || "https://via.placeholder.com/150"}
                    alt="Profile"
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        border: "2px solid green",
                    }}
                />
            </div>

            {/* Change Profile Picture */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <label htmlFor="profilePicture" className="green-label">
                    Change Profile Picture:
                </label>
                <input
                    type="file"
                    id="profilePicture"
                    style={{
                        border: "2px solid #1b5633",
                        padding: "5px",
                        borderRadius: "5px",
                    }}
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                <button
                    onClick={uploadProfilePicture}
                    style={{
                        backgroundColor: "#1b5633",
                        color: "white",
                        marginLeft: "0px",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      
                    }}
                >
                    Upload Picture
                </button>
            </div>

            {/* Update Username */}
            <h2 style={{ color: "#1b5633", textAlign: "center" }}>Update Username</h2>
            <p style={{ textAlign: "left", color: "#1b5633" }}>
                <strong>Username:</strong> {user?.userId || "No username available"}
            </p>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Enter New Username"
                    value={newUsername}
                    style={{
                        padding: "5px",
                        border: "1px solid #1b5633",
                        borderRadius: "5px",
                        marginRight: "10px",
                    }}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
                <button
                    onClick={updateUsernameHandler}
                    style={{
                        backgroundColor: "#1b5633",
                        color: "white",
                        marginLeft: "0px",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Update Username
                </button>
            </div>

            {/* Delete Profile */}
            <div style={{ textAlign: "center" }}>
                <button
                    onClick={deleteProfileHandler}
                    style={{
                        backgroundColor: "red",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Delete Profile
                </button>
            </div>
        </div>
    );
};

export default Profile;
