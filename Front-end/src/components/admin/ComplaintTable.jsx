import React, { useEffect, useState } from 'react';
import { ComplaintDetailsModal } from './ComplaintTableModal';
import { Filter } from './Filter';
import Cookies from 'js-cookie';  // Import to access cookies for authentication

const ComplaintTable = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch all complaints from the server with authentication token
    const fetchComplaints = async () => {
      const token = Cookies.get('token'); // Get the token from cookies (if it's saved)
      
      if (!token) {
        console.log('No token found. User is not authenticated.');
        return;  // You can redirect the user to login or show an error
      }

      const response = await fetch('http://localhost:5000/complaints', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,  // Include token in the Authorization header
        },
      });

      if (response.ok) {
        const data = await response.json();
        setComplaints(data);
        setFilteredComplaints(data);
      } else {
        console.log('Failed to fetch complaints:', response.status);
        // Handle authentication error (e.g., redirect to login)
      }
    };

    fetchComplaints();
  }, []);

  // Update status of the complaint
  const handleStatusChange = async (complaintId, status) => {
    const token = Cookies.get('token'); // Get the token from cookies
    const response = await fetch(`http://localhost:5000/complaints/${complaintId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,  // Include token for the PUT request
      },
      body: JSON.stringify({ status }),
    });

    if (response.ok) {
      const updatedComplaints = complaints.map(complaint => 
        complaint._id === complaintId ? { ...complaint, status } : complaint
      );
      setComplaints(updatedComplaints);
      setFilteredComplaints(updatedComplaints);  // Update filtered complaints as well
    } else {
      console.log('Failed to update status:', response.status);
      // Handle error if needed
    }
  };

  // Filter complaints by status or priority
  const handleFilter = (status, priority) => {
    let filtered = complaints;
    if (status) filtered = filtered.filter(complaint => complaint.status === status);
    if (priority) filtered = filtered.filter(complaint => complaint.priority === priority);
    setFilteredComplaints(filtered);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      {/* Filter Component */}
      <Filter onFilter={handleFilter} />

      <table className="min-w-full bg-white rounded-lg shadow-md mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Priority</th>
            <th className="px-4 py-2">Date Submitted</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredComplaints.map(complaint => (
            <tr key={complaint._id} className="border-t">
              <td className="px-4 py-2">{complaint.title}</td>
              <td className="px-4 py-2">{complaint.category}</td>
              <td className="px-4 py-2">{complaint.priority}</td>
              <td className="px-4 py-2">{new Date(complaint.dateSubmitted).toLocaleDateString()}</td>
              <td className="px-4 py-2">
                <select
                  value={complaint.status}
                  onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
                  className="p-1 border rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </td>
              <td className="px-4 py-2">
                <button
                  onClick={() => {
                    setSelectedComplaint(complaint);
                    setIsModalOpen(true);
                  }}
                  className="mr-2 px-2 py-1 bg-blue-500 text-white rounded-lg"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <ComplaintDetailsModal 
          complaint={selectedComplaint} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default ComplaintTable;
