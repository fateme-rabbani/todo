import React, { useState } from "react";

const TaskItem = ({ task, changeStatus, removeTask }) => (
  <li key={task.id}>
    {task.desc}
    <button onClick={() => changeStatus(task.id, "todo")}>todo</button>
    <button onClick={() => changeStatus(task.id, "doing")}>doing</button>
    <button onClick={() => changeStatus(task.id, "done")}>done</button>
    <button onClick={() => removeTask(task.id)}>remove</button>
  </li>
);

const TaskList = ({ tasks, status, changeStatus, removeTask }) => (
  <ul>
    {tasks
      .filter((t) => t.status === status)
      .map((task) => (
        <TaskItem
          task={task}
          changeStatus={changeStatus}
          removeTask={removeTask}
        />
      ))}
  </ul>
);

let id = 0;
const makeId = () => id++;

const Todo = () => {
  const [tasks, setTasks] = useState([
    { id: makeId(), desc: "first", status: "todo" },
    { id: makeId(), desc: "second", status: "doing" },
    { id: makeId(), desc: "third", status: "done" },
  ]);
  const [taskInp, setTaskInp] = useState("");

  const handleChange = (event) => {
    setTaskInp(event.target.value);
  };

  const addTask = (newTask) => {
    setTasks([...tasks, { id: makeId(), desc: newTask, status: "todo" }]);
    setTaskInp("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTask = taskInp;
    if (!newTask) return alert("You must write something!");
    addTask(newTask);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((t) => id !== t.id));
  };

  const changeStatus = (id, newStatus) => {
    setTasks(
      tasks.map((task) => {
        if (task.id !== id) return task;
        return { ...task, status: newStatus };
      })
    );
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={taskInp} onChange={handleChange} />
        <input type="submit" value="Add" />
      </form>
      {["todo", "doing", "done"].map((status) => (
        <>
          <h1>{status}</h1>
          <TaskList
            tasks={tasks}
            status={status}
            changeStatus={changeStatus}
            removeTask={removeTask}
          />
        </>
      ))}
    </div>
  );
};

export default Todo;
