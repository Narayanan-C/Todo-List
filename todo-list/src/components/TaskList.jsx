import { useState } from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ data, setData, getDataFromChild, toggleVisibility }) => {
  console.log(toggleVisibility);
  const [sortDropMenu, setSortDropMenu] = useState(false); // sort drop down toggle function

  const [sortToggle, setSortToggle] = useState({
    // sort button toggle function
    filteredToggle: false,
    prioritySortToggle: false,
  });
  const [filteredData, setFilteredData] = useState([]);
  const [prioritySort, setPrioritySort] = useState([]);

  const handleSortHover = () => {
    setSortDropMenu(true);
  };

  const handleSortByPriority = () => {
    const sortedData = [...data].sort((a, b) => {
      if (a.priority.name > b.priority.name) return 1;
      if (a.priority.name < b.priority.name) return -1;
      return 0;
    });

    setPrioritySort(sortedData);

    setSortToggle((prev) => ({
      ...prev,
      prioritySortToggle: !prev.prioritySortToggle,
    }));
  };

  const handleSortByComplete = () => {
    const filteredData = data.filter((item) => item.status === "Completed");
    setSortToggle((prev) => ({
      ...prev,
      filteredToggle: !prev.filteredToggle,
    }));
    setFilteredData(filteredData);
  };

  let dataToRender;

  if (sortToggle.filteredToggle) {
    dataToRender = filteredData;
  } else if (sortToggle.prioritySortToggle) {
    dataToRender = prioritySort;
  } else {
    dataToRender = data;
  }

  return (
    <>
      {!toggleVisibility && (
        <div className="flex flex-col items-center ">
          <h1 className=" text-center absolute font-bold mt-3">On Progress</h1>
          <div className=" w-[600px] flex justify-end">
            <button
              onMouseEnter={handleSortHover}
              className="mt-4 w-15 hover:cursor-pointer border rounded border-gray-300 hover:border-black hover:bg-[#F0E0DD] transition ease-out"
            >
              Sort
            </button>
            {sortDropMenu && (
              <div
                className=" absolute mt-12 left-310 flex flex-col"
                onMouseLeave={() => setSortDropMenu(false)}
              >
                <button
                  onClick={handleSortByComplete}
                  className="border-1 w-26 rounded hover:scale-110 transition ease-out border-gray-400 mb-1 bg-pink-700 text-white hover:cursor-pointer"
                >
                  byComplete
                </button>
                <button
                  onClick={handleSortByPriority}
                  className="border w-26 rounded hover:scale-110 transition ease-out border-gray-400 mb-1 bg-pink-700 text-white hover:cursor-pointer"
                >
                  byPriority
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            {dataToRender.map((f_item) => (
              <TaskItem
                item={f_item}
                key={f_item.id}
                setData={setData}
                data={data}
                getDataFromChild={getDataFromChild}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default TaskList;
