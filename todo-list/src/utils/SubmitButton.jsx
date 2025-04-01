import { v4 as uuidv4 } from "uuid";

const SubmitButton = (
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
) => {
  if (inputTitle.trim() || inputDescription.trim() !== "") {
    const newTask = {
      id: uuidv4(),
      title: inputTitle,
      description: inputDescription,
      priority: {
        name: selectedPriority,
        colorCode: priorityColors[selectedPriority],
      },
      dueDate: inputDate,
      status: "On going",
    };

    setData((prevData) => [...prevData, newTask]);

    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(storedTasks));

    setInputTitle("");
    setInputDescription("");
    setInputDate("");
    setSelectedPriority(null);
  } else {
    alert("please provide an task");
  }
};

export default SubmitButton;
