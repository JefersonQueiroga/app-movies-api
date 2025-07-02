import { Platform } from 'react-native';

const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3000/api'; // Emulador Android
  }
  return 'http://localhost:3000/api'; // iOS Simulator
};

const BASE_URL =getBaseUrl();

interface CadastroData {
  nome: string;
  email: string;
  senha: string;
}

interface LoginData {
  email: string;
  senha: string;
}

class AuthService {
  async cadastrar(userData: CadastroData) {
    try {
      const response = await fetch(`${BASE_URL}/usuarios/cadastro`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro no cadastro');
      }

      return data;
    } catch (error: any) {
      throw error;
    }
  }

  async login(credentials: LoginData) {
    try {
      const response = await fetch(`${BASE_URL}/usuarios/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro no login');
      }

      return data;
    } catch (error: any) {
      throw error;
    }
  }
}

export const authService = new AuthService();