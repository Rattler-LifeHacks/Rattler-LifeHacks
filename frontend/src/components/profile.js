//view, update, and delete their profile

import React, { useState } from "react";
import axios from "axios";

const Profile = ({ user, setUser }) => {
    const [newUsername, setNewUsername] = useState("");

    const updateUsernameHandler = async () => {
        try {
            const response = await axios.put(`http:localhost:8080/api/user/update/${user.userId}`, null, {
                params: { newUsername },
            });
            if (response.data.success) {
                alert("Username updated successfully");
                setUser({ ...user, username: newUsername });
            } else {
                alert("Failed to update username");
            }
        } catch (error) {
            console.error(error);
            alert("Error updating username");
        }
    };

    const deleteProfileHandler = async () => {
        try {
            const response = await axios.delete(`/api/user/delete/${user.userId}`);
            if (response.data.success) {
                alert("Profile deleted successfully");
                setUser(null);
            } else {
                alert("Failed to delete profile");
            }
        } catch (error) {
            console.error(error);
            alert("Error deleting profile");
        }
    };

    return (
        <div>
            <h1>Profile</h1>
            <p>Current Username: {user.username}</p>
            <input
                type="text"
                placeholder="Enter New Username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
            />
            <button onClick={updateUsernameHandler}>Update Username</button>
            <button onClick={deleteProfileHandler}>Delete Profile</button>
        </div>
    );
};

export default Profile;
