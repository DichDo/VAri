import { create } from 'zustand';

interface UserState {
  id: string;
  name: string;
  email: string;
  token: string;
  setUser: (id: string, name: string, email: string, token: string) => void;
  clearUser: () => void;
  restoreUserFromStorage: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  id: '',
  name: '',
  email: '',
  token: '',
  setUser: (id, name, email, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    set({ id, name, email, token });
  },
  clearUser: () => {
    localStorage.clear();
    set({ id: '', name: '', email: '', token: '' });
  },
  restoreUserFromStorage: () => {
    const token = localStorage.getItem('token') || '';
    const id = localStorage.getItem('id') || '';
    const name = localStorage.getItem('name') || '';
    const email = localStorage.getItem('email') || '';
    if (token) set({ id, name, email, token });
  },
}));
