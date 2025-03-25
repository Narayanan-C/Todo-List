import "./App.css";
import { useEffect, useState } from "react";

//Components
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  const [data, setData] = useState([]);
  const [dataFromChild, setDataFromChild] = useState("");

  function getDataFromChild(dataId, isEditOn, setIsEdit) {
    setDataFromChild({ id: dataId, isEdit: isEditOn, setIsEdit: setIsEdit });
  }

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setData(storedTasks);
  }, []);

  return (
    <div>
      <Header />
      <TaskInput setData={setData} data={data} dataFromChild={dataFromChild} />
      <TaskList
        data={data}
        setData={setData}
        getDataFromChild={getDataFromChild}
      />
    </div>
  );
}

export default App;
