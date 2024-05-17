import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import './EventDetails.css';
import LoginModal from "../../components/LoginModal/LoginModal";

function EventDetails() {
    const {id} = useParams();
    const [event, setEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token'));
    const [reservationStatus, setReservationStatus] = useState(null);
    const [alreadyRegistered, setAlreadyRegistered] = useState(false);
    const [calendarLink, setCalendarLink] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/events/${id}`);
                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching event details:', error);
            }
        };

        fetchEventDetails();
    }, [id]);

    useEffect(() => {
        const fetchCalendarLink = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/events/${id}/calendar_link`);
                setCalendarLink(response.data.calendar_link);
            } catch (error) {
                console.error('Error fetching calendar link:', error);
            }
        };

        fetchCalendarLink();
    }, [id]);

    const handleReservation = async () => {
        if (!isLoggedIn) {
            setShowModal(true);
        } else {
            try {
                const response = await axios.post(`http://127.0.0.1:8000/events/register/${id}/`, {}, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Accept': 'application/json'
                    }
                });
                setReservationStatus('success');
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    setAlreadyRegistered(true);
                } else {
                    console.error('Error reserving ticket:', error);
                    setReservationStatus('error');
                }
            }
        }
    };

    if (!event) {
        return <div className="loading">Loading...</div>;
    }

    const {name, location, time, description, image_url, users, tickets} = event;
    const eventDate = new Date(time);
    const formattedDate = eventDate.toLocaleDateString();
    const formattedTime = eventDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    return (
        <div className="event-details-container">
            <img className="event-image" src={image_url} alt="Event"/>
            <div className="event-info">
                <h2 className="event-name">{name}</h2>

                <p className="event-location">{location}</p>
                <p className="event-time">{formattedDate} {formattedTime}</p>
                <p className="event-description">{description}</p>
                <p>Доступно {tickets} билетов.</p>
                <p className="event-users">{users.length} человек уже забронировало билеты!</p>
                <button className="reserve-button" onClick={handleReservation}>Забронировать билет</button>
                {reservationStatus === 'success' && <p className="reservation-success">Билет успешно забронирован!</p>}
                {reservationStatus === 'error' && <p className="reservation-error">Ошибка при бронировании билета.</p>}
                {alreadyRegistered && <p className="already-registered">Вы уже зарегистрированы на это мероприятие.</p>}
                {calendarLink && (
                    <a className="add-to-calendar" href={calendarLink} target="_blank" rel="noopener noreferrer">
                        Добавить в Google Calendar
                    </a>
                )}
            </div>
            {showModal && <LoginModal setIsLoggedIn={setIsLoggedIn} setShowModal={setShowModal}/>}
        </div>
    );
}

export default EventDetails;
