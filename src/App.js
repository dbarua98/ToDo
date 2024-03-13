import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import { MdModeEdit } from "react-icons/md";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (task.trim() !== "" && description.trim() !== "") {
      setTodos([...todos, { id: uuidv4(), title: task, description }]);
      setTask("");
      setDescription("");
    }
  };

  const removeTodo = (id) => {
    setDeleteTaskId(id);
  };

  const confirmRemoveTodo = () => {
    const updatedTodos = todos.filter((todo) => todo.id !== deleteTaskId);
    setTodos(updatedTodos);
    setDeleteTaskId(null);
  };

  const startEditing = (id, title, description) => {
    setTask(title);
    setDescription(description);
    setEditingTaskId(id);
  };

  const updateTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: task, description } : todo
    );
    setTodos(updatedTodos);
    setTask("");
    setDescription("");
    setEditingTaskId(null);
  };
  const toggleButtons = (id) => {
    setSelectedTaskId(selectedTaskId === id ? null : id);
  };

  return (
    <div
      className="App"
      style={{ backgroundColor: "#1B1A17", color: "white", height: "100vh" }}
    >
      <div className="border-orange mb-5 d-flex d-none d-md-block">
        Todo App
      </div>
      <div className="justify-content-center d-flex gap-2 p-md-0 p-4 align-items-center">
        <div className="d-flex flex-column gap-2 w-50 ">
          <input
            className="border-orange"
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter task title"
          />
          <textarea
            className="border-orange"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
          />
        </div>
        {editingTaskId ? (
          <>
            <button
              className="border-orange h-100"
              onClick={() => updateTodo(editingTaskId)}
            >
              Update
            </button>
          </>
        ) : (
          <button
            className="border-orange h-100 px-3 "
            style={{ color: " #FF8303", fontSize: "30px" }}
            onClick={addTodo}
          >
            {"+"}
          </button>
        )}
      </div>
      <ul
        style={{ listStyle: "none" }}
        className="container flex-wrap d-flex gap-5 my-5 border-orange-ul p-5"
      >
        {todos.length === 0 ? (
          <p
            className="mx-auto"
            style={{
              borderTop: "2px solid #FF8303",
              borderBottom: "2px solid #FF8303",
            }}
          >
            No tasks
          </p>
        ) : (
          todos.map((todo) => (
            <>
              <li
                key={todo.id}
                className="border-orange d-md-flex flex-column flex-md-row justify-content-between align-items-center d-none  w-100 "
              >
                <div className="me-3 custom-text-wrap">
                  <strong>{todo.title}</strong>
                  <p>{todo.description}</p>
                </div>
                {selectedTaskId === todo.id ? (
                  <div>
                    <button
                      className="border-orange m-2"
                      onClick={() =>
                        startEditing(todo.id, todo.title, todo.description)
                      }
                    >
                      <MdModeEdit style={{ color: "white" }} />
                    </button>
                    <button
                      className="border-orange"
                      onClick={() => removeTodo(todo.id)}
                    >
                      <CgClose style={{ color: "#FF8303" }} />
                    </button>
                  </div>
                ) : (
                  <button
                    className="border-orange px-4 d-none d-md-block"
                    onClick={() => toggleButtons(todo.id)}
                  >
                    i
                  </button>
                )}
              </li>
              <li
                onClick={() => toggleButtons(todo.id)}
                key={todo.id}
                className="d-flex flex-column col  d-block d-md-none gap-1 w-100"
              >
                <div className="border-orange col-12 col-md-auto justify-content-between d-flex">
                  <div className="me-3 w-50 custom-text-wrap">
                    <strong>{todo.title}</strong>
                    <p>{todo.description}</p>
                  </div>

                  <button
                    className="border-orange d-md-none w-25 h-25"
                    onClick={() => removeTodo(todo.id)}
                  >
                    <CgClose style={{ color: "#FF8303" }} />
                  </button>
                </div>
                {selectedTaskId === todo.id ? (
                  <div className="gap-4 d-block d-md-none d-flex justify-content-end">
                    <button
                      className="border-orange"
                      onClick={() =>
                        startEditing(todo.id, todo.title, todo.description)
                      }
                    >
                      <MdModeEdit style={{ color: "white" }} />
                    </button>
                    <button
                      className="border-orange"
                      onClick={() => removeTodo(todo.id)}
                    >
                      <CgClose style={{ color: "#FF8303" }} />
                    </button>
                  </div>
                ) : (
                  <button
                    className="border-orange px-4 d-none d-md-block"
                    onClick={() => toggleButtons(todo.id)}
                  >
                    i
                  </button>
                )}
              </li>
            </>
          ))
        )}
      </ul>
      <Modal
        className="col"
        show={deleteTaskId !== null}
        onHide={() => setDeleteTaskId(null)}
      >
        <Modal.Body
          style={{
            borderTop: "5px solid #FF8303",
            background: "#1F1E1B",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Delete this task?
        </Modal.Body>
        <Modal.Footer
          style={{
            background: "#1F1E1B",
            border: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button className="border-orange px-3" onClick={confirmRemoveTodo}>
            Yes
          </button>
          <button
            className="border-orange px-3"
            onClick={() => setDeleteTaskId(null)}
          >
            No
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TodoApp;
