import React from 'react';
import './FormField.css';

interface FormFieldProps {
  label: string;
  type: 'text' | 'email' | 'password';
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required = false,
}) => {
  return (
    <div className="form-field">
      <label htmlFor={name} className="form-field__label">
        {label}
        {required && <span className="form-field__required">*</span>}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`form-field__input ${error ? 'form-field__input--error' : ''}`}
        required={required}
      />
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
};
