import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchWeddings } from "../features/weddings/weddingSlice";
import AddWeddingProject from "../components/AddWeddingProject";

const WeddingProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    list: weddings,
    status,
    error,
  } = useSelector((state) => state.weddings);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWeddings());
    }
  }, [status, dispatch]);

  const handleSelectWedding = (weddingId) => {
    navigate(`/weddings/${weddingId}/dashboard`);
  };

  return (
    <div className="flex flex-col w-full space-y-4 p-4">
      <AddWeddingProject weddingId />
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" && weddings.length > 0 ? (
        <ul className="w-full space-y-4">
          {weddings.map((wedding) => (
            <li key={wedding.id} className="w-full">
              <a
                onClick={() => handleSelectWedding(wedding.id)}
                href="#"
                className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <div>
                  <h3>{wedding.venue}</h3>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(wedding.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Budget:</strong> ${wedding.budget}
                  </p>
                  <p>
                    <strong>Description:</strong> {wedding.description}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Wedding Projects Found</p>
      )}
    </div>
  );
};

export default WeddingProjects;
