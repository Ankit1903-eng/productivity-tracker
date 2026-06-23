import { useState, useEffect } from "react";
import "./Habits.css";

function Habits() {
  const [habit, setHabit] = useState("");

  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem("habits");

    return savedHabits
      ? JSON.parse(savedHabits)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "habits",
      JSON.stringify(habits)
    );
  }, [habits]);

  const handleAddHabit = () => {
    if (habit.trim() === "") return;

    const newHabit = {
      id: Date.now(),
      text: habit,
      completed: false,
    };

    setHabits([...habits, newHabit]);

    setHabit("");
  };

  const handleDeleteHabit = (id) => {
    const updatedHabits = habits.filter(
      (habit) => habit.id !== id
    );

    setHabits(updatedHabits);
  };

  const handleToggleHabit = (id) => {
    const updatedHabits = habits.map((habit) =>
      habit.id === id
        ? {
            ...habit,
            completed: !habit.completed,
          }
        : habit
    );

    setHabits(updatedHabits);
  };

  return (
    <div className="habits-page">
      <h1>Habits Tracker</h1>

      <div className="input-section">
        <input
          className="habit-input"
          type="text"
          placeholder="Enter Habit"
          value={habit}
          onChange={(e) =>
            setHabit(e.target.value)
          }
        />

        <button
          className="add-btn"
          onClick={handleAddHabit}
        >
          Add Habit
        </button>
      </div>

      <hr />

      <h2>My Habits</h2>

      <div className="habits-list">
        {habits.map((item) => (
          <div
            className="habit-item"
            key={item.id}
          >
            <div className="habit-left">
              <button
                className="complete-btn"
                onClick={() =>
                  handleToggleHabit(item.id)
                }
              >
                {item.completed ? "✅" : "⬜"}
              </button>

              <span
                style={{
                  textDecoration:
                    item.completed
                      ? "line-through"
                      : "none",

                  color:
                    item.completed
                      ? "#22c55e"
                      : "white",
                }}
              >
                {item.text}
              </span>
            </div>

            <button
              className="delete-btn"
              onClick={() =>
                handleDeleteHabit(item.id)
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

export default Habits;