const ConfirmButton = (
  data,
  dataFromChild,
  inputTitle,
  inputDescription,
  selectedPriority,
  priorityColors,
  inputDate,
  setData
) => {
  const indexOfData = data.findIndex((item) => item.id === dataFromChild?.id);

  const updatedData = [...data];

  updatedData[indexOfData] = {
    id: dataFromChild.id,
    title: inputTitle,
    description: inputDescription,
    priority: {
      name: selectedPriority,
      colorCode: priorityColors[selectedPriority],
    },
    dueDate: inputDate,
    status: "On going",
  };

  setData(updatedData);
  dataFromChild?.setIsEdit(false);
  dataFromChild.id = null;
  dataFromChild.isEdit = null;

  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks[indexOfData] = updatedData[indexOfData];
  localStorage.setItem("tasks", JSON.stringify(storedTasks));
  return <div>ConfirmButton</div>;
};

export default ConfirmButton;
