import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Profile from "./components/Profile";
import WaitTimes from "./components/WaitTimes";
import StudyRooms from "./components/StudyRooms";
import Events from "./components/Events";

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
        <a href="/profile">Profile</a>
        <a href="/wait-times">Wait Times</a>
        <a href="/study-rooms">Study Rooms</a>
        <a href="/events">Events</a>
        <a href="/" onClick={() => sessionStorage.clear()}>Logout</a>
    </nav>
);

export default App;
