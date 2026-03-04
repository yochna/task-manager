export default function TaskList({ tasks, onDelete, onEdit, onToggle }) {
  if (!tasks.length) return (
    <div className="empty">
      <div className="empty-icon">📭</div>
      <h3>No tasks here</h3>
      <p>Add a task above to get started</p>
    </div>
  )

  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task._id} className={`task-card ${task.completed ? 'completed' : ''} priority-${task.priority}`}>
          <div className="task-checkbox">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task)}
            />
          </div>

          <div className="task-content">
            <div className="task-title">{task.title}</div>
            {task.description && <div className="task-desc">{task.description}</div>}
            <div className="task-meta">
              <span className={`priority-badge ${task.priority}`}>
                {task.priority}
              </span>
            </div>
          </div>

          <div className="task-actions">
            <button className="edit-btn" onClick={() => onEdit(task)} title="Edit">✏️</button>
            <button className="delete-btn" onClick={() => onDelete(task._id)} title="Delete">🗑️</button>
          </div>
        </div>
      ))}
    </div>
  )
}