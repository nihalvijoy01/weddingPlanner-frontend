import React from "react";
import BudgetItem from "./BudgetItem";

const BudgetList = ({ budgetItems, deleteBudgetItem }) => {
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4 ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Allocated Amount
              </th>

              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {budgetItems.map((item) => (
              <BudgetItem
                key={item.id}
                item={item}
                deleteBudgetItem={deleteBudgetItem}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetList;
