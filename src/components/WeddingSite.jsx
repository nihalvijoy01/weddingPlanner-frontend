// src/components/WeddingSite.js
import React from "react";

function WeddingSite({
  brideName,
  groomName,
  weddingDate,
  venue,
  additionalDetails,
}) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1>
        Welcome to the Wedding of {brideName} & {groomName}
      </h1>
      <h2>Date: {new Date(weddingDate).toLocaleDateString()}</h2>
      <h3>Venue: {venue}</h3>
      {additionalDetails && (
        <div style={{ marginTop: "20px" }}>
          <h4>Additional Details:</h4>
          <p>{additionalDetails}</p>
        </div>
      )}
    </div>
  );
}

export default WeddingSite;
