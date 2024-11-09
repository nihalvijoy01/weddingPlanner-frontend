import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddGuest from "../components/AddGuest";
import GuestList from "../components/GuestList";
import DashboardSidebar from "../components/DashboardSidebar";
import { fetchGuests } from "../features/guests/guestSlice";

const ManageGuests = () => {
  const { weddingId } = useParams();
  const [guests, setGuests] = useState([]);
  const [showAddGuestForm, setShowAddGuestForm] = useState(false);
  const [newGuest, setNewGuest] = useState({
    name: "",
    email: "",
    phone_number: "",
    dietary_preferences: "",
    plus_one: false,
    attending: false,
  });

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

  useEffect(() => {
    fetchGuests();
  }, [weddingId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewGuest((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCSVUpload = async (e) => {
    const token = localStorage.getItem("access_token");
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/weddings/${weddingId}/guests/upload_csv/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("CSV file uploaded successfully!");
      fetchGuests();
    } catch (err) {
      console.error("Failed to upload CSV", err);
      alert("Failed to upload CSV file.");
    }
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

  const handleDeleteGuest = async (guestId) => {
    const token = localStorage.getItem("access_token");
    try {
      await axios.delete(
        `http://localhost:8000/api/weddings/${weddingId}/guests/${guestId}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGuests(guests.filter((guest) => guest.id !== guestId));
    } catch (err) {
      console.error("Failed to delete guest", err);
    }
  };

  const handleUpdateGuest = async (guestId, updatedGuest) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.put(
        `http://localhost:8000/api/weddings/${weddingId}/guests/${guestId}/`,
        updatedGuest,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGuests(
        guests.map((guest) => (guest.id === guestId ? response.data : guest))
      );
    } catch (err) {
      console.error("Failed to update guest", err);
    }
  };

  return (
    <>
      <DashboardSidebar wedding_id={weddingId} />
      <div className="p-4 sm:ml-64">
        <h2 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
          Manage Guests
        </h2>

        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Upload from CSV
        </label>
        <input
          className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          onChange={handleCSVUpload}
        />

        <div className="flex flex-row justify-end">
          <AddGuest
            newGuest={newGuest}
            handleInputChange={handleInputChange}
            handleAddGuest={handleAddGuest}
          />
        </div>

        <GuestList
          guests={guests}
          handleDeleteGuest={handleDeleteGuest}
          handleUpdateGuest={handleUpdateGuest}
        />
      </div>
    </>
  );
};

export default ManageGuests;
