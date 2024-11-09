import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchWeddings,
  deleteWedding,
} from "../features/weddings/weddingSlice";
import AddWeddingProject from "../components/AddWeddingProject";

const WeddingProjects = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [weddingIdToDelete, setWeddingIdToDelete] = useState(null);

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

  const handleDeleteWedding = (weddingId) => {
    setWeddingIdToDelete(weddingId);
    setDeleteConfirmation(true); // Show confirmation
  };

  const confirmDeleteWedding = () => {
    dispatch(deleteWedding(weddingIdToDelete));
    setDeleteConfirmation(false);
  };

  const cancelDeleteWedding = () => {
    setDeleteConfirmation(false);
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
              <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <a onClick={() => handleSelectWedding(wedding.id)} href="#">
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
                <button
                  onClick={(e) => {
                    e.preventDefault(); // Prevent navigation
                    handleDeleteWedding(wedding.id);
                  }}
                  className="mt-4 text-red-600 hover:text-red-800 font-semibold"
                >
                  Delete Wedding
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Wedding Projects Found</p>
      )}

      {deleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
            <p className="mb-4">This action cannot be undone.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDeleteWedding}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteWedding}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeddingProjects;
