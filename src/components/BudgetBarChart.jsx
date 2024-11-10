// src/components/BudgetBarChart.js

import React from "react";
import { Chart } from "react-google-charts";

const BudgetBarChart = ({ budgetItems }) => {
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

  // Prepare data for the Google Bar Chart
  const chartData = [
    ["Category", "Amount"],
    ...Object.entries(categoryTotals), // Convert object to array of [category, amount] pairs
  ];

  const options = {
    title: "Budget Allocation by Category",
    hAxis: {
      title: "Amount",
      minValue: 0,
    },
    vAxis: {
      title: "Category",
    },
    bars: "horizontal", // Horizontal bar chart
    legend: { position: "none" },
    chartArea: { width: "70%", height: "80%" },
    colors: ["#4caf50"], // Custom color for bars
  };

  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <Chart
        chartType="BarChart"
        data={chartData}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
};

export default BudgetBarChart;
