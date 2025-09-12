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
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-200 p-4 flex justify-between items-center">
      <div>
        <Link to="/" className="font-bold text-lg">VAri</Link>
      </div>
      <div>
        {token ? (
          <Button onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
            Logout
          </Button>
        ) : (
          <Link to="/login" className="font-semibold">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
