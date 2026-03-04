# ✅ TaskFlow — Task Manager App

A full-stack task management application built with React, Node.js, Express, and MongoDB. Features JWT authentication, task prioritization, and a sleek dark UI.

---

## 🚀 Features

- 🔐 User authentication (Signup / Login) with JWT
- ✅ Create, edit, delete, and complete tasks
- 🎯 Task priority levels — High, Medium, Low
- 📝 Optional task descriptions
- 🔵 Filter tasks — All, Active, Completed, High Priority
- 📊 Live task counters in header
- 🌙 Dark theme UI with smooth animations
- 🔒 Passwords hashed with bcrypt
- 📦 Data stored in MongoDB per user

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, React Router, Axios |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Auth | JWT (jsonwebtoken), bcryptjs |
| Styling | Custom CSS, Google Fonts |

---

## 📁 Project Structure

```
task-manager/
├── backend/
│   ├── models/
│   │   ├── User.js        # User schema
│   │   └── Task.js        # Task schema
│   ├── routes/
│   │   ├── auth.js        # Signup & Login routes
│   │   └── tasks.js       # CRUD task routes
│   ├── middleware/
│   │   └── auth.js        # JWT middleware
│   ├── server.js          # Express server entry point
│   └── .env               # Environment variables (not committed)
└── frontend/
    └── src/
        ├── pages/
        │   ├── Login.js
        │   ├── Signup.js
        │   └── Dashboard.js
        ├── components/
        │   ├── TaskForm.js
        │   └── TaskList.js
        ├── App.js
        ├── index.css
        └── dashboard.css
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js installed
- MongoDB installed locally

### 1. Clone the repository
```bash
git clone https://github.com/yochna/task-manager.git
cd task-manager
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:
```env
MONGO_URI="mongodb://localhost:27017/taskmanager"
JWT_SECRET="your_random_secret_key_here"
PORT=5000
```

> ⚠️ Never commit your `.env` file. It is listed in `.gitignore` for security.

Generate a strong JWT secret by running:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Start the backend:
```bash
node server.js
```

You should see:
```
MongoDB connected
Server running on http://localhost:5000
```

### 3. Setup Frontend
```bash
cd ../frontend
npm install
npm start
```

App opens at `http://localhost:3000`

---

## 🖥️ Running the App

You need **2 terminal windows** open at all times:

| Terminal | Command | URL |
|----------|---------|-----|
| Backend | `cd backend && node server.js` | http://localhost:5000 |
| Frontend | `cd frontend && npm start` | http://localhost:3000 |

> ⚠️ If port 5000 is busy, find and kill the process:
> ```cmd
> netstat -ano | findstr :5000
> taskkill /PID <number> /F
> ```

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` folder with the following:

```env
MONGO_URI="mongodb://localhost:27017/taskmanager"
JWT_SECRET="your_secret_key_here"
PORT=5000
```

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `PORT` | Port for the Express server |

> 🔒 The `.env` file is in `.gitignore` and will never be committed to GitHub.

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register a new user |
| POST | `/api/auth/login` | Login and get JWT token |

### Tasks (Protected — requires JWT)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks for logged in user |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## 👨‍💻 Author

**Yochna**
- GitHub: [@yochna](https://github.com/yochna)
