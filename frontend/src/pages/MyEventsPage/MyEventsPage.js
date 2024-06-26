import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from "../../components/EventList/EventList";
const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

function MyEventsPage() {
  const [userEvents, setUserEvents] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchUserData();
    fetchUserEvents();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUsername(response.data.username);
    } catch (error) {
      console.error('Ошибка при загрузке информации о пользователе:', error);
    }
  };

  const fetchUserEvents = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_URL}/events/my_events/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setUserEvents(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке мероприятий пользователя:', error);
    }
  };

  return (
    <div className="main">
      <h1>| {username}</h1>
      <EventList events={userEvents} />
    </div>
  );
}

export default MyEventsPage;
