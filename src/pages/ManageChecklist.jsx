import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import DashboardSidebar from "../components/DashboardSidebar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AddTask from "../components/AddTask";
import {
  fetchChecklist,
  addChecklistItem,
  deleteChecklistItem,
  toggleCompleteChecklistItem,
} from "../features/checklist/checklistSlice";

const localizer = momentLocalizer(moment);

const ManageChecklist = () => {
  const { weddingId } = useParams();
  const dispatch = useDispatch();
  const { checklist, loading, error } = useSelector((state) => state.checklist);
  const [newChecklistItem, setNewChecklistItem] = useState({
    title: "",
    description: "",
    due_date: "",
    is_completed: false,
  });

  useEffect(() => {
    dispatch(fetchChecklist(weddingId));
  }, [dispatch, weddingId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewChecklistItem((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddChecklistItem = (e) => {
    e.preventDefault();
    dispatch(addChecklistItem({ weddingId, newItem: newChecklistItem }));
    setNewChecklistItem({
      title: "",
      description: "",
      due_date: "",
      is_completed: false,
    });
  };

  const handleDeleteChecklistItem = (id) => {
    dispatch(deleteChecklistItem({ weddingId, id }));
  };

  const handleToggleComplete = (id, is_completed) => {
    dispatch(toggleCompleteChecklistItem({ weddingId, id, is_completed }));
  };

  // Convert checklist items to BigCalendar events
  const events = checklist.map((item) => ({
    id: item.id,
    title: item.title,
    start: new Date(item.due_date),
    end: new Date(item.due_date),
    allDay: true,
    is_completed: item.is_completed,
  }));

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.is_completed ? "#28a745" : "#007bff",
      color: "white",
    },
  });

  return (
    <div>
      <DashboardSidebar wedding_id={weddingId} />
      <div className="p-4 sm:ml-64">
        <span className="text-2xl font-bold mb-4">Manage Checklist</span>
        <AddTask
          handleInputChange={handleInputChange}
          handleSubmit={handleAddChecklistItem}
        />
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {/* Calendar Display */}
        <BigCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter}
        />

        <div class="relative overflow-x-auto">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col " class="px-6 py-3">
                  Name
                </th>
                <th scope="col " class="px-6 py-3">
                  Mark Complete
                </th>
                <th scope="col " class="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {checklist.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <span className={item.is_completed ? "line-through" : ""}>
                      {item.title}
                    </span>
                  </th>
                  <td className="px-6 py-4">
                    {" "}
                    <button
                      onClick={() =>
                        handleToggleComplete(item.id, item.is_completed)
                      }
                      className="ml-4 px-2 py-1 bg-green-500 text-white rounded"
                    >
                      {item.is_completed ? "Unmark Complete" : "Mark Complete"}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {" "}
                    <button
                      onClick={() => handleDeleteChecklistItem(item.id)}
                      className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageChecklist;
