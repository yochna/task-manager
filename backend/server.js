require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: [
    'https://task-manager-two-ochre.vercel.app', // <--- Add this new one!
    'https://task-manager-447e.vercel.app',
    'http://localhost:3000'
  ],
  credentials: true
}))
app.use(express.json())

// Routes
app.get("/test", (req, res) => res.json({ message: "Server works!" }))
app.use("/api/auth", require("./routes/auth"))
app.use("/api/tasks", require("./routes/tasks"))

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err))

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))

