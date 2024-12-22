import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useAuth } from "../AuthContext"; // Import the useAuth hook
import ComplaintForm from "../components/ComplaintForm";

const UserDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const { logout, user } = useAuth(); // Destructure the logout function and user from context

  // Fetch complaints on component mount
  useEffect(() => {
    const fetchComplaints = async () => {
      const token = Cookies.get("token");
      if (!token) return;

      try {
        const response = await fetch("https://complaint-full-stack.vercel.app/complaints", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setComplaints(data);
        } else {
          console.error("Failed to fetch complaints.");
        }
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchComplaints();
  }, []);

  // Handle logout
  const handleLogout = () => {
    logout();  // Call the logout function from context
  };

  // Delete a complaint
  const handleDelete = async (id) => {
    const token = Cookies.get("token");
    if (!token) return;

    try {
      const response = await fetch(`https://complaint-full-stack.vercel.app/complaints/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setComplaints((prev) => prev.filter((complaint) => complaint._id !== id));
        alert("Complaint deleted successfully!");
      } else {
        alert("Failed to delete complaint.");
      }
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  // Open edit form for a selected complaint
  const handleEdit = (complaint) => {
    setSelectedComplaint(complaint);
    setIsEditing(true);
  };

  // Handle submission of an updated or new complaint
  const handleSubmit = async (formData) => {
    const token = Cookies.get("token");
    if (!token) return;

    try {
      // Include the `_id` field only during editing
      const updatedFormData = isEditing ? { ...formData, _id: selectedComplaint._id } : formData;

      const url = isEditing
        ? `https://complaint-full-stack.vercel.app/complaints/${selectedComplaint._id}`
        : "https://complaint-full-stack.vercel.app/complaints";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        const updatedComplaint = await response.json();

        if (isEditing) {
          setComplaints((prev) =>
            prev.map((comp) => (comp._id === updatedComplaint._id ? updatedComplaint : comp))
          );
        } else {
          setComplaints((prev) => [...prev, updatedComplaint]);
        }

        setIsEditing(false);
        setSelectedComplaint(null);
        alert(`Complaint ${isEditing ? "updated" : "submitted"} successfully!`);
      } else {
        alert("Failed to process the complaint.");
      }
    } catch (error) {
      console.error(`Error ${isEditing ? "updating" : "submitting"} complaint:`, error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>

      {/* Add Logout Button */}
      <div className="mb-4">
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {isEditing ? "Edit Complaint" : "Submit a New Complaint"}
          </h2>
          <button
            onClick={() => {
              setIsEditing(false);
              setSelectedComplaint(null);
            }}
            className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Add New Complaint
          </button>
        </div>
        <ComplaintForm
          initialData={isEditing ? selectedComplaint : {}}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsEditing(false);
            setSelectedComplaint(null);
          }}
        />
      </div>

      <h2 className="text-2xl font-bold mt-8">Previous Complaints</h2>
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Priority</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint._id} className="border-t">
                <td className="px-4 py-2">{complaint.title}</td>
                <td className="px-4 py-2">{complaint.category}</td>
                <td className="px-4 py-2">{complaint.priority}</td>
                <td className="px-4 py-2">
                  {complaint.status || "Pending"}
                </td>
                <td className="px-4 py-2">{complaint.description}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(complaint)}
                    className="mr-2 px-2 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(complaint._id)}
                    className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
