import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/login"; // Correct path for login.js
import Create from "./components/create"; // Correct path for create.js
import Profile from "./components/profile"; // Correct path for profile.js
import WaitTimes from "./components/wait"; // Correct path for wait.js
import StudyRooms from "./components/study"; // Correct path for study.js
import Events from "./components/events"; // Correct path for events.js
import Navbar from "./components/navbar"; // Correct path for navbar.js

const App = () => {
    const [user, setUser] = useState(null); // State to track logged-in user

    return (
        <Router>
            {user && <Navbar />} {/* Show Navbar only when logged in */}
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

export default App;
