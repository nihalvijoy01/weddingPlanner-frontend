// AddGuestModal.js
import React from "react";

const AddGuestModal = ({ newGuest, handleInputChange, handleAddGuest }) => {
  return (
    <div>
      {/* Modal toggle button */}
      <button
        data-modal-target="add-guest-modal"
        data-modal-toggle="add-guest-modal"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Add New Guest
      </button>

      {/* Modal */}
      <div
        id="add-guest-modal"
        tabIndex="-1"
        aria-hidden="true"
        className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          {/* Modal content */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Add New Guest
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="add-guest-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* Modal body */}
            <form
              onSubmit={handleAddGuest}
              className="p-4 md:p-5 flex flex-col gap-4"
            >
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
        </div>
      </div>
    </div>
  );
};

export default AddGuestModal;
