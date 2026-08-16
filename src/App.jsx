import { useState } from 'react';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import './App.css';

/**
 * App
 * Top-level component. Owns the single source of truth for the tasks array
 * (persisted via the useLocalStorage hook) and the currently-edited task /
 * active filter. Passes data and handler callbacks down to TaskForm and
 * TaskList, which stay purely presentational.
 */
function App() {
  // `tasks` is automatically loaded from localStorage on first render,
  // and automatically saved back to localStorage on every change.
  const [tasks, setTasks] = useLocalStorage('todo-app-tasks', []);

  // The task currently being edited (null = we're in "add" mode)
  const [editingTask, setEditingTask] = useState(null);

  // Current filter: 'all' | 'active' | 'completed'
  const [filter, setFilter] = useState('all');

  // Add a new task or update an existing one, depending on whether
  // editingTask is set.
  const handleSave = ({ name, description }) => {
    if (editingTask) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTask.id ? { ...task, name, description } : task
        )
      );
      setEditingTask(null);
    } else {
      const newTask = {
        id: crypto.randomUUID(),
        name,
        description,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTasks((prev) => [newTask, ...prev]);
    }
  };

  const handleToggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    // If the task being deleted was mid-edit, exit edit mode
    if (editingTask && editingTask.id === id) {
      setEditingTask(null);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    // Scroll up so the pre-filled form is visible, in case the list is long
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>📝 To-Do List</h1>
        <p className="app-subtitle">Stay organized, one task at a time.</p>
      </header>

      <main className="app-main">
        <TaskForm
          onSave={handleSave}
          editingTask={editingTask}
          onCancelEdit={handleCancelEdit}
        />

        <TaskList
          tasks={tasks}
          filter={filter}
          onFilterChange={setFilter}
          onToggleComplete={handleToggleComplete}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      <footer className="app-footer">
        <p>Tasks are saved automatically in your browser.</p>
      </footer>
    </div>
  );
}

export default App;
