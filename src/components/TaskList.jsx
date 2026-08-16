import TaskItem from './TaskItem.jsx';

/**
 * TaskList
 * Renders the filtered list of tasks, or an empty-state message if there
 * are none to show. Also renders the filter buttons (All / Active / Completed).
 *
 * Props:
 * - tasks: full array of task objects
 * - filter: current filter value ('all' | 'active' | 'completed')
 * - onFilterChange(filter)
 * - onToggleComplete(id)
 * - onEdit(task)
 * - onDelete(id)
 */
function TaskList({ tasks, filter, onFilterChange, onToggleComplete, onEdit, onDelete }) {
  // Apply the active filter to decide which tasks to display
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all'
  });

  const activeCount = tasks.filter((t) => !t.completed).length;
  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="task-list-section">
      <div className="filter-bar">
        <button
          className={`filter-btn ${filter === 'all' ? 'filter-active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          All ({tasks.length})
        </button>
        <button
          className={`filter-btn ${filter === 'active' ? 'filter-active' : ''}`}
          onClick={() => onFilterChange('active')}
        >
          Active ({activeCount})
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'filter-active' : ''}`}
          onClick={() => onFilterChange('completed')}
        >
          Completed ({completedCount})
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p className="empty-state">
          {tasks.length === 0
            ? 'No tasks yet. Add your first task above!'
            : 'No tasks match this filter.'}
        </p>
      ) : (
        <ul className="task-list">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
