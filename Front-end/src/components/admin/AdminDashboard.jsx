import React from 'react';
import ComplaintTable from './ComplaintTable';
import { useAuth } from "../../AuthContext"; 

const AdminDashboard = () => {
  const { logout } = useAuth(); // Destructure logout function from the auth context

  // Handle logout
  const handleLogout = () => {
    logout(); // Call the logout function from context
  };

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
      <ComplaintTable />
      <button 
        onClick={handleLogout} 
        className="mt-6 px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
