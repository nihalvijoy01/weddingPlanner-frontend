// AddGuest.js
import React from "react";

const AddGuest = ({ newGuest, handleInputChange, handleAddGuest }) => {
  return (
    <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6 flex flex-col gap-4 dark:bg-gray-800">
      <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-4">
        Add New Guest
      </h3>
      <form onSubmit={handleAddGuest} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          value={newGuest.name}
          placeholder="Name"
          onChange={handleInputChange}
          required
          className="p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
        <input
          type="email"
          name="email"
          value={newGuest.email}
          placeholder="Email"
          onChange={handleInputChange}
          required
          className="p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
        <input
          type="text"
          name="phone_number"
          value={newGuest.phone_number}
          placeholder="Phone Number"
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
        <input
          type="text"
          name="dietary_preferences"
          value={newGuest.dietary_preferences}
          placeholder="Dietary Preferences"
          onChange={handleInputChange}
          className="p-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        />
        <label className="flex items-center text-gray-700 dark:text-gray-300">
          <span className="mr-2">Plus One:</span>
          <input
            type="checkbox"
            name="plus_one"
            checked={newGuest.plus_one}
            onChange={handleInputChange}
            className="rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium focus:ring focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Add Guest
        </button>
      </form>
    </div>
  );
};

export default AddGuest;
