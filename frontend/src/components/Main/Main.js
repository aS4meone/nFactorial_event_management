// Main.js

import React, {useState, useEffect} from 'react';
import EventList from '../EventList/EventList';
import './Main.css'
import axios from 'axios';
import {Link} from "react-router-dom";

function Main() {
    const [events, setEvents] = useState([]);
    const [registeredEventsCount, setRegisteredEventsCount] = useState(0);

    useEffect(() => {
        fetchEvents();
        if (localStorage.getItem('token')) {
            fetchRegisteredEventsCount();
        }
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8080/events/');
            setEvents(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке мероприятий:', error);
        }
    };

    const fetchRegisteredEventsCount = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8080/events/my_events/count', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            setRegisteredEventsCount(response.data);
        } catch (error) {
            console.error('Ошибка при загрузке количества зарегистрированных мероприятий:', error);
        }
    };


    return (
        <div className="main">
            <h1>| КОНЦЕРТЫ</h1>
            {registeredEventsCount > 0 && (
                <div className="userEvents">
                    <span>Вы зарегистрированы на {registeredEventsCount} мероприятий.</span>
                    <Link className={"watchButton"} to="/my_events">Просмотреть</Link>
                </div>
            )}
            <EventList events={events}/>
        </div>
    );
}

export default Main;
