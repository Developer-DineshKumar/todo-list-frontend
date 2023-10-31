import React, { useState, useEffect } from "react";
import Task from "./Task";
import "./Home.css";
import axios from "axios";
import { MdDelete, MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

const Home = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api")
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  };

  const handleCheck = (id) => {
    axios
      .put("http://localhost:5000/update/" + id)
      .then(() => {
        // Update the "todos" state to reflect the task as done
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo._id === id ? { ...todo, done: !todo.done } : todo
          )
        );
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then((response) => {
        if (response.status === 200) {
          // Remove the deleted task from the state
          setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
        } else {
          console.error(
            "Failed to delete task. Status code: ",
            response.status
          );
        }
      })
      .catch((error) => {
        console.error("An error occurred while deleting the task: ", error);
      });
  };

  return (
    <div className="home">
      <h1>Todo-List</h1>
      <Task onTaskAdded={fetchData} />
      {todos.length === 0 ? (
        <div>
          <h2>No Data</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div key={todo._id} className="data">
            <div className="checkbox" onClick={() => handleCheck(todo._id)}>
              {todo.done ? (
                <MdCheckBox className="icon" />
              ) : (
                <MdCheckBoxOutlineBlank className="icon" />
              )}

              <p style={{ textDecoration: todo.done ? "line-through" : "" }}>
                {todo.task}
              </p>
            </div>
            <div>
              <button onClick={() => handleDelete(todo._id)}>
                <MdDelete className="icon" />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
