import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login";
import Profile from "./components/profile";
import WaitTimes from "./components/wait";
import StudyRooms from "./components/study";
import Events from "./components/events";

import { Link } from "react-router-dom";

const App = () => {
    const [user, setUser] = useState(null); // Logged-in user state

    return (
        <Router>
            {user && <NavBar />} {/* Show the nav bar only if the user is logged in */}
            <Routes>
                <Route
                    path="/"
                    element={user ? <Navigate to="/profile" /> : <Login setUser={setUser} />}
                />
                <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
                <Route path="/wait-times" element={<WaitTimes />} />
                <Route path="/study-rooms" element={<StudyRooms />} />
                <Route path="/events" element={<Events />} />
            </Routes>
        </Router>
    );
};

const NavBar = () => (
    <nav>
        <Link to="/profile">Profile</Link>
        <Link to="/wait-times">Wait Times</Link>
        <Link to="/study-rooms">Study Rooms</Link>
        <Link to="/events">Events</Link>
        <Link to="/" onClick={() => sessionStorage.clear()}>Logout</Link>
    </nav>
);

export default App;
