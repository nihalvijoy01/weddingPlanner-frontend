import React, { useState } from "react";
import axios from "axios";

const AddBudgetItem = ({ addBudgetItem, weddingId }) => {
  console.log(weddingId);
  const [formData, setFormData] = useState({
    name: "",
    allocated_amount: "",
    spent_amount: 0,
    category: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.post(
        `http://localhost:8000/api/weddings/${weddingId}/budget/`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      addBudgetItem(response.data);
      setFormData({
        name: "",
        allocated_amount: "",
        spent_amount: 0,
        category: "",
      });
    } catch (err) {
      console.error("Failed to add budget item", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Description"
        className="mb-2 p-2 border rounded w-full"
        required
      />
      <input
        type="number"
        name="allocated_amount"
        value={formData.allocated_amount}
        onChange={handleChange}
        placeholder="allocated_amount"
        className="mb-2 p-2 border rounded w-full"
        required
      />
      <input
        type="text"
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="category"
        className="mb-2 p-2 border rounded w-full"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Add Budget Item
      </button>
    </form>
  );
};

export default AddBudgetItem;
