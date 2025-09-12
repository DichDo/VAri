import { useState, useEffect } from 'react';
import { useUserStore } from '../store/userStore';

interface VerificationStatus {
  verified: boolean;
  score: number;
}

export const useVerification = () => {
  const [status, setStatus] = useState<VerificationStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = useUserStore((state) => state.token);
  const userId = useUserStore((state) => state.id);

  useEffect(() => {
    const fetchStatus = async () => {
      if (!token || !userId) return;

      try {
        // Replace this with your real backend API
        const res = await fetch(`https://api.yourdomain.com/verify/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch verification status');

        const data: VerificationStatus = await res.json();
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
