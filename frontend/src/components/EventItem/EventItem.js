import React from 'react';
import {Link} from 'react-router-dom';
import './EventItem.css';
import calendarIcon from './Tilda_Icons_1ed_cale.svg';
import locationIcon from './Tilda_Icons_1ed_loca.svg';

function EventItem({event}) {
    const {id, name, location, time} = event;
    const eventDate = new Date(time);
    const formattedDate = eventDate.toLocaleDateString();
    const formattedTime = eventDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    return (
        <Link to={`/events/${id}`} style={{textDecoration: 'none', color: '#fff'}}>
            <div className="event-item">
                <div className="event-details">
                    <div className="date-location">
                        <div className="icon-text">
                            <img src={calendarIcon} alt="calendar" className="icon"/>
                            <p className="event-date-time red">{formattedDate}, {formattedTime}</p>
                        </div>
                        <div className="icon-text">
                            <img src={locationIcon} alt="location" className="icon"/>
                            <p className="event-location">{location}</p>
                        </div>
                    </div>
                    <h2 className="event-name">{name}</h2>
                </div>
            </div>
        </Link>

    );
}

export default EventItem;
