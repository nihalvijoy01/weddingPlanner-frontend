import React from "react";

const BudgetItem = ({ item, deleteBudgetItem }) => {
  return (
    <div className="flex justify-between p-4 border-b">
      <span>{item.name}</span>
      <span>${item.allocated_amount}</span>
      <span>{item.category}</span>
      <button
        onClick={() => deleteBudgetItem(item.id)}
        className="px-2 py-1 bg-red-500 text-white rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default BudgetItem;
