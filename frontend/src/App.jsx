import React, { useEffect, useState } from "react";
import List from "./components/list";
import axios from "axios";
import { baseURL } from "./utils/constant";


const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [updateUI, setUpdateUI] = useState(false);
  const [updateID, setUpdateID] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`).then((res) => {
      console.log(res.data);
      setTasks(res.data);
    });
  }, [updateUI]);

  const addTask = () => {
    axios
      .post(`${baseURL}/save`, { task: input })
      .then((res) => console.log(res.data));
    setInput("");
    setUpdateUI((prevState) => !prevState);
  };

  const updateMode = (id,text) => {
    console.log(text);
    setInput(text);
    setUpdateID(id);
  };

  const updateTask = () => {
    axios
      .put(`${baseURL}/update/${updateID}`, { task: input })
      .then((res) => console.log(res.data));
    setInput("");
    setUpdateUI((prevState) => !prevState);
    setUpdateID(null);
  };
  return (
    <>
      <h1>Crud Operations</h1>
      <div className="input_holder">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={updateID ? updateTask : addTask} type="submit">
          { updateID ? "Update Task" : "Add Task"}
        </button>
      </div>
      <ul>
        {tasks.map((task) => (
          <List
            key={task._id}
            id={task._id}
            task={task.task}
            setUpdateUI={setUpdateUI}
            updateMode={updateMode}
          />
        ))}
      </ul>
    </>
  );
};

export default App;
