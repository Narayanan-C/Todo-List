import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const priorityColors = {
  P1: "#D32F2F",
  P2: "#1ABC9C",
  P3: "#F8C8DC",
  P4: "#D3D3D3",
};

const TaskInput = ({ setData }) => {
  const [showPriorities, setShowPriorities] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);

  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  const handlePriority = (priority) => {
    setSelectedPriority(priority);
    setShowPriorities(false);
  };

  const handleSubmitButton = () => {
    if (title.current.value.trim() || description.current.value.trim() !== "") {
      const newTask = {
        id: uuidv4(),
        title: title.current.value,
        description: description.current.value,
        priority: {
          name: selectedPriority,
          colorCode: priorityColors[selectedPriority],
        },
        dueDate: dueDate.current.value,
        status: "On going",
      };
      setData((prevData) => [...prevData, newTask]);

      const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

      storedTasks.push(newTask);

      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    } else {
      alert("please provide an task");
    }
  };

  const priorities = ["P1", "P2", "P3", "P4"];
  return (
    <div className="flex justify-center mt-4 ">
      <div className="border p-5 flex flex-col w-[600px] rounded-lg border-gray-400 bg-[#FDF7F3]">
        {/* Title Input */}
        <input
          type="text"
          ref={title}
          placeholder="Got a task? Let's schedule it!"
          className="outline-none mr-2 w-60 p-2 rounded mb-2 placeholder:font-medium placeholder:text-gray-400"
        />
        {/* Description Input */}
        <input
          type="text"
          ref={description}
          placeholder="Description"
          className="outline-none mr-2 w-60 p-2 rounded mb-2 placeholder:text-sm"
        />
        <div className="flex flex-row border-b p-2">
          {/* Date Input */}
          <input
            type="date"
            ref={dueDate}
            className="border p-1 border-gray-300  text-center rounded-lg mr-3 text-gray-500"
          />

          {/* Priority Input Button */}
          <button
            className="border p-1 border-gray-300 w-20 text-center rounded-lg mr-3"
            onMouseEnter={() => setShowPriorities(!showPriorities)}
          >
            Priority
          </button>
          <button>{selectedPriority}</button>
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
                key={uuidv4()}
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
          <button
            onClick={handleSubmitButton}
            className="border w-16 h-10 p-1 text-center rounded-lg border-gray-300 mt-5 bg-red-400 hover:bg-red-500 text-white font-bold hover:scale-90 transition ease-out"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskInput;
