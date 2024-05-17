import React, { useState } from 'react';
import './RegisterModal.css';
import axios from 'axios';

function RegisterModal({ setShowRegisterModal, setShowLoginModal }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8080/auth/register/', {
        username,
        password
      });
      if (response.status === 200) {
        const loginResponse = await axios.post('http://127.0.0.1:8080/auth/login/', {
          username,
          password
        });
        if (loginResponse.status === 200) {
          localStorage.setItem('token', loginResponse.data.access_token);
          setShowRegisterModal(false);
          window.location.reload();
        }
      } else {
        setError('Произошла ошибка при регистрации');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      setError('Произошла ошибка при регистрации');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegister();
    }
  };

  const handleModalClose = () => {
    setShowRegisterModal(false);
  };

  return (
    <div className="modal" onClick={handleModalClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Регистрация</h2>
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
        <button onClick={handleRegister}>Зарегистрироваться</button>
        <p className="login-link" onClick={() => { setShowRegisterModal(false); setShowLoginModal(true); }}>Уже есть аккаунт? Войти</p>
      </div>
    </div>
  );
}

export default RegisterModal;
