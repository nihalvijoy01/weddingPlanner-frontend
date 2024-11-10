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
    // <form onSubmit={handleSubmit} className="mb-4">
    //   <input
    //     type="text"
    //     name="name"
    //     value={formData.name}
    //     onChange={handleChange}
    //     placeholder="Description"
    //     className="mb-2 p-2 border rounded w-full"
    //     required
    //   />
    //   <input
    //     type="number"
    //     name="allocated_amount"
    //     value={formData.allocated_amount}
    //     onChange={handleChange}
    //     placeholder="allocated_amount"
    //     className="mb-2 p-2 border rounded w-full"
    //     required
    //   />
    //   <input
    //     type="text"
    //     name="category"
    //     value={formData.category}
    //     onChange={handleChange}
    //     placeholder="category"
    //     className="mb-2 p-2 border rounded w-full"
    //     required
    //   />
    //   <button
    //     type="submit"
    //     className="px-4 py-2 bg-green-500 text-white rounded"
    //   >
    //     Add Budget Item
    //   </button>
    // </form>

    <form class="max-w-sm mx-auto" onSubmit={handleSubmit}>
      <div class="mb-5 ">
        <label
          htmlFor="name"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="allocated_amount"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Allocated Amount
        </label>
        <input
          type="number"
          id="allocated_amount"
          name="allocated_amount"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={formData.allocated_amount}
          onChange={handleChange}
        />
      </div>
      <div class="mb-5">
        <label
          for="category"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          value={formData.category}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
};

export default AddBudgetItem;
