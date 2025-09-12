import { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';
import { fetchVerificationStatus } from '../services/mockBackend';

export const useVerification = () => {
  const [status, setStatus] = useState<{ verified: boolean; score: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = useUserStore((state) => state.token);
  const userId = useUserStore((state) => state.id);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!token || !userId) return;
      try {
        const data = await fetchVerificationStatus(userId, token);
        setStatus(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, [token, userId]);

  return { status, loading, error };
};
import { useUserStore } from "../store/userStore"

export function useAuth() {
  const { user, token, setUser, setToken, logout } = useUserStore()

  return {
    isAuthenticated: !!token,
    user,
    token,
    setUser,
    setToken,
    logout
  }
}
