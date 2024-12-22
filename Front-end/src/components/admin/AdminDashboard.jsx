import React from 'react';
import ComplaintTable from './ComplaintTable';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
      <ComplaintTable />
    </div>
  );
};

export default AdminDashboard;
