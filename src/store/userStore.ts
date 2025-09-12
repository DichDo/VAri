import { create } from 'zustand';

interface UserState {
  id: string;
  name: string;
  email: string;
  setUser: (id: string, name: string, email: string) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  id: '',
  name: '',
  email: '',
  setUser: (id, name, email) => set({ id, name, email }),
  clearUser: () => set({ id: '', name: '', email: '' }),
}));
