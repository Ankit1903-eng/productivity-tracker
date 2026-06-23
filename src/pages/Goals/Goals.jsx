import { useState, useEffect } from "react";
import "./Goals.css";

function Goals() {
  const [goal, setGoal] = useState("");

  const [goals, setGoals] = useState(() => {
    const savedGoals = localStorage.getItem("goals");

    return savedGoals
      ? JSON.parse(savedGoals)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "goals",
      JSON.stringify(goals)
    );
  }, [goals]);

  const handleAddGoal = () => {
    if (goal.trim() === "") return;

    const newGoal = {
      id: Date.now(),
      text: goal,
      completed: false,
    };

    setGoals([...goals, newGoal]);

    setGoal("");
  };

  const handleDeleteGoal = (id) => {
    const updatedGoals = goals.filter(
      (goal) => goal.id !== id
    );

    setGoals(updatedGoals);
  };

  const handleToggleGoal = (id) => {
    const updatedGoals = goals.map((goal) =>
      goal.id === id
        ? {
            ...goal,
            completed: !goal.completed,
          }
        : goal
    );

    setGoals(updatedGoals);
  };

  return (
    <div className="goals-page">
      <h1>Goals Page</h1>

      <div className="input-section">
        <input
          className="goal-input"
          type="text"
          placeholder="Enter Goal"
          value={goal}
          onChange={(e) =>
            setGoal(e.target.value)
          }
        />

        <button
          className="add-btn"
          onClick={handleAddGoal}
        >
          Add Goal
        </button>
      </div>

      <hr />

      <h2>My Goals</h2>

      <div className="goals-list">
        {goals.length === 0 ? (
          <p>No Goals Added Yet</p>
        ) : (
          goals.map((item) => (
            <div
              className="goal-item"
              key={item.id}
            >
              <div className="goal-left">

                <button
                  className="complete-btn"
                  onClick={() =>
                    handleToggleGoal(item.id)
                  }
                >
                  {item.completed
                    ? "✅"
                    : "⬜"}
                </button>

               <span
  style={{
    textDecoration: item.completed
      ? "line-through"
      : "none",

    color: item.completed
      ? "#22c55e"
      : "white",

    opacity: 1,
  }}
>
  {item.text}
</span>

              </div>

              <button
                className="delete-btn"
                onClick={() =>
                  handleDeleteGoal(item.id)
                }
              >
                ❌
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Goals;