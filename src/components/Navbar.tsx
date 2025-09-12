import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div className="font-bold text-lg">Vairi</div>
      <div className="space-x-4">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
