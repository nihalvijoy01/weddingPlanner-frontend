// GuestList.js
import React, { useState } from "react";

const GuestList = ({ guests, handleDeleteGuest, handleUpdateGuest }) => {
  const [editingGuestId, setEditingGuestId] = useState(null);
  const [editableGuest, setEditableGuest] = useState({});

  const handleEditClick = (guest) => {
    setEditingGuestId(guest.id);
    setEditableGuest({ ...guest });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditableGuest((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveClick = () => {
    handleUpdateGuest(editingGuestId, editableGuest);
    setEditingGuestId(null); // exit edit mode
  };

  const handleCancelClick = () => {
    setEditingGuestId(null); // exit edit mode without saving
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-4 ">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Plus One
            </th>
            <th scope="col" className="px-6 py-3">
              RSVP status
            </th>
            <th scope="col" className="px-6 py-3"></th>
            <th scope="col" className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
            <tr
              key={guest.id}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              {editingGuestId === guest.id ? (
                <>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      name="name"
                      value={editableGuest.name}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="email"
                      name="email"
                      value={editableGuest.email}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      name="phone_number"
                      value={editableGuest.phone_number}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      name="plus_one"
                      checked={editableGuest.plus_one}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      name="attending"
                      checked={editableGuest.attending}
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={handleSaveClick}
                      className="text-green-500"
                    >
                      Save
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={handleCancelClick}
                      className="text-red-500"
                    >
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-6 py-4">{guest.name}</td>
                  <td className="px-6 py-4">{guest.email}</td>
                  <td className="px-6 py-4">{guest.phone_number}</td>
                  <td className="px-6 py-4">{guest.plus_one ? "Yes" : "No"}</td>
                  <td className="px-6 py-4">
                    {guest.attending ? "Yes" : "No"}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleEditClick(guest)}
                      className="text-blue-500"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <a
                      onClick={() => handleDeleteGuest(guest.id)}
                      href="#"
                      className="text-rose-600 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </a>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuestList;
