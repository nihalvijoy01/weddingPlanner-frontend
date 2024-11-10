import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchGuests,
  addGuest,
  deleteGuest,
  updateGuest,
} from "../features/guests/guestSlice";
import AddGuest from "../components/AddGuest";
import GuestList from "../components/GuestList";
import DashboardSidebar from "../components/DashboardSidebar";

const ManageGuests = () => {
  const { weddingId } = useParams();
  const dispatch = useDispatch();
  const { guests, status, error } = useSelector((state) => state.guests);

  const [newGuest, setNewGuest] = useState({
    name: "",
    email: "",
    phone_number: "",
    dietary_preferences: "",
    plus_one: false,
    attending: false,
  });

  useEffect(() => {
    dispatch(fetchGuests(weddingId));
  }, [weddingId, dispatch]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewGuest((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddGuest = (e) => {
    e.preventDefault();
    dispatch(addGuest({ weddingId, newGuest }));
    setNewGuest({
      name: "",
      email: "",
      phone_number: "",
      dietary_preferences: "",
      plus_one: false,
      attending: false,
    });
  };

  const handleDeleteGuest = (guestId) => {
    dispatch(deleteGuest({ weddingId, guestId }));
  };

  const handleUpdateGuest = (guestId, updatedGuest) => {
    dispatch(updateGuest({ weddingId, guestId, updatedGuest }));
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
        />

        <div className="flex flex-row justify-end">
          <AddGuest
            newGuest={newGuest}
            handleInputChange={handleInputChange}
            handleAddGuest={handleAddGuest}
          />
        </div>

        {status === "loading" && <p>Loading guests...</p>}
        {status === "failed" && <p>{error}</p>}
        {status === "succeeded" && (
          <GuestList
            guests={guests}
            handleDeleteGuest={handleDeleteGuest}
            handleUpdateGuest={handleUpdateGuest}
          />
        )}
      </div>
    </>
  );
};

export default ManageGuests;
