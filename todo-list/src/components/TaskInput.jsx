import { useEffect, useState } from "react";

import priorityColors from "../utils/contants";
import SubmitButton from "../utils/SubmitButton";
import ConfirmButton from "../utils/ConfirmButton";

const TaskInput = ({ setData, dataFromChild, data }) => {
  const [showPriorities, setShowPriorities] = useState(false);
  const [inputTitle, setInputTitle] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [minDate, setMinDate] = useState(null);

  useEffect(() => {
    if (dataFromChild?.isEdit) {
      const chosenCard = data.find((item) => item.id === dataFromChild.id);

      if (chosenCard) {
        setInputTitle(chosenCard?.title);
        setInputDescription(chosenCard?.description);
        setInputDate(chosenCard?.dueDate);
        setSelectedPriority(chosenCard?.priority?.name);
      }
    }
  }, [dataFromChild, data]);

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setMinDate(currentDate);
  }, []);

  const priorities = ["P1", "P2", "P3", "P4"];

  const handlePriority = (priority) => {
    setSelectedPriority(priority);
    setShowPriorities(false);
  };

  const handleSubmitButton = () =>
    SubmitButton(
      inputTitle,
      inputDescription,
      selectedPriority,
      priorityColors,
      inputDate,
      setData,
      setInputTitle,
      setInputDescription,
      setInputDate,
      setSelectedPriority
    );

  const handleConfirmButton = () => {
    ConfirmButton(
      data,
      dataFromChild,
      inputTitle,
      inputDescription,
      selectedPriority,
      priorityColors,
      inputDate,
      setData
    );
    setInputTitle("");
    setInputDescription("");
    setInputDate("");
    setSelectedPriority(null);
  };

  return (
    <div className="flex justify-center mt-4 ">
      <div className="border p-5 flex flex-col w-[600px] rounded-lg border-gray-400 bg-[#FDF7F3]">
        {/* Title Input */}
        <input
          type="text"
          maxLength="123"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
          placeholder="Got a task? Let's schedule it!"
          className="outline-none mr-2 w-full p-2 rounded mb-2 placeholder:font-medium placeholder:text-gray-400"
        />

        {/* Description Input */}
        <input
          type="text"
          value={inputDescription}
          placeholder="Description"
          maxLength="150"
          onChange={(e) => setInputDescription(e.target.value)}
          className="outline-none mr-2 w-full p-2 rounded mb-2 text-sm font-bold text-gray-500 "
        />

        <div className="flex flex-row border-b p-2">
          {/* Date Input */}
          <input
            type="date"
            value={inputDate}
            onChange={(e) => setInputDate(e.target.value)}
            min={minDate}
            className="border p-1 border-gray-300  text-center rounded-lg mr-3 text-gray-500"
          />

          {/* Priority Input Button */}
          <button
            className="border p-1 border-gray-300 w-20 text-center rounded-lg mr-3"
            onMouseEnter={() => setShowPriorities(!showPriorities)}
          >
            Priority
          </button>
          <button style={{ color: priorityColors[selectedPriority] }}>
            {selectedPriority}
          </button>
        </div>

        {/* Priority Buttons */}
        {showPriorities && (
          <div
            className="flex flex-col absolute top-50 ml-44 mt-2"
            onMouseEnter={() => setShowPriorities(true)}
            onMouseLeave={() => setShowPriorities(false)}
          >
            {priorities.map((priority, i) => (
              <button
                key={priority}
                onClick={() => handlePriority(priority)}
                className="border w-22 rounded hover:scale-110 transition ease-out border-gray-400 bg-[#e8e9d9] hover:bg-[#e0c1be] hover:text-white"
              >
                Priority {i + 1}
              </button>
            ))}
          </div>
        )}
        {/* Submit Button */}
        <div className="flex justify-end">
          {!dataFromChild.isEdit ? (
            <>
              <button
                onClick={handleSubmitButton}
                className="border w-16 h-10 p-1 text-center rounded-lg border-gray-300 mt-5 bg-red-400 hover:bg-red-500 text-white font-bold hover:scale-90 transition ease-out"
              >
                Add
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleConfirmButton}
                className="border w-20 h-10 p-1 text-center rounded-lg border-gray-300 mt-5 bg-red-400 hover:bg-red-500 text-white font-bold hover:scale-90 transition ease-out"
              >
                Confirm
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
