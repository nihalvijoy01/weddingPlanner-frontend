// src/components/WeddingForm.js
import React, { useState } from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import WeddingSite from "../components/WeddingSite";
import { useParams } from "react-router-dom";

function WeddingForm() {
  const [formData, setFormData] = useState({
    brideName: "",
    groomName: "",
    weddingDate: "",
    venue: "",
    additionalDetails: "",
  });
  const { weddingId } = useParams();

  const [showWeddingSite, setShowWeddingSite] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowWeddingSite(true);
  };

  if (showWeddingSite) {
    return <WeddingSite {...formData} />;
  }

  return (
    // <div>
    //   <DashboardSidebar wedding_id={weddingId} />
    //   <div className="p-4 sm:ml-64">
    //     <h1>Create Your Wedding Website</h1>
    //     <form onSubmit={handleSubmit}>
    //       <label>
    //         Bride's Name:
    //         <input
    //           type="text"
    //           name="brideName"
    //           value={formData.brideName}
    //           onChange={handleChange}
    //           required
    //         />
    //       </label>
    //       <label>
    //         Groom's Name:
    //         <input
    //           type="text"
    //           name="groomName"
    //           value={formData.groomName}
    //           onChange={handleChange}
    //           required
    //         />
    //       </label>
    //       <label>
    //         Wedding Date:
    //         <input
    //           type="date"
    //           name="weddingDate"
    //           value={formData.weddingDate}
    //           onChange={handleChange}
    //           required
    //         />
    //       </label>
    //       <label>
    //         Venue:
    //         <input
    //           type="text"
    //           name="venue"
    //           value={formData.venue}
    //           onChange={handleChange}
    //           required
    //         />
    //       </label>
    //       <label>
    //         Additional Details:
    //         <textarea
    //           name="additionalDetails"
    //           value={formData.additionalDetails}
    //           onChange={handleChange}
    //         />
    //       </label>
    //       <button type="submit">Generate Wedding Website</button>
    //     </form>
    //   </div>
    // </div>

    <div>
      <DashboardSidebar wedding_id={weddingId} />
      <div className="p-4 sm:ml-64 flex justify-center">
        <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form class="space-y-6" action="#">
            <h5 class="text-xl font-medium text-gray-900 dark:text-white">
              Launch your website
            </h5>
            <div>
              <label
                for="bride"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Bride's Name:
              </label>
              <input
                type="text"
                name="bride"
                id="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                for="text"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Grooms's Name:
              </label>
              <input
                type="text"
                name="groom"
                id="groom"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <div>
              <label
                for="venue"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Venue
              </label>
              <input
                type="text"
                name="venue"
                id="text"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              />
            </div>
            <label
              for="message"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            ></textarea>

            <button
              type="submit"
              class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Launch website
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default WeddingForm;
