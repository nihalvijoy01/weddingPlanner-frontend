// GuestList.js
import React from "react";

const GuestList = ({ guests, handleDeleteGuest, handleUpdateGuest }) => {
  console.log(guests);
  return (
    // <div className="bg-white shadow-lg rounded-lg p-6 dark:bg-gray-800">
    //   <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200 mb-4">
    //     Guest List
    //   </h3>
    //   {guests.length === 0 ? (
    //     <p className="text-gray-600 dark:text-gray-400">No guests added yet.</p>
    //   ) : (
    //     <ul className="divide-y divide-gray-200 dark:divide-gray-700">
    //       {guests.map((guest) => (
    //         <li
    //           key={guest.id}
    //           className="py-4 flex justify-between items-center"
    //         >
    //           <div>
    //             <p className="text-lg font-medium text-gray-900 dark:text-white">
    //               {guest.name}
    //             </p>
    //             <p className="text-gray-600 dark:text-gray-400">
    //               {guest.email}
    //             </p>
    //             <p className="text-gray-600 dark:text-gray-400">
    //               {guest.phone_number}
    //             </p>
    //             <p className="text-gray-600 dark:text-gray-400">
    //               Dietary Preferences: {guest.dietary_preferences || "None"}
    //             </p>
    //             <p className="text-gray-600 dark:text-gray-400">
    //               Plus One: {guest.plus_one ? "Yes" : "No"}
    //             </p>
    //             <p className="text-gray-600 dark:text-gray-400">
    //               Attending: {guest.attending ? "Yes" : "No"}
    //             </p>
    //           </div>
    //           <button
    //             onClick={() => handleDeleteGuest(guest.id)}
    //             className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-500"
    //           >
    //             Delete
    //           </button>
    //         </li>
    //       ))}
    //     </ul>
    //   )}
    // </div>

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
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              key={guest.id}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {guest.name}
              </th>
              <td className="px-6 py-4">{guest.email}</td>
              <td className="px-6 py-4">{guest.phone_number}</td>
              <td className="px-6 py-4">{guest.plus_one ? "yes" : "No"}</td>
              <td className="px-6 py-4">{guest.attending ? "Yes" : "No"}</td>
              <td className="px-6 py-4">
                <a
                  href="#"
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  Edit
                </a>
              </td>
              <td className="px-6 py-4">
                <a
                  onClick={() => {
                    handleDeleteGuest(guest.id);
                  }}
                  href="#"
                  className="font-medium text-rose-600 dark:text-blue-500 hover:underline"
                >
                  Delete
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuestList;
