import React, { useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: "", date: "" });

    // Fetch events from the backend
    useEffect(() => {
        axios
            .get("/api/events/") // Ensure the correct endpoint matches the backend
            .then((response) => {
                if (response.data.success) {
                    setEvents(response.data.data || []); // Update state with events or empty array
                } else {
                    console.error("Error fetching events:", response.data.message);
                }
            })
            .catch((error) => console.error("Error fetching events:", error));
    }, []);

    // Create a new event
    const createEventHandler = async () => {
        if (!newEvent.title.trim() || !newEvent.date.trim()) {
            alert("Both title and date are required to create an event.");
            return;
        }

        try {
            const response = await axios.post("/api/events/create", newEvent);
            if (response.data.success) {
                alert("Event created successfully!");
                setEvents([...events, response.data.data]); // Add the newly created event to the list
                setNewEvent({ title: "", date: "" }); // Reset the input fields
            } else {
                alert(response.data.message || "Failed to create event.");
            }
        } catch (error) {
            console.error("Error creating event:", error);
            alert("Error creating event. Please try again.");
        }
    };

    return (
        <div className="events-container">
            {/* Banner */}
            <div className="banner">
                <h1>Upcoming Events</h1>
            </div>

            {/* Events List */}
            <div className="events-list">
                {events.length > 0 ? (
                    <ul>
                        {events.map((event) => (
                            <li key={event.eventId}>
                                <strong>{event.title}</strong> -{" "}
                                {new Date(event.date).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No upcoming events available.</p>
                )}
            </div>

            {/* Event Creation Form */}
            <div className="event-creation">
                <h2>Create New Event</h2>
                <input
                    type="text"
                    placeholder="Event Title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                />
                <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
                <button onClick={createEventHandler}>Create Event</button>
            </div>
        </div>
    );
};

export default Events;
