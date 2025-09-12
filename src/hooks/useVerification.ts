import { useState, useEffect } from 'react';
import { fetchVerificationStatus } from '../services/mockApi';

interface VerificationStatus {
  verified: boolean;
  score: number;
}

const useVerification = (userId: string) => {
  const [status, setStatus] = useState<VerificationStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await fetchVerificationStatus(userId);
        setStatus(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [userId]);

  return { status, loading, error };
};

export default useVerification;
