
const express = require("express")
const Task = require("../models/Task")
const auth = require("../middleware/auth")
const router = express.Router()

// Get all tasks for logged in user
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 })
  res.json(tasks)
})

// Create task
router.post("/", auth, async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user.id })
    res.status(201).json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Update task
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    )
    if (!task) return res.status(404).json({ error: "Task not found" })
    res.json(task)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Delete task
router.delete("/:id", auth, async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router