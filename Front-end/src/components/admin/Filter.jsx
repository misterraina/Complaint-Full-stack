import React, { useState } from 'react';

export const Filter = ({ onFilter }) => {
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  const handleFilterChange = () => {
    onFilter(status, priority);
  };

  return (
    <div className="mb-4 flex gap-4">
      <div>
        <label>Status</label>
        <select 
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      <div>
        <label>Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <button
        onClick={handleFilterChange}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Filter
      </button>
    </div>
  );
};
