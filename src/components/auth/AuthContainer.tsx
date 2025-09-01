import React, { useState } from 'react';
import { AuthForm } from './AuthForm';
import { SuccessMessage } from './SuccessMessage';
import { AuthMode, AuthFormData } from '../../types/auth';
import { useAuthState } from '../../hooks/useAuthState';
import './AuthContainer.css';

export const AuthContainer: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const { 
    user, 
    isAuthenticated, 
    isLoading, 
    error, 
    login, 
    register, 
    logout, 
    clearError 
  } = useAuthState();

  const handleModeToggle = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    clearError();
  };

  const handleSubmit = async (data: AuthFormData) => {
    if (mode === 'login') {
      await login(data);
    } else {
      await register(data);
    }
  };

  const isLoginMode = mode === 'login';

  if (isAuthenticated && user) {
    return (
      <div className="auth-container">
        <div className="auth-container__card">
          <SuccessMessage user={user} onLogout={logout} />
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-container__card">
        <AuthForm
          mode={mode}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
        />
        
        <div className="auth-container__footer">
          <p className="auth-container__text">
            {isLoginMode ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
          </p>
          <button
            type="button"
            onClick={handleModeToggle}
            className="auth-container__toggle"
            disabled={isLoading}
          >
            {isLoginMode ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </div>

      </div>
    </div>
  );
};
