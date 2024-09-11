import React, { useEffect, useState } from 'react';
import List from './components/List.js';
import axios from 'axios';
import { baseURL } from './utils/constant.js';

const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]); // Initialize as an empty array
  const [updateUI, setUpdateUI] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    axios.get(`${baseURL}/get`)
      .then(res => {
        console.log(res.data);
        setTasks(res.data); // Correctly set tasks from response data
      })
      .catch(err => console.error(err)); // Added error handling
  }, [updateUI]);

  const addTask = () => {
    axios.post(`${baseURL}/save`, { task: input }) // Use `/save` if that matches your backend
      .then((res) => {
        console.log(res.data);
        setInput("");
        setUpdateUI(prevState => !prevState);
      })
      .catch(err => console.error(err)); // Added error handling
  };

  const updateMode = (id, text) => {
    console.log(text);
    setInput(text);
    setUpdateId(id);
  };

  const updateTask = () => {
    axios.put(`${baseURL}/update/${updateId}`, { task: input })
      .then((res) => {
        console.log(res.data);
        setUpdateUI(prevState => !prevState);
        setUpdateId(null);
        setInput("");
      })
      .catch(err => console.error(err)); // Added error handling
  };

  return (
    <main>
      <h1 className='title'>
        CRUD Application
      </h1>
      <div className="input_holder">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type='submit' onClick={updateId ? updateTask : addTask}>
          {updateId ? 'Update Task' : 'Add Task'}
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
    </main>
  );
};

export default App;
