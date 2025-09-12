import React, { useState } from 'react';
import { useVerification } from '../hooks/useVerification';
import Modal from '../components/Modal';
import Button from '../components/Button';
import { useUserStore } from '../store/userStore';

const ProfilePage: React.FC = () => {
  const { status, loading, error } = useVerification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useUserStore((state) => ({
    name: state.name,
    email: state.email,
    id: state.id,
  }));

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <div className="bg-gray-100 p-4 rounded shadow mb-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>ID:</strong> {user.id}</p>
      </div>

      {loading && <p>Loading verification status...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {status && (
        <div className="bg-gray-100 p-4 rounded shadow mb-4">
          <p><strong>Verified:</strong> {status.verified ? 'Yes' : 'No'}</p>
          <p><strong>Trust Score:</strong> {status.score}</p>
          <Button onClick={() => setIsModalOpen(true)}>View Verification Details</Button>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-2">Verification Details</h2>
        <p><strong>User ID:</strong> {user.id}</p>
        <p><strong>Verified:</strong> {status?.verified ? 'Yes' : 'No'}</p>
        <p><strong>Trust Score:</strong> {status?.score}</p>
        <Button onClick={() => setIsModalOpen(false)}>Close</Button>
      </Modal>
    </div>
  );
};

export default ProfilePage;
