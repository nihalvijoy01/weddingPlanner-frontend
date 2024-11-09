import React, { useState } from "react";
import axios from "axios";

const AddWeddingProject = () => {
  const [formData, setFormData] = useState({
    date: "",
    venue: "",
    budget: "",
    description: "",
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false); // New state to control form visibility

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Toggle form visibility
  const handleAddNewClick = () => {
    setShowForm(true);
    setMessage(null);
    setError(null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token"); // Get token from localStorage

    if (!token) {
      setError("User not authenticated.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/weddings/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        // Check for successful creation
        setMessage("Wedding project added successfully!");
        setFormData({ date: "", venue: "", budget: "", description: "" }); // Clear the form
        setError(null);
        setShowForm(false); // Hide form after successful submission
      }
    } catch (err) {
      setError("Failed to add wedding project. Please try again.");
    }
  };

  return (
    <div className="add-wedding-project-container">
      <h2 className="flex justify-center mb-4 text-xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
        Your Wedding Projects
      </h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      {!showForm && (
        <button
          onClick={handleAddNewClick}
          class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 f"
        >
          Add New
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="wedding-form">
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Venue:
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Budget:
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit">Add Wedding Project</button>
        </form>
      )}
    </div>
  );
};

export default AddWeddingProject;
