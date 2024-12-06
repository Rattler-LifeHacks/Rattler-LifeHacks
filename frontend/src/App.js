import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/login"; // Ensure this is the correct path to your login.js
import Profile from "./components/profile"; // Path to your profile.js
import WaitTimes from "./components/wait"; // Path to your wait.js
import StudyRooms from "./components/study"; // Path to your study.js
import Events from "./components/events"; // Path to your events.js

const App = () => {
    const [user, setUser] = useState(null); // State to track logged-in user

    return (
        <Router>
            {user && <NavBar setUser={setUser} />} {/* Show NavBar if logged in */}
            <Routes>
                {/* Login Route */}
                <Route
                    path="/"
                    element={user ? <Navigate to="/profile" /> : <Login setUser={setUser} />}
                />

                {/* Protected Routes */}
                <Route
                    path="/profile"
                    element={user ? <Profile user={user} setUser={setUser} /> : <Navigate to="/" />}
                />
                <Route
                    path="/wait-times"
                    element={user ? <WaitTimes /> : <Navigate to="/" />}
                />
                <Route
                    path="/study-rooms"
                    element={user ? <StudyRooms /> : <Navigate to="/" />}
                />
                <Route
                    path="/events"
                    element={user ? <Events /> : <Navigate to="/" />}
                />
            </Routes>
        </Router>
    );
};

const NavBar = ({ setUser }) => (
    <nav>
        <ul>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/wait-times">Wait Times</a></li>
            <li><a href="/study-rooms">Study Rooms</a></li>
            <li><a href="/events">Events</a></li>
            <li>
                <a
                    href="/"
                    onClick={() => {
                        sessionStorage.clear();
                        setUser(null);
                    }}
                >
                    Logout
                </a>
            </li>
        </ul>
    </nav>
);

export default App;
