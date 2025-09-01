import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../common/Button';
import { PasswordRequirements } from './PasswordRequirements';
import { AuthFormProps, AuthFormData } from '../../types/auth';
import { validateLoginForm, validateRegisterForm, getFieldError, ValidationError } from '../../validation/authValidation';
import './AuthForm.css';
import '../common/FormField.css';

export const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onSubmit,
  isLoading = false,
  error,
}) => {
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>([]);
  
  const {
    register,
    handleSubmit,
    watch,
  } = useForm<AuthFormData>({
    mode: 'onChange',
  });

  const password = watch('password');
  const email = watch('email');
  const confirmPassword = watch('confirmPassword');

  useEffect(() => {
    const validateForm = async () => {
      const formData = { email, password, confirmPassword };
      const validation = mode === 'login' 
        ? validateLoginForm(formData)
        : validateRegisterForm(formData);
      
      setValidationErrors(validation.errors);
    };

    if (email || password || confirmPassword) {
      validateForm();
    }
  }, [email, password, confirmPassword, mode]);

  const handleFormSubmit = async (data: AuthFormData) => {
    const validation = mode === 'login' 
      ? validateLoginForm(data)
      : validateRegisterForm(data);
    
    if (validation.isValid) {
      onSubmit(data);
    } else {
      setValidationErrors(validation.errors);
    }
  };

  const isLoginMode = mode === 'login';
  const title = isLoginMode ? 'Вход в систему' : 'Регистрация';
  const submitText = isLoginMode ? 'Войти' : 'Зарегистрироваться';

  return (
    <div className="auth-form">
      <div className="auth-form__header">
        <h2 className="auth-form__title">{title}</h2>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="auth-form__content">
        {error && (
          <div className="auth-form__error">
            {error}
          </div>
        )}

        <div className="form-field">
          <label htmlFor="email" className="form-field__label">
            Email<span className="form-field__required">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="Введите ваш email"
            className={`form-field__input ${getFieldError(validationErrors, 'email') ? 'form-field__input--error' : ''}`}
          />
          {getFieldError(validationErrors, 'email') && (
            <span className="form-field__error">{getFieldError(validationErrors, 'email')}</span>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="password" className="form-field__label">
            Пароль<span className="form-field__required">*</span>
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            placeholder="Введите пароль"
            className={`form-field__input ${getFieldError(validationErrors, 'password') ? 'form-field__input--error' : ''}`}
          />
          {getFieldError(validationErrors, 'password') && isLoginMode && (
            <span className="form-field__error">{getFieldError(validationErrors, 'password')}</span>
          )}
        </div>

        {!isLoginMode && password && (
          <PasswordRequirements password={password} />
        )}

        {!isLoginMode && (
          <div className="form-field">
            <label htmlFor="confirmPassword" className="form-field__label">
              Подтверждение пароля<span className="form-field__required">*</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              placeholder="Подтвердите пароль"
              className={`form-field__input ${getFieldError(validationErrors, 'confirmPassword') ? 'form-field__input--error' : ''}`}
            />
            {getFieldError(validationErrors, 'confirmPassword') && (
              <span className="form-field__error">{getFieldError(validationErrors, 'confirmPassword')}</span>
            )}
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="large"
          loading={isLoading}
          disabled={validationErrors.length > 0}
          className="auth-form__submit"
        >
          {submitText}
        </Button>
      </form>
    </div>
  );
};
