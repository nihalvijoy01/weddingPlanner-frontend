import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchWeddingDetails,
  fetchBudgetItems,
  addBudgetItem,
  deleteBudgetItem,
} from "../features/budget/budgetSlice";
import { Bar } from "react-chartjs-2"; // Import the Bar chart from react-chartjs-2
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WeddingDashboard = () => {
  const { weddingId } = useParams(); // Get wedding ID from route params
  const [wedding, setWedding] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { budgetItems, error, loading } = useSelector((state) => state.budget);

  useEffect(() => {
    const fetchWeddingDetails = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(
          `http://localhost:8000/api/weddings/${weddingId}/`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setWedding(response.data);
      } catch (err) {
        console.error("Failed to fetch wedding details", err);
      }
    };

    fetchWeddingDetails();
  }, [weddingId]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    dispatch(fetchBudgetItems({ weddingId, token }));
  }, [weddingId, dispatch]);

  // Calculate the total amount of budget items
  const totalBudgetSpent = budgetItems.reduce((sum, item) => {
    return sum + (parseFloat(item.allocated_amount) || 0); // Ensure each item amount is a number
  }, 0);

  // Chart data
  const chartData = {
    labels: ["Budget", "Spent Amount"],
    datasets: [
      {
        label: "Wedding Budget vs Spent",
        data: [wedding?.budget, totalBudgetSpent], // Wedding budget and spent amount
        backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Wedding Budget vs Spent Amount",
      },
    },
  };

  if (!wedding) return <p>Loading...</p>;

  return (
    <div>
      <DashboardSidebar wedding_id={weddingId} />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <span className="ms-3">Venue: {wedding.venue}</span>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p>
                <strong>Date:</strong> {wedding.date}
              </p>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p>
                <strong>Budget:</strong> ${wedding.budget}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
            <p>
              <strong>{wedding.description}</strong>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-yellow-400 dark:text-gray-500">
                Number of Guests : {wedding.num_guests}
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                Spent Amount : ${totalBudgetSpent}
              </p>
            </div>
          </div>

          {/* Bar chart showing Wedding Budget vs Spent Amount */}
          <div className="mb-4">
            <Bar data={chartData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingDashboard;
