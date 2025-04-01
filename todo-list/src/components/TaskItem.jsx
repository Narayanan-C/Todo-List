import { useState } from "react";

const TaskItem = ({ item, setData, data, getDataFromChild }) => {
  const [isEdit, setIsEdit] = useState(true);
  const handleDeleteItem = (delete_id) => {
    const updatedData = data.filter((data) => data.id !== delete_id);
    setData(updatedData);
    localStorage.setItem("tasks", JSON.stringify(updatedData));
  };

  const handleCompletedItem = (completed_id) => {
    const updatedData = data.map((task) =>
      task.id === completed_id
        ? {
            ...task,
            status: task.status === "Completed" ? "On Going" : "Completed",
          }
        : task
    );
    setData(updatedData);
    localStorage.setItem("tasks", JSON.stringify(updatedData));
  };

  const handleDataTransport = () => {
    getDataFromChild(item.id, isEdit, setIsEdit);
  };
  return (
    <div
      className={`border-b border-gray-400 w-[600px] m-3 p-2 rounded-lg bg-[#FAF3E0] shadow-2xl ${
        item.status == "Completed" ? "line-through text-gray-500" : ""
      }`}
    >
      <h1 className="font-bold">
        <b style={{ color: item.priority.colorCode }}>[{item.priority.name}]</b>
        {item.title}
      </h1>
      <p className="text-sm font-bold text-gray-500">{item.description}</p>
      <p>
        <b className="text-[#FF6F61]">Due Date:</b> {item.dueDate}
      </p>
      <div className="mt-5">
        <button
          onClick={() => handleDeleteItem(item.id)}
          className="border w-18 mr-2 text-center rounded bg-[#FFB6B9] font-bold text-white p-1 hover:bg-[#FF7D85] hover:scale-110 transition ease-out"
        >
          Delete
        </button>
        <button
          onClick={() => handleCompletedItem(item.id)}
          className="border w-24 mr-2 text-center rounded bg-[#A6D0DD]  font-bold text-white p-1 hover:bg-[#79B5C9] hover:scale-110 transition ease-out"
        >
          Completed
        </button>
        <button
          onClick={handleDataTransport}
          className="border w-16 mr-2 text-center rounded bg-[#FFB6B9] font-bold text-white p-1 hover:bg-[#FF7D85] hover:scale-110 transition ease-out"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
