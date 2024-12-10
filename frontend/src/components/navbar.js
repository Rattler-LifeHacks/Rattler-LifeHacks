import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar({ onToggle }) {
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle the dropdown

    const handleDropdownToggle = () => {
        const newState = !dropdownOpen;
        setDropdownOpen(newState);
        if (onToggle) {
            onToggle(newState); // Notify the parent about the expanded/collapsed state
        }
    };

    useEffect(() => {
        // Notify the parent about the initial state of the dropdown
        if (onToggle) {
            onToggle(dropdownOpen);
        }
    }, [dropdownOpen, onToggle]);

    return (
        <nav
            className="dropdown-nav"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                backgroundColor: "#1b5633",
                zIndex: 1000,
                display: "flex",
                justifyContent: "center", // Center the menu button horizontally
                padding: "5px 0", // Reduced padding to make the navbar thinner
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
        >
            <button
                className="dropdown-toggle"
                onClick={handleDropdownToggle}
                style={{
                    backgroundColor: "#1b5633",
                    border: "1px solid #1b5633",
                    color: "white",
                    fontSize: "16px", // Reduced font size to make it more compact
                    padding: "5px 10px", // Reduced padding to make the button smaller
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Menu
            </button>
            {dropdownOpen && (
                <ul
                    className="dropdown-menu"
                    style={{
                        position: "absolute", // Place the dropdown menu relative to the button
                        top: "100%", // Position it below the button
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#1b5633",
                        listStyleType: "none",
                        padding: "5px", // Reduced padding for a thinner menu
                        margin: 0,
                        borderRadius: "5px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        width: "200px", // Adjust width as needed
                        textAlign: "center",
                    }}
                >
                    <li style={{ marginBottom: "10px" }}>
                        <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>
                            Profile
                        </Link>
                    </li>
                    <li style={{ marginBottom: "10px" }}>
                        <Link to="/wait-times" style={{ color: "white", textDecoration: "none" }}>
                            Wait Times
                        </Link>
                    </li>
                    <li style={{ marginBottom: "10px" }}>
                        <Link to="/study-rooms" style={{ color: "white", textDecoration: "none" }}>
                            Study Rooms
                        </Link>
                    </li>
                    <li style={{ marginBottom: "10px" }}>
                        <Link to="/events" style={{ color: "white", textDecoration: "none" }}>
                            Events
                        </Link>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                sessionStorage.clear();
                                // Notify parent or handle logout logic here
                            }}
                            style={{
                                backgroundColor: "red",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                borderRadius: "5px",
                                cursor: "pointer",
                            }}
                        >
                            Logout
                        </button>
                    </li>
                </ul>
            )}
        </nav>
    );
}

export default Navbar;
