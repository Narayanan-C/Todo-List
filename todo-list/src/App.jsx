import "./App.css";
import { useEffect, useState } from "react";

//Components
import Header from "./components/Header";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setData(storedTasks);
  }, []);

  return (
    <div>
      <Header />
      <TaskInput setData={setData} data={data} />
      <TaskList data={data} setData={setData} />
    </div>
  );
}

export default App;
