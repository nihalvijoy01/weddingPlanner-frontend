// src/pages/ManageBudget.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AddBudgetItem from "../components/AddBudgetItem";
import BudgetList from "../components/BudgetList";
import DashboardSidebar from "../components/DashboardSidebar";
import BudgetPieChart from "../components/BudgetPieChart"; // Import the pie chart component
import {
  fetchWeddingDetails,
  fetchBudgetItems,
  addBudgetItem,
  deleteBudgetItem,
} from "../features/budget/budgetSlice";
import BudgetBarChart from "../components/BudgetBarChart";

const ManageBudget = () => {
  const { weddingId } = useParams();
  const dispatch = useDispatch();

  // Get the state from the Redux store
  const { totalBudget, budgetItems, error, loading } = useSelector(
    (state) => state.budget
  );

  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    dispatch(fetchWeddingDetails({ weddingId, token }));
    dispatch(fetchBudgetItems({ weddingId, token }));
  }, [weddingId, dispatch]);

  // Calculate the total amount of budget items
  const totalBudgetSpent = budgetItems.reduce((sum, item) => {
    return sum + (parseFloat(item.allocated_amount) || 0);
  }, 0);

  const remainingBudget = totalBudget - totalBudgetSpent;

  const handleAddBudgetItem = (newItem) => {
    const token = localStorage.getItem("access_token");
    dispatch(addBudgetItem({ weddingId, newItem, token }));
  };

  const handleDeleteBudgetItem = (itemId) => {
    const token = localStorage.getItem("access_token");
    dispatch(deleteBudgetItem({ weddingId, itemId, token }));
  };

  return (
    <>
      <DashboardSidebar wedding_id={weddingId} />
      <div className="p-4 sm:ml-64 ">
        <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
          Manage Budget
        </h2>
        {/* Display the remaining wedding budget */}
        <div className="mt-4">
          <h3 className="text-xl font-semibold">
            Remaining Budget: ${remainingBudget.toFixed(2)}
          </h3>
        </div>

        {/* Add the pie chart for budget distribution */}
        <div className="flex flex-row justify-around">
          <div className="mt-4 ">
            <BudgetPieChart
              budgetItems={budgetItems}
              totalBudget={totalBudget}
            />
          </div>
          <div className="mt-4">
            <BudgetBarChart
              budgetItems={budgetItems}
              totalBudget={totalBudget}
            />
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="mt-4 px-4    py-2  bg-blue-500 text-white rounded"
        >
          {showAddForm ? "Close Add Form" : "Add Budget Item"}
        </button>

        {showAddForm && (
          <AddBudgetItem
            addBudgetItem={handleAddBudgetItem}
            weddingId={weddingId}
          />
        )}
        <BudgetList
          budgetItems={budgetItems}
          deleteBudgetItem={handleDeleteBudgetItem}
        />
      </div>
    </>
  );
};

export default ManageBudget;
