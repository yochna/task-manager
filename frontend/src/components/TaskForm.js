import { useState, useEffect } from 'react'

export default function TaskForm({ onSubmit, editTask, onCancel }) {
  const [form, setForm] = useState({ title: '', description: '', priority: 'medium' })

  useEffect(() => {
    if (editTask) setForm({ title: editTask.title, description: editTask.description || '', priority: editTask.priority })
    else setForm({ title: '', description: '', priority: 'medium' })
  }, [editTask])

  const handleSubmit = () => {
    if (!form.title.trim()) return
    onSubmit(form)
    setForm({ title: '', description: '', priority: 'medium' })
  }

  return (
    <div className="task-form">
      <p className="form-title">{editTask ? '✏️ Edit Task' : '+ New Task'}</p>

      <input
        placeholder="What needs to be done?"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        style={{ marginBottom: '0.75rem' }}
        onKeyDown={e => e.key === 'Enter' && handleSubmit()}
      />

      <div className="form-row-2">
        <textarea
          placeholder="Add a description... (optional)"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          rows={2}
        />
        <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
          <option value="low">🟢 Low</option>
          <option value="medium">🟡 Medium</option>
          <option value="high">🔴 High</option>
        </select>
      </div>

      <div className="form-btns">
        <button onClick={handleSubmit}>
          {editTask ? '✅ Update Task' : '➕ Add Task'}
        </button>
        {editTask && (
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </div>
  )
}