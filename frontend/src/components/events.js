import React, { useEffect, useState } from "react";
import axios from "axios";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [newEvent, setNewEvent] = useState({ title: "", date: "" });

    useEffect(() => {
        axios
            .get("http:localhost:8080/api/events/")
            .then((response) => setEvents(response.data.data))
            .catch((error) => console.error(error));
    }, []);

    const createEventHandler = async () => {
        try {
            const response = await axios.post("/api/events/create", newEvent);
            if (response.data.success) {
                alert("Event created successfully");
                setEvents([...events, response.data.data]);
            } else {
                alert("Failed to create event");
            }
        } catch (error) {
            console.error(error);
            alert("Error creating event");
        }
    };

    return (
        <div>
            <h1>Events</h1>
            <ul>
                {events.map((event) => (
                    <li key={event.eventId}>{event.title}</li>
                ))}
            </ul>
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
    );
};

export default Events;
