import React, { useState } from 'react';
import Modal from '../components/Modal';

const ProfilePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">User Profile</h1>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Open Modal
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold">Modal Title</h2>
        <p>This is the modal content.</p>
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => setIsModalOpen(false)}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default ProfilePage;
