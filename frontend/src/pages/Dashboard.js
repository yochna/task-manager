import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import '../Dashboard.css'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000'

const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem('token')}`
})

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [editTask, setEditTask] = useState(null)
  const [filter, setFilter] = useState('all')
  const navigate = useNavigate()

  const logout = useCallback(() => {
    localStorage.clear()
    navigate('/login')
  }, [navigate])

  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/tasks`, { headers: getHeaders() })
      setTasks(res.data)
    } catch (err) {
      if (err.response?.status === 401) logout()
    }
  }, [logout])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const addTask = async (task) => {
    await axios.post(`${API_URL}/api/tasks`, task, { headers: getHeaders() })
    fetchTasks()
  }

  const updateTask = async (id, updated) => {
    await axios.put(`${API_URL}/api/tasks/${id}`, updated, { headers: getHeaders() })
    setEditTask(null)
    fetchTasks()
  }

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/api/tasks/${id}`, { headers: getHeaders() })
    fetchTasks()
  }

  const toggleComplete = async (task) => {
    await axios.put(`${API_URL}/api/tasks/${task._id}`, { completed: !task.completed }, { headers: getHeaders() })
    fetchTasks()
  }

  const filteredTasks = tasks.filter(t => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    if (filter === 'high') return t.priority === 'high'
    return true
  })

  const completedCount = tasks.filter(t => t.completed).length
  const activeCount = tasks.filter(t => !t.completed).length

  return (
    <div className="dashboard">
      <div className="dash-header">
        <div className="dash-header-left">
          <div className="header-logo">✓</div>
          <h1>Task<span>Flow</span></h1>
        </div>
        <div className="header-right">
          <div className="task-stats">
            <span className="stat-pill active">{activeCount} active</span>
            <span className="stat-pill">{completedCount} done</span>
          </div>
          <button className="logout-btn" onClick={logout}>Sign out</button>
        </div>
      </div>

      <div className="dash-content">
        <TaskForm
          onSubmit={editTask ? (data) => updateTask(editTask._id, data) : addTask}
          editTask={editTask}
          onCancel={() => setEditTask(null)}
        />

        <div className="filter-bar">
          {['all', 'active', 'completed', 'high'].map(f => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? '⚡ All' :
               f === 'active' ? '🔵 Active' :
               f === 'completed' ? '✅ Completed' : '🔴 High Priority'}
            </button>
          ))}
        </div>

        <div className="section-header">
          <span className="section-title">
            {filter === 'all' ? 'All Tasks' :
             filter === 'active' ? 'Active Tasks' :
             filter === 'completed' ? 'Completed' : 'High Priority'}
          </span>
          <span className="task-count">{filteredTasks.length} tasks</span>
        </div>

        <TaskList
          tasks={filteredTasks}
          onDelete={deleteTask}
          onEdit={setEditTask}
          onToggle={toggleComplete}
        />
      </div>
    </div>
  )
}