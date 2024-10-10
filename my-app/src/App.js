import "./styles.css";
import TodoList from "./TodoList";
import TodoListHeader from "./TodoListHeader";
import Form from "./Form";
import Footer from "./Footer";
import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [checkComplete, setCheckComplete] = useState(false);
  const [dataRender, setDataRender] = useState([]);
  const location = useLocation(); // Lấy thông tin về URL hiện tại

  // Hàm để cập nhật tasks và dataRender, và lưu vào localStorage
  function handleChange(newTasks) {
    setTasks(newTasks);
    setDataRender(newTasks); // Cập nhật luôn dataRender để hiển thị
    localStorage.setItem("tasks", JSON.stringify(newTasks)); // Cập nhật localStorage
  }

  // Lấy dữ liệu từ localStorage và xử lý dựa trên tham số URL khi component được load
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) {
      setTasks(savedTasks);
    }

    // Đọc tham số từ URL
    const params = new URLSearchParams(location.search);
    const withDone = params.get("withDone");
    console.log(withDone);

    if (withDone === "1") {
      // Hiển thị chỉ các task đã hoàn thành
      const completedTasks = savedTasks
        ? savedTasks.filter((task) => task.complete)
        : [];
      setDataRender(completedTasks);
    } else if (withDone === "2") {
      const incompleteTasks = savedTasks
        ? savedTasks.filter((task) => !task.complete)
        : [];
      setDataRender(incompleteTasks);
    } else {
      setDataRender(savedTasks || []);
    }
  }, [location.search]); // Chỉ chạy lại khi URL search parameters thay đổi

  // Hàm để lọc và hiển thị các task chưa hoàn thành khi nhấn checkbox
  function inputCheckbox() {
    setCheckComplete(!checkComplete);
    if (!checkComplete) {
      const incompleteTasks = tasks.filter((item) => !item.complete);
      setDataRender(incompleteTasks);
    } else {
      setDataRender(tasks); // Hiển thị lại toàn bộ tasks khi bỏ checkbox
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="checkComplete">
          <input
            type="checkbox"
            checked={checkComplete} // Sử dụng checked thay vì value
            onChange={inputCheckbox}
          />
          <p>Nhiệm vụ chưa hoàn thành</p>
        </div>
        <TodoListHeader tasks={dataRender} />
        <TodoList tasks={dataRender} handleChange={handleChange} />
        <Form tasks={tasks} handleChange={handleChange} />
      </div>
      <Footer />
    </div>
  );
};
