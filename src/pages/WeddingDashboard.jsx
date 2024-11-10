import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../components/DashboardSidebar";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchWeddingDetails,
  fetchBudgetItems,
} from "../features/budget/budgetSlice";
import { fetchGuests } from "../features/guests/guestSlice";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchChecklist } from "../features/checklist/checklistSlice";
import { Castle, Calendar } from "lucide-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const WeddingDashboard = () => {
  const { weddingId } = useParams();
  const [wedding, setWedding] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { budgetItems, error, loading } = useSelector((state) => state.budget);
  const { guests } = useSelector((state) => state.guests);
  const { checklist } = useSelector((state) => state.checklist);

  useEffect(() => {
    const fetchWeddingDetails = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(
          `http://localhost:8000/api/weddings/${weddingId}/`,
          { headers: { Authorization: `Bearer ${token}` } }
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
    dispatch(fetchGuests(weddingId));
    dispatch(fetchChecklist(weddingId));
  }, [weddingId, dispatch]);

  const attendingGuestCount = guests.filter((guest) => guest.attending).length;
  const totalBudgetSpent = budgetItems.reduce((sum, item) => {
    return sum + (parseFloat(item.allocated_amount) || 0);
  }, 0);

  const chartData = {
    labels: ["Budget", "Spent Amount"],
    datasets: [
      {
        label: "Wedding Budget vs Spent",
        data: [wedding?.budget, totalBudgetSpent],
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

  const completedChecklists = checklist.filter(
    (item) => item.is_completed
  ).length;
  const checklistCompletionPercentage = Math.round(
    (completedChecklists / checklist.length) * 100
  );

  if (!wedding) return <p>Loading...</p>;

  return (
    <div>
      <DashboardSidebar wedding_id={weddingId} />
      <div className="p-4 sm:ml-64">
        <div className="p-4 rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <Castle />
              <span className="ms-3">{wedding.venue}</span>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <Calendar />
              <span className="ms-3">{wedding.date}</span>
            </div>
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p>
                <strong>Budget:</strong> ${wedding.budget}
              </p>
            </div>
          </div>
          <div
            style={{ backgroundColor: "#f8edeb" }}
            className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800"
          >
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              {wedding.description}
            </h1>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-yellow-400 dark:text-gray-500">
                Number of Guests : {wedding.num_guests}
              </p>
            </div>
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500">
                Attending Guests : {attendingGuestCount}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <Bar data={chartData} options={options} />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center justify-center rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="text-2xl text-yellow-400 dark:text-gray-500">
                Spent Amount : ${totalBudgetSpent}
              </p>
            </div>
            <div className="flex items-center justify-around rounded bg-gray-50 h-28 dark:bg-gray-800">
              <p className="mt-2 text-center text-lg text-black dark:text-gray-500">
                Completed Tasks
              </p>
              <div style={{ width: "13%", height: "13%" }} className="mb-4">
                <CircularProgressbar
                  value={checklistCompletionPercentage}
                  text={`${checklistCompletionPercentage}%`}
                  styles={buildStyles({
                    pathColor: `rgba(208,0,0, ${
                      checklistCompletionPercentage / 100
                    })`,
                    textColor: "#f88",
                    trailColor: "#d6d6d6",
                    backgroundColor: "#3e98c7",
                  })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingDashboard;
