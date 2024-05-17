import React, { useState } from 'react';
import './LoginModal.css';
import axios from 'axios';
import RegisterModal from '../RegisterModal/RegisterModal';

function LoginModal({ setShowModal }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/login/', {
        username,
        password
      });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.access_token);
        setShowModal(false);
        window.location.reload();
      } else {
        setError('Неверное имя пользователя или пароль');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setError('Произошла ошибка при входе');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div className="modal" onClick={handleModalClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Вход</h2>
        {error && <div className="error">{error}</div>}
        <input
          type="text"
          placeholder="Имя пользователя"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleLogin}>Войти</button>
        <p className="register-link" onClick={() => setShowRegisterModal(true)}>Нет аккаунта? Зарегистрироваться</p>
      </div>
      {showRegisterModal && <RegisterModal setShowRegisterModal={setShowRegisterModal} setShowLoginModal={setShowModal} />}
    </div>
  );
}

export default LoginModal;
