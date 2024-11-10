// src/components/BudgetPieChart.js

import React from "react";
import { Chart } from "react-google-charts";

const BudgetPieChart = ({ budgetItems, totalBudget }) => {
  // Group budget items by category and sum the allocated amount for each category
  const categoryTotals = budgetItems.reduce((acc, item) => {
    const category = item.category;
    const amount = parseFloat(item.allocated_amount) || 0;

    if (acc[category]) {
      acc[category] += amount;
    } else {
      acc[category] = amount;
    }

    return acc;
  }, {});

  // Prepare data for the Google Pie Chart
  const chartData = [
    ["Category", "Amount"],
    ...Object.entries(categoryTotals), // Convert object to array of [category, amount] pairs
  ];

  const options = {
    title: "Budget Distribution",
    pieHole: 0.4, // Optional: For a donut chart
    is3D: false,
    slices: [
      { offset: 0.1 }, // Optional: Offset for a highlighted effect on the first slice
      { offset: 0.05 }, // Optional: Customize other slices if needed
    ],
    legend: { position: "top", alignment: "center" },
    tooltip: {
      text: "value",
      showColorCode: true,
      textStyle: { fontSize: 14 },
    },
  };

  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <Chart
        chartType="PieChart"
        data={chartData}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
};

export default BudgetPieChart;
