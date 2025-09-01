export interface AuthFormData {
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface AuthFormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export type AuthMode = 'login' | 'register';

export interface AuthFormProps {
  mode: AuthMode;
  onSubmit: (data: AuthFormData) => void;
  isLoading?: boolean;
  error?: string;
}
