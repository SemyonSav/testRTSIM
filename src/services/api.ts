import axios from 'axios';

const api = axios.create({
  baseURL: 'https://68b4b12145c901678770f354.mockapi.io/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface ApiError {
  message: string;
  code?: string;
}

export const authAPI = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await api.get('/users');
      const users = response.data;

      const user = users.find((u: any) => u.email === credentials.email);

      if (!user) {
        throw new Error('Пользователь с таким email не найден');
      }

      if (user.password !== credentials.password) {
        throw new Error('Неверный пароль');
      }

      return {
        success: true,
        message: 'Успешный вход в систему',
        user: {
          id: user.id,
          email: user.email,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Произошла неизвестная ошибка');
    }
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await api.get('/users');
      const users = response.data;

      const existingUser = users.find((u: any) => u.email === userData.email);
      if (existingUser) {
        throw new Error('Пользователь с таким email уже существует');
      }
      
      if (userData.password !== userData.confirmPassword) {
        throw new Error('Пароли не совпадают');
      }

      const newUser = {
        email: userData.email,
        password: userData.password,
      };

      const createResponse = await api.post('users/', newUser);

      return {
        success: true,
        message: 'Регистрация прошла успешно',
        user: {
          id: createResponse.data.id,
          email: createResponse.data.email,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Произошла неизвестная ошибка');
    }
  },
}

