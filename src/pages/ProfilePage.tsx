import React, { useState } from 'react';
import { useVerification } from '../hooks/useVerification';
import Modal from '../components/Modal';
import Button from '../components/Button';

const ProfilePage: React.FC = () => {
  const { status, loading, error } = useVerification();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

      {loading && <p>Loading verification status...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {status && (
        <div className="bg-gray-100 p-4 rounded shadow">
          <p><strong>Verified:</strong> {status.verified ? 'Yes' : 'No'}</p>
          <p><strong>Trust Score:</strong> {status.score}</p>
          <Button onClick={() => setIsModalOpen(true)}>View Details</Button>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold">Verification Details</h2>
        <p>Verified: {status?.verified ? 'Yes' : 'No'}</p>
        <p>Trust Score: {status?.score}</p>
        <Button onClick={() => setIsModalOpen(false)}>Close</Button>
      </Modal>
    </div>
  );
};

export default ProfilePage;
