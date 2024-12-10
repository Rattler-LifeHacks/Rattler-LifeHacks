import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Navbar({ onToggle }) {
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle the dropdown
    const [dropdownWidth, setDropdownWidth] = useState(null); // State for dropdown width
    const buttonRef = useRef(null); // Ref for the menu button

    const handleDropdownToggle = () => {
        const newState = !dropdownOpen;
        setDropdownOpen(newState);
        if (onToggle) {
            onToggle(newState); // Notify parent about dropdown state
        }
    };

    useEffect(() => {
        if (buttonRef.current) {
            setDropdownWidth(buttonRef.current.offsetWidth); // Match dropdown width to button
        }
    }, [dropdownOpen]);

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
                justifyContent: "center",
                padding: "5px 0",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            }}
        >
            <button
                ref={buttonRef}
                className="dropdown-toggle"
                onClick={handleDropdownToggle}
                style={{
                    backgroundColor: "#1b5633",
                    border: "1px solid #1b5633",
                    color: "white",
                    fontSize: "16px",
                    padding: "5px 10px",
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
                        position: "absolute",
                        top: "100%",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#1b5633",
                        listStyleType: "none",
                        padding: "10px 0",
                        margin: 0,
                        borderRadius: "5px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        width: `${dropdownWidth}px`,
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
                    <Link
                            to="/logout"
                            style={{
                                backgroundColor: "red",
                                color: "white",
                                border: "none",
                                padding: "5px 10px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                textDecoration: "none",
                                display: "inline-block",
                            }}
                        >
                            Logout
                        </Link>
                        
                    </li>
                </ul>
            )}
        </nav>
    );
}

export default Navbar;

