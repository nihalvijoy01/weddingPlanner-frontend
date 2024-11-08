// ManageGuests.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddGuest from "../components/AddGuest";
import DashboardSidebar from "../components/DashboardSidebar";

const ManageGuests = () => {
  const { weddingId } = useParams();
  const [guests, setGuests] = useState([]);
  const [showAddGuestForm, setShowAddGuestForm] = useState(false); // New state
  const [newGuest, setNewGuest] = useState({
    name: "",
    email: "",
    phone_number: "",
    dietary_preferences: "",
    plus_one: false,
    attending: false,
  });

  useEffect(() => {
    const fetchGuests = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(
          `http://localhost:8000/api/weddings/${weddingId}/guests/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setGuests(response.data);
      } catch (err) {
        console.error("Failed to fetch guests", err);
      }
    };

    fetchGuests();
  }, [weddingId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewGuest((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddGuest = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.post(
        `http://localhost:8000/api/weddings/${weddingId}/guests/`,
        newGuest,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGuests([...guests, response.data]);
      setNewGuest({
        name: "",
        email: "",
        phone_number: "",
        dietary_preferences: "",
        plus_one: false,
        attending: false,
      });
      setShowAddGuestForm(false); // Hide form after adding guest
    } catch (err) {
      console.error("Failed to add guest", err);
    }
  };

  return (
    <>
      <DashboardSidebar wedding_id={weddingId} />
      <div className="p-4 sm:ml-64">
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Manage Guests
          </h2>
          <button
            onClick={() => setShowAddGuestForm((prev) => !prev)}
            className="w-full max-w-xs py-2 mb-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium focus:ring focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            {showAddGuestForm ? "Cancel" : "Add Guest"}
          </button>
          {showAddGuestForm && (
            <AddGuest
              newGuest={newGuest}
              handleInputChange={handleInputChange}
              handleAddGuest={handleAddGuest}
            />
          )}
          <ul className="w-full max-w-md bg-white shadow-lg rounded-lg p-4 dark:bg-gray-800 mt-8">
            {guests.map((guest) => (
              <li
                key={guest.id}
                className="py-2 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
              >
                <span className="font-semibold">{guest.name}</span> -{" "}
                {guest.email} - {guest.phone_number} -{" "}
                {guest.dietary_preferences}
                {guest.plus_one && (
                  <span className="text-green-600 dark:text-green-400">
                    {" "}
                    (Plus One)
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ManageGuests;
