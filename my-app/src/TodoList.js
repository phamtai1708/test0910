import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";
import "./App.css";
const TodoList = ({ tasks, handleChange }) => {
  const toggleTaskCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, complete: !task.complete } : task
    );
    handleChange(updatedTasks);
  };

  return (
    <div className="todo-list-container">
      {tasks.map((task) => (
        <div key={task.id} className="todo-item-container">
          {task.complete ? (
            <FaRegCheckCircle
              color="#9a9a9a"
              className="item-done-button"
              onClick={() => toggleTaskCompletion(task.id)}
            />
          ) : (
            <FaRegCircle
              color="#9a9a9a"
              className="item-done-button"
              onClick={() => toggleTaskCompletion(task.id)}
            />
          )}
          <div className={`item-title ${task.complete ? "done" : ""}`}>
            {task.text}
          </div>
          <div className="taskDate">{!task.complete ? task.date : ""}</div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
