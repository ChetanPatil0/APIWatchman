import { create } from 'zustand';
import api from '../utils/api';

const TOKEN_STORAGE_KEY = 'myapp-apiwatch-v1-2026';

const getStoredToken = () => localStorage.getItem(TOKEN_STORAGE_KEY) || null;

const saveToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  }
};

const removeToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

const parseUserFromToken = (token) => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      email: payload.email,
      userId: payload.userId,
    };
  } catch (err) {
    removeToken();
    return null;
  }
};

const useAuthStore = create((set, get) => ({
  token: getStoredToken(),
  user: parseUserFromToken(getStoredToken()),
  isAuthenticated: !!getStoredToken(),

  login: async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { token } = res.data;

      if (!token) throw new Error('No token received from server');

      saveToken(token);
      const user = parseUserFromToken(token);

      set({
        token,
        user,
        isAuthenticated: true,
      });

      return user;
    } catch (err) {
      console.error('Login failed:', err);
      throw err;
    }
  },

  register: async (email, password) => {
    try {
      const res = await api.post('/auth/register', { email, password });
      const { token } = res.data;

      if (!token) throw new Error('No token received from server');

      saveToken(token);
      const user = parseUserFromToken(token);

      set({
        token,
        user,
        isAuthenticated: true,
      });

      return user;
    } catch (err) {
      console.error('Register failed:', err);
      throw err;
    }
  },

  logout: () => {
    removeToken();
    set({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  },

  hydrateAuth: () => {
    const token = getStoredToken();
    const user = parseUserFromToken(token);
    set({
      token,
      user,
      isAuthenticated: !!token && !!user,
    });
  },
}));

useAuthStore.getState().hydrateAuth();

export default useAuthStore;