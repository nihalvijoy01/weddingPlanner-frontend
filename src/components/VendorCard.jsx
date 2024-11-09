// VendorCard.js
import React from "react";

const VendorCard = ({ vendor, onBookNow }) => {
  return (
    <div className="p-4 border rounded shadow-md">
      <img
        src={vendor.image ? vendor.image : "/path/to/default-image.jpg"}
        alt={vendor.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <h3 className="text-lg font-semibold">{vendor.name}</h3>
      <p className="text-gray-600">Contact: {vendor.contact_info}</p>
      <p className="text-gray-600">Cost: ${vendor.cost}</p>
      <p className="text-gray-600">Rating: {vendor.rating || "N/A"}</p>
      <button
        onClick={() => onBookNow(vendor.id)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Book Now
      </button>
    </div>
  );
};

export default VendorCard;
