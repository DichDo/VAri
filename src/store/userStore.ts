import { create } from 'zustand';

interface UserState {
  id: string;
  name: string;
  email: string;
  token: string;
  setUser: (id: string, name: string, email: string, token: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  id: '',
  name: '',
  email: '',
  token: '',
  setUser: (id, name, email, token) => set({ id, name, email, token }),
  clearUser: () => set({ id: '', name: '', email: '', token: '' }),
}));
