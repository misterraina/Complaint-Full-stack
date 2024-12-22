import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const ComplaintForm = ({ initialData = {}, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
      title: initialData.title || "",
      description: initialData.description || "",
      category: initialData.category || "",
      priority: initialData.priority || "Low",
    });
  
    useEffect(() => {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        category: initialData.category || "",
        priority: initialData.priority || "Low",
      });
    }, [initialData]);
  
    const categories = ["Product", "Service", "Support"];
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(formData); // Delegate submission to the parent component
    };
  
    return (
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
        <h1 className="text-xl font-bold mb-4">{initialData.title ? "Edit Complaint" : "Submit a Complaint"}</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Complaint Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <div className="flex space-x-4 mt-1">
              {["Low", "Medium", "High"].map((level) => (
                <label key={level} className="inline-flex items-center">
                  <input
                    type="radio"
                    name="priority"
                    value={level}
                    checked={formData.priority === level}
                    onChange={handleChange}
                    className="text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="ml-2">{level}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {initialData.title ? "Update Complaint" : "Submit Complaint"}
            </button>
          </div>
        </form>
      </div>
    );
  };
  
  export default ComplaintForm;
  