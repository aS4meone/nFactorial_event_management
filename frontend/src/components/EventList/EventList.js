import React from 'react';
import EventItem from '../EventItem/EventItem';
import './EventList.css';

function EventList({ events }) {
  return (
    <div className="event-list">
      {events.map(event => (
        <EventItem key={event.id} event={event} />
      ))}
    </div>
  );
}

export default EventList;
