import React from 'react';
import './SuccessMessage.css';

interface SuccessMessageProps {
  user: {
    id: string;
    email: string;
    name?: string;
  };
  onLogout: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ user, onLogout }) => {
  return (
    <div className="success-message">
      <div className="success-message__content">
        <h2 className="success-message__title">Добро пожаловать!</h2>
        <p className="success-message__text">
          Вы успешно вошли в систему как{' '}
          <span className="success-message__user">{user.name || user.email}</span>
        </p>
        
        <div className="success-message__details">
          <div className="success-message__detail">
            <span className="success-message__label">Email:</span>
            <span className="success-message__value">{user.email}</span>
          </div>
          <div className="success-message__detail">
            <span className="success-message__label">ID пользователя:</span>
            <span className="success-message__value">{user.id}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="success-message__logout"
        >
          Выйти из системы
        </button>
      </div>
    </div>
  );
};
