require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const app = express()
const PORT = process.env.PORT || 5000

// app.use(cors({
//   origin: [
//     'https://task-manager-two-ochre.vercel.app', // <--- Add this new one!
//     'https://task-manager-447e.vercel.app',
//     'http://localhost:3000'
//   ],
//   credentials: true
// }))

// 1. Delete your old CORS block and replace it with this:
app.use(cors()); 

// 2. Instead of the app.options('*') that crashed, use this middleware:
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  
  // Handle the Preflight check manually to avoid the Express 5 router crash
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }
  next();
});
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

