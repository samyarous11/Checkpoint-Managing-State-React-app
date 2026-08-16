/**
 * TaskItem
 * Renders a single task with controls to toggle completion, edit, or delete it.
 * Completed tasks get a distinct visual style (strikethrough + muted colors).
 *
 * Props:
 * - task: { id, name, description, completed, createdAt }
 * - onToggleComplete(id)
 * - onEdit(task)
 * - onDelete(id)
 */
function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
  const handleDelete = () => {
    // Confirmation prompt before deleting, as required by the spec
    const confirmed = window.confirm(`Delete task "${task.name}"? This cannot be undone.`);
    if (confirmed) {
      onDelete(task.id);
    }
  };

  return (
    <li className={`task-item ${task.completed ? 'task-completed' : ''}`}>
      <div className="task-checkbox-wrapper">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
          aria-label={`Mark "${task.name}" as ${task.completed ? 'active' : 'completed'}`}
        />
      </div>

      <div className="task-content" onClick={() => onEdit(task)} title="Click to edit">
        <h3 className="task-name">{task.name}</h3>
        <p className="task-description">{task.description}</p>
      </div>

      <div className="task-actions">
        <span className={`status-badge ${task.completed ? 'status-done' : 'status-active'}`}>
          {task.completed ? 'Completed' : 'Active'}
        </span>
        <button
          type="button"
          className="btn btn-small btn-edit"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button
          type="button"
          className="btn btn-small btn-delete"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
