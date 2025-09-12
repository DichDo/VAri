import React from 'react';

const HomePage: React.FC = () => (
  <div className="p-6 max-w-md mx-auto">
    <h1 className="text-2xl font-bold mb-4">Welcome to VAri</h1>
    <p>This is the public home page. Please login to access your profile.</p>
  </div>
);

export default HomePage;
import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div>
      <h1>Welcome to Vairi</h1>
      <p>
        <Link to="/login">Login</Link> or <Link to="/profile">Profile</Link>
      </p>
    </div>
  )
}
