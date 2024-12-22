import React from 'react';

export const ComplaintDetailsModal = ({ complaint, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-1/3">
        <h2 className="text-2xl font-bold mb-4">Complaint Details</h2>
        <p><strong>Title:</strong> {complaint.title}</p>
        <p><strong>Category:</strong> {complaint.category}</p>
        <p><strong>Description:</strong> {complaint.description}</p>
        <p><strong>Priority:</strong> {complaint.priority}</p>
        <p><strong>Date Submitted:</strong> {new Date(complaint.dateSubmitted).toLocaleDateString()}</p>
        <p><strong>Status:</strong> {complaint.status}</p>

        <button 
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};
