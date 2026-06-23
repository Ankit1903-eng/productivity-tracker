import express from "express";

import {
  createHabit,
  getHabits,
  updateHabit,
  deleteHabit,
} from "../controllers/habitController.js";

const router = express.Router();

router.post("/", createHabit);

router.get("/", getHabits);

router.put("/:id", updateHabit);

router.delete("/:id", deleteHabit);

export default router;