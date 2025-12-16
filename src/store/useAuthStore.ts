import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
  login: (userId: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
  userId: localStorage.getItem('userId'),
  login: (userId: string) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userId', userId);
    set({ isLoggedIn: true, userId });
  },
  logout: () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userId');
    set({ isLoggedIn: false, userId: null });
  },
}));
