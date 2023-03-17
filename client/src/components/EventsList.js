import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import EventListItem from "./EventListItem";

function EventsList() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/events`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        setError("An error occurred while fetching events.");
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2>Events</h2>
      {error ? (
        <div>{error}</div>
      ) : (
        <ul>
          {events.map((event) => (
            <EventListItem key={event._id} event={event} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventsList;
