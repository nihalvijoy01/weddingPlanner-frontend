import React, { useEffect, useState } from "react";
import axios from "axios";
import AddBudgetItem from "../components/AddBudgetItem";
import BudgetList from "../components/BudgetList";
import DashboardSidebar from "../components/DashboardSidebar";
import { useParams } from "react-router-dom";

const ManageBudget = () => {
  const { weddingId } = useParams();
  const [budgetItems, setBudgetItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchBudgetItems = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(
          `http://localhost:8000/api/weddings/${weddingId}/budget/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setBudgetItems(response.data);
      } catch (err) {
        console.error("Failed to fetch budget items", err);
      }
    };

    fetchBudgetItems();
  }, [weddingId]);

  const addBudgetItem = (newItem) => {
    setBudgetItems([...budgetItems, newItem]);
  };

  const deleteBudgetItem = async (itemId) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.delete(
        `http://localhost:8000/api/weddings/${weddingId}/budget/${itemId}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBudgetItems(budgetItems.filter((item) => item.id !== itemId));
    } catch (err) {
      console.error("Failed to delete budget item", err);
    }
  };

  return (
    <>
      <DashboardSidebar wedding_id={weddingId} />
      <div className="p-4 sm:ml-64">
        <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
          Manage Budget
        </h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          {showAddForm ? "Close Add Form" : "Add Budget Item"}
        </button>

        {showAddForm && (
          <AddBudgetItem addBudgetItem={addBudgetItem} weddingId={weddingId} />
        )}

        <BudgetList
          budgetItems={budgetItems}
          deleteBudgetItem={deleteBudgetItem}
        />
      </div>
    </>
  );
};

export default ManageBudget;
