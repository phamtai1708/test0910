import { useState } from "react";

const Form = ({ tasks, handleChange }) => {
  const [value, setValue] = useState("");

  const typeNewTask = (e) => {
    setValue(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (value) {
      const newTask = {
        id: crypto.randomUUID(),
        text: value,
        complete: false,
        date: Math.floor(Math.random() * 9) + 1,
      };
      const updatedTasks = [...tasks, newTask];
      handleChange(updatedTasks); // Gọi hàm handleChange sau khi thêm task
      setValue(""); // Reset input field
    }
  };

  return (
    <form className="form" onSubmit={addTask}>
      <input
        placeholder="Enter task ..."
        value={value}
        onChange={typeNewTask}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
