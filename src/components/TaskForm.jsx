import { useState, useEffect } from 'react';

/**
 * TaskForm
 * A dual-purpose form used both for creating a new task and for editing
 * an existing one. When `editingTask` is provided, the form is pre-filled
 * with that task's details and switches into "update" mode.
 *
 * Props:
 * - onSave(taskData): called with { name, description } when the form is validly submitted
 * - editingTask: the task object currently being edited, or null if adding a new task
 * - onCancelEdit(): called when the user cancels an in-progress edit
 */
function TaskForm({ onSave, editingTask, onCancelEdit }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  // Whenever we start editing a different task, populate the form fields.
  // When editingTask becomes null again (edit cancelled/saved), clear the form.
  useEffect(() => {
    if (editingTask) {
      setName(editingTask.name);
      setDescription(editingTask.description);
    } else {
      setName('');
      setDescription('');
    }
    setErrors({});
  }, [editingTask]);

  // Validate that both fields are non-empty (after trimming whitespace)
  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Task name is required.';
    if (!description.trim()) newErrors.description = 'Description is required.';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave({ name: name.trim(), description: description.trim() });

    // Reset the form after a successful add (edit mode is reset via the
    // useEffect above once editingTask is cleared by the parent).
    if (!editingTask) {
      setName('');
      setDescription('');
    }
    setErrors({});
  };

  return (
    <form className="task-form" onSubmit={handleSubmit} noValidate>
      <h2>{editingTask ? 'Edit Task' : 'Add a New Task'}</h2>

      <div className="form-field">
        <label htmlFor="task-name">Task Name</label>
        <input
          id="task-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Buy groceries"
          className={errors.name ? 'input-error' : ''}
        />
        {errors.name && <span className="error-text">{errors.name}</span>}
      </div>

      <div className="form-field">
        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. Milk, eggs, bread, and coffee"
          rows={3}
          className={errors.description ? 'input-error' : ''}
        />
        {errors.description && <span className="error-text">{errors.description}</span>}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingTask ? 'Update Task' : 'Add Task'}
        </button>
        {editingTask && (
          <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
