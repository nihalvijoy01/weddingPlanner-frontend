import React from "react";
import BudgetItem from "./BudgetItem";

const BudgetList = ({ budgetItems, deleteBudgetItem }) => {
  return (
    <div>
      {budgetItems.map((item) => (
        <BudgetItem
          key={item.id}
          item={item}
          deleteBudgetItem={deleteBudgetItem}
        />
      ))}
    </div>
  );
};

export default BudgetList;
