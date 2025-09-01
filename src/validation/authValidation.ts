import { AuthFormData } from '../types/auth';

export interface ValidationError {
  field: keyof AuthFormData;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

const validateEmail = (email: string): string | null => {
  if (!email) {
    return 'Email обязателен';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Введите корректный email';
  }
  
  return null;
};

const validatePassword = (password: string, isRegistration: boolean = false): string | null => {
  if (!password) {
    return 'Пароль обязателен';
  }
  
  if (password.length < 6) {
    return 'Пароль должен содержать минимум 6 символов';
  }
  
  if (isRegistration) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!passwordRegex.test(password)) {
      return 'Пароль должен содержать хотя бы одну букву, одну заглавную букву и одну цифру';
    }
  }
  
  return null;
};

const validateConfirmPassword = (password: string, confirmPassword: string): string | null => {
  if (!confirmPassword) {
    return 'Подтвердите пароль';
  }
  
  if (password !== confirmPassword) {
    return 'Пароли должны совпадать';
  }
  
  return null;
};

export const validateLoginForm = (data: AuthFormData): ValidationResult => {
  const errors: ValidationError[] = [];

  const emailError = validateEmail(data.email);
  if (emailError) {
    errors.push({ field: 'email', message: emailError });
  }
  
  // Валидация пароля
  const passwordError = validatePassword(data.password);
  if (passwordError) {
    errors.push({ field: 'password', message: passwordError });
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const validateRegisterForm = (data: AuthFormData): ValidationResult => {
  const errors: ValidationError[] = [];

  const emailError = validateEmail(data.email);
  if (emailError) {
    errors.push({ field: 'email', message: emailError });
  }

  const passwordError = validatePassword(data.password, true);
  if (passwordError) {
    errors.push({ field: 'password', message: passwordError });
  }

  if (data.confirmPassword !== undefined) {
    const confirmPasswordError = validateConfirmPassword(data.password, data.confirmPassword);
    if (confirmPasswordError) {
      errors.push({ field: 'confirmPassword', message: confirmPasswordError });
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export const getFieldError = (errors: ValidationError[], field: keyof AuthFormData): string | undefined => {
  const error = errors.find(err => err.field === field);
  return error?.message;
};
