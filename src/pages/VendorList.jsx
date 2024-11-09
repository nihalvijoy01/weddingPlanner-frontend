import React, { useEffect, useState } from "react";
import axios from "axios";
import VendorCard from "../components/VendorCard";
import DashboardSidebar from "../components/DashboardSidebar";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const VendorList = () => {
  const [vendors, setVendors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { weddingId } = useParams();

  useEffect(() => {
    const fetchVendors = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get("http://localhost:8000/api/vendor/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Group vendors by service_type
        const vendorsByServiceType = response.data.reduce((acc, vendor) => {
          if (!acc[vendor.service_type]) {
            acc[vendor.service_type] = [];
          }
          acc[vendor.service_type].push(vendor);
          return acc;
        }, {});

        setVendors(vendorsByServiceType);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch vendors", err);
        setError("Failed to load vendors");
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const handleBookNow = (vendorId) => {
    console.log(`Booking vendor with ID: ${vendorId}`);
    // Implement booking logic here
  };

  if (loading) return <p>Loading vendors...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <DashboardSidebar wedding_id={weddingId} />
      <div className="p-4 sm:ml-64">
        <h2 className="text-3xl font-bold mb-6">Vendors by Service Type</h2>

        {Object.keys(vendors).map((serviceType) => (
          <div key={serviceType} className="mb-8">
            <h3 className="text-2xl font-semibold mb-4">{serviceType}</h3>

            {/* Swiper Carousel */}
            <Swiper
              spaceBetween={20} // Space between slides
              slidesPerView="3" // Adjust the number of visible slides based on container size
              loop={true} // Enable looping
              centeredSlides={true} // Center the active slide
              autoplay={{ delay: 3000 }} // Auto-slide every 3 seconds
              breakpoints={{
                640: {
                  slidesPerView: 1, // 1 slide at a time for small screens
                },
                1024: {
                  slidesPerView: 2, // 2 slides at a time for larger screens
                },
              }}
            >
              {vendors[serviceType].map((vendor) => (
                <SwiperSlide key={vendor.id}>
                  <VendorCard vendor={vendor} onBookNow={handleBookNow} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorList;
