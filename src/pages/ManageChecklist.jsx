import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DashboardSidebar from "../components/DashboardSidebar";

const ManageChecklist = () => {
  const { weddingId } = useParams(); // Get wedding ID from URL
  const [checklist, setChecklist] = useState([]);
  const [newChecklistItem, setNewChecklistItem] = useState({
    title: "",
    description: "",
    due_date: "",
    is_completed: false,
  });

  useEffect(() => {
    const fetchChecklist = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(
          `http://localhost:8000/api/weddings/${weddingId}/checklist/`, // Include weddingId in URL
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setChecklist(response.data);
      } catch (err) {
        console.error("Failed to fetch checklist", err);
      }
    };

    fetchChecklist();
  }, [weddingId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewChecklistItem((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddChecklistItem = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.post(
        `http://localhost:8000/api/weddings/${weddingId}/checklist/`, // Include weddingId in URL
        newChecklistItem,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setChecklist([...checklist, response.data]);
      setNewChecklistItem({
        title: "",
        description: "",
        due_date: "",
        is_completed: false,
      });
    } catch (err) {
      console.error("Failed to add checklist item", err);
    }
  };

  const handleToggleComplete = async (itemId, currentStatus) => {
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/weddings/${weddingId}/checklist/${itemId}/`,
        { is_completed: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedChecklist = checklist.map((item) =>
        item.id === itemId ? { ...item, is_completed: !currentStatus } : item
      );
      setChecklist(updatedChecklist);
    } catch (err) {
      console.error("Failed to toggle checklist item completion", err);
    }
  };

  return (
    <div>
      <DashboardSidebar wedding_id={weddingId} />
      <div className="p-4 sm:ml-64">
        <h2>Manage Checklist for Wedding ID: {weddingId}</h2>
        <ul>
          {checklist.map((item) => (
            <li key={item.id}>
              <span
                style={{
                  textDecoration: item.is_completed ? "line-through" : "none",
                }}
              >
                {item.title}: {item.description} (Due: {item.due_date})
              </span>
              <button
                onClick={() => handleToggleComplete(item.id, item.is_completed)}
              >
                {item.is_completed ? "Mark Incomplete" : "Mark Complete"}
              </button>
            </li>
          ))}
        </ul>
        <h3>Add New Checklist Item</h3>
        <form onSubmit={handleAddChecklistItem}>
          <input
            type="text"
            name="title"
            value={newChecklistItem.title}
            placeholder="Title"
            onChange={handleInputChange}
            required
          />
          <textarea
            name="description"
            value={newChecklistItem.description}
            placeholder="Description"
            onChange={handleInputChange}
            required
          />
          <input
            type="date"
            name="due_date"
            value={newChecklistItem.due_date}
            onChange={handleInputChange}
            required
          />
          <label>
            Completed:
            <input
              type="checkbox"
              name="is_completed"
              checked={newChecklistItem.is_completed}
              onChange={handleInputChange}
            />
          </label>
          <button type="submit">Add Item</button>
        </form>
      </div>
    </div>
  );
};

export default ManageChecklist;
