import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventList from "../../components/EventList/EventList";

function MyEventsPage() {
  const [userEvents, setUserEvents] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    fetchUserData();
    fetchUserEvents();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/auth/me', {
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
      const response = await axios.get('http://127.0.0.1:8000/events/my_events/', {
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
