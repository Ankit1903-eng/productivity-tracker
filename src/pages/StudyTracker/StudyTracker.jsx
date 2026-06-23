import { useState, useEffect } from "react";
import "./StudyTracker.css";

function StudyTracker() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [hours, setHours] = useState("");

  const [tasks, setTasks] = useState(() => {
    const savedTasks =
      localStorage.getItem("studyTasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "studyTasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  const handleAddTask = () => {
    if (
      subject.trim() === "" ||
      topic.trim() === "" ||
      hours.trim() === ""
    ) {
      return;
    }

    const newTask = {
      id: Date.now(),
      subject,
      topic,
      hours: Number(hours),
      date: new Date().toLocaleDateString(),
      completed: false,
    };

    setTasks([...tasks, newTask]);

    setSubject("");
    setTopic("");
    setHours("");
  };

  const handleToggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            completed: !task.completed,
          }
        : task
    );

    setTasks(updatedTasks);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(updatedTasks);
  };

  return (
    <div className="study-page">
      <h1>Study Tracker</h1>

      <div className="input-section">

        <input
          type="text"
          placeholder="Subject Name"
          value={subject}
          onChange={(e) =>
            setSubject(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Topic Name"
          value={topic}
          onChange={(e) =>
            setTopic(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Hours"
          value={hours}
          onChange={(e) =>
            setHours(e.target.value)
          }
        />

        <button
          onClick={handleAddTask}
        >
          Add Task
        </button>

      </div>

      <div className="task-list">

        {tasks.map((task) => (
          <div
            className="task-item"
            key={task.id}
          >
            <div className="task-info">

              <div className="task-header">

                <button
                  className="complete-btn"
                  onClick={() =>
                    handleToggleTask(task.id)
                  }
                >
                  {task.completed
                    ? "✅"
                    : "⬜"}
                </button>

                <span
                  className="task-topic"
                  style={{
                    textDecoration:
                      task.completed
                        ? "line-through"
                        : "none",

                    color:
                      task.completed
                        ? "#22c55e"
                        : "white",
                  }}
                >
                  {task.topic}
                </span>

              </div>

              <p className="task-subject">
                📚 {task.subject}
              </p>

              <p className="task-hours">
                ⏱ {task.hours} Hours
              </p>

              <p className="task-date">
                📅 {task.date}
              </p>

            </div>

            <button
              className="delete-btn"
              onClick={() =>
                handleDeleteTask(task.id)
              }
            >
              ❌
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}

export default StudyTracker;