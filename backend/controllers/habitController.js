import Habit from "../models/Habit.js";

// Create Habit
export const createHabit = async (req, res) => {
  try {
    const habit = await Habit.create(req.body);

    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Habits
export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find();

    res.status(200).json(habits);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Habit
export const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(habit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Habit
export const deleteHabit = async (req, res) => {
  try {
    await Habit.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Habit Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};