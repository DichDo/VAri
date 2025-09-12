import React from 'react';
import Navbar from '../components/Navbar';

const HomePage: React.FC = () => (
  <>
    <Navbar />
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to Vairi</h1>
      <p>Verify your identity and trust scores here.</p>
    </div>
  </>
);

export default HomePage;
