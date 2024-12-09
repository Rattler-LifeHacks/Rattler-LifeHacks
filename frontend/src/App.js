import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";

import Login from "./components/login"; // Correct path for login.js
import Create from "./components/create"; // Correct path for create.js
import Profile from "./components/profile"; // Correct path for profile.js
import WaitTimes from "./components/wait"; // Correct path for wait.js
import StudyRooms from "./components/study"; // Correct path for study.js
import Events from "./components/events"; // Correct path for events.js

const App = () => {
    const [user, setUser] = useState(null); // State to track logged-in user

    return (
        <Router>
            {user && <NavBar setUser={setUser} />} {/* Show NavBar if logged in */}
            <Routes>
                {/* Public Routes */}
                <Route
                    path="/"
                    element={user ? <Navigate to="/profile" /> : <Login setUser={setUser} />}
                />
                <Route path="/create" element={<Create />} />

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
            <li>
                <Link to="/profile">Profile</Link>
            </li>
            <li>
                <Link to="/wait-times">Wait Times</Link>
            </li>
            <li>
                <Link to="/study-rooms">Study Rooms</Link>
            </li>
            <li>
                <Link to="/events">Events</Link>
            </li>
            <li>
                <a
                    href="/"
                    onClick={(e) => {
                        e.preventDefault(); // Prevent full page reload
                        sessionStorage.clear(); // Clear user session
                        setUser(null); // Reset user state
                    }}
                >
                    Logout
                </a>
            </li>
        </ul>
    </nav>
);

export default App;
