import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import { loginUser } from '../services/authApi';
import Button from '../components/Button';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const handleLogin = async () => {
    try {
      const res = await loginUser(email, password);
      setUser(res.id, res.name, res.email, res.token);
      localStorage.setItem('token', res.token);
      navigate('/profile'); // Redirect after login
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default LoginPage;
