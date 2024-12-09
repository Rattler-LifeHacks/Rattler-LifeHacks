import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



function Navbar() {

    const [newUsername, setNewUsername] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle the dropdown


    return(
        <>
        <nav className="dropdown-nav">
        <button
            className="dropdown-toggle"
            onClick={() => setDropdownOpen(!dropdownOpen)}
        >
            Menu
        </button>
        {dropdownOpen && (
            <ul className="dropdown-menu">
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/wait-times">Wait Times</Link></li>
                <li><Link to="/study-rooms">Study Rooms</Link></li>
                <li><Link to="/events">Events</Link></li>
                <li>
                    <button
                        onClick={() => {
                            sessionStorage.clear();
                            //setUser(null);
                        }}
                    >
                        Logout
                    </button>
                </li>
            </ul>
        )}
    </nav>

        </>);
}

export default Navbar;