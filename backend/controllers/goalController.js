import Goal from "../models/Goal.js";

// Create Goal
export const createGoal = async (req, res) => {
  try {
    const { title, description, targetDate } = req.body;

    const goal = await Goal.create({
      title,
      description,
      targetDate,
    });

    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Goals
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find();

    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Goal
export const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Goal
export const deleteGoal = async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Goal Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};