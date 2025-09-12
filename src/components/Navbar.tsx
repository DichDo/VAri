import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/userStore';
import Button from './Button';

const Navbar: React.FC = () => {
  const token = useUserStore((state) => state.token);
  const clearUser = useUserStore((state) => state.clearUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-200 p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">VAri</Link>
      {token ? (
        <Button onClick={handleLogout}>Logout</Button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
