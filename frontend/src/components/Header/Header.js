import React, { useState } from 'react';
import './Header.css';
import LoginModal from '../LoginModal/LoginModal';
import { Link } from 'react-router-dom';

function Header() {
  const [showModal, setShowModal] = useState(false);
  const isLoggedIn = localStorage.getItem('token');

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <header>
      <Link to="/" className="logo">Events | nFactorial</Link>
      {isLoggedIn ? (
        <div className="login-button" onClick={handleLogout}>Выход</div>
      ) : (
        <div className="login-button" onClick={toggleModal}>Вход</div>
      )}
      {showModal && <LoginModal setShowModal={setShowModal} />}
    </header>
  );
}

export default Header;
