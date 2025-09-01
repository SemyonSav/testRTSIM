import { useState, useCallback } from 'react';
import { authAPI } from '../services/api';
import { AuthFormData } from '../types/auth';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

interface UseAuthStateReturn extends AuthState {
  isLoading: boolean;
  error: string;
  login: (data: AuthFormData) => Promise<void>;
  register: (data: AuthFormData) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthState = (): UseAuthStateReturn => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const clearError = useCallback(() => {
    setError('');
  }, []);

  const login = useCallback(async (data: AuthFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await authAPI.login({
        email: data.email,
        password: data.password,
      });

      if (response.success && response.user) {
        
        setAuthState({
          user: response.user,
          isAuthenticated: true,
        });

        localStorage.setItem('user', JSON.stringify(response.user));
      } else {
        throw new Error('Неверный ответ от сервера');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка при входе';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (data: AuthFormData) => {
    setIsLoading(true);
    setError('');

    try {
      if (!data.confirmPassword) {
        throw new Error('Подтверждение пароля обязательно');
      }

      const response = await authAPI.register({
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      });

      if (response.success && response.user) {
        setAuthState({
          user: response.user,
          isAuthenticated: true,
        });

        localStorage.setItem('user', JSON.stringify(response.user));

      } else {
        throw new Error('Неверный ответ от сервера');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Произошла ошибка при регистрации';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });

    localStorage.removeItem('user');
  }, []);

  return {
    ...authState,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError,
  };
};
