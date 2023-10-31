import React, { useState } from "react";
import "./Task.css";
import axios from "axios";

const Task = ({ onTaskAdded }) => {
  const [task, setTask] = useState("");

  const handleAdd = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api", { task });
      onTaskAdded(response.data); // Notify the parent component (Home) about the new task
      setTask("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="task">
      <input
        type="text"
        placeholder="Enter Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
};

export default Task;
