import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { validateToken } from '../services/auth';

export default function Protected({ children }: { children: JSX.Element }) {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const valid = await validateToken();
      setIsValid(valid);
    };
    checkToken();
  }, []);

  if (isValid === null) return <div>Loading...</div>; // while checking token
  if (!isValid) return <Navigate to="/login" replace />; // redirect if invalid

  return children; // render protected content if valid
}
