import React from 'react';
import './PasswordRequirements.css';

interface PasswordRequirementsProps {
  password: string;
}

export const PasswordRequirements: React.FC<PasswordRequirementsProps> = ({ password }) => {
  const requirements = [
    {
      id: 'length',
      text: 'Минимум 6 символов',
      met: password.length >= 6,
    },
    {
      id: 'lowercase',
      text: 'Хотя бы одна строчная буква',
      met: /[a-z]/.test(password),
    },
    {
      id: 'uppercase',
      text: 'Хотя бы одна заглавная буква',
      met: /[A-Z]/.test(password),
    },
    {
      id: 'number',
      text: 'Хотя бы одна цифра',
      met: /\d/.test(password),
    },
  ];

  const allMet = requirements.every(req => req.met);

  return (
    <div className="password-requirements">
      <h4 className="password-requirements__title">Требования к паролю:</h4>
      <ul className="password-requirements__list">
        {requirements.map(req => (
          <li
            key={req.id}
            className={`password-requirements__item ${
              req.met ? 'password-requirements__item--met' : ''
            }`}
          >
            <span className="password-requirements__icon">
              {req.met ? '✓' : '○'}
            </span>
            {req.text}
          </li>
        ))}
      </ul>
      {allMet && password.length > 0 && (
        <div className="password-requirements__success">
          Пароль соответствует всем требованиям!
        </div>
      )}
    </div>
  );
};
