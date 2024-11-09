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
    <div>
      <DashboardSidebar wedding_id={weddingId} />
      <div className="p-4 sm:ml-64">
        <h1>Create Your Wedding Website</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Bride's Name:
            <input
              type="text"
              name="brideName"
              value={formData.brideName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Groom's Name:
            <input
              type="text"
              name="groomName"
              value={formData.groomName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Wedding Date:
            <input
              type="date"
              name="weddingDate"
              value={formData.weddingDate}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Venue:
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Additional Details:
            <textarea
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Generate Wedding Website</button>
        </form>
      </div>
    </div>
  );
}

export default WeddingForm;
