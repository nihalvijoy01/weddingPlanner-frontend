import React from "react";

const BudgetItem = ({ item, deleteBudgetItem }) => {
  return (
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {item.name}
      </th>
      <td className="px-6 py-4">{item.category}</td>
      <td className="px-6 py-4">{item.allocated_amount}</td>
      <td className="px-6 py-4">
        <a
          onClick={() => {
            deleteBudgetItem(item.id);
          }}
          href="#"
          className="font-medium text-rose-600 dark:text-blue-500 hover:underline"
        >
          Delete
        </a>
      </td>
    </tr>
  );
};

export default BudgetItem;
