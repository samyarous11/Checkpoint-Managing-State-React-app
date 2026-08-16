# To-Do List App

A simple, well-structured React To-Do List application demonstrating component-based
architecture, state management with hooks, form validation, and persistence via
browser `localStorage`.

## Features

- **Add tasks** — a form with Task Name and Description fields, validated so both
  must be filled before a task can be added.
- **Edit tasks** — click anywhere on a task (or the Edit button) to load it into
  the form, pre-filled, for updating.
- **Delete tasks** — with a confirmation prompt (`window.confirm`) before removal.
- **Mark complete/active** — via a checkbox; completed tasks are visually
  distinguished (strikethrough text, muted colors, green accent).
- **Filter tasks** — All / Active / Completed, with live counts.
- **Persistence** — tasks are saved to `localStorage` automatically on every
  change, and reloaded automatically when the app starts, so your list survives
  page refreshes and browser restarts.

## Project Structure

```
todo-app/
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── src/
    ├── main.jsx              # React entry point
    ├── App.jsx                # Top-level component; owns task state
    ├── App.css                # App styling
    ├── index.css              # Global reset / base styles
    ├── hooks/
    │   └── useLocalStorage.js # Reusable hook: state that syncs with localStorage
    └── components/
        ├── TaskForm.jsx       # Add/Edit form with validation
        ├── TaskList.jsx       # Renders filtered list + filter buttons
        └── TaskItem.jsx       # A single task row (checkbox, edit, delete)
```

Each component and function includes inline comments explaining its purpose.

## How It Works (State Management Overview)

- `App.jsx` is the single source of truth for the `tasks` array. It uses the
  custom `useLocalStorage` hook (a drop-in replacement for `useState`) so that
  every task addition, edit, deletion, or completion toggle is automatically
  persisted to `localStorage` under the key `todo-app-tasks`.
- `TaskForm` is a **controlled component** that manages its own input state
  locally, but reports validated data upward via the `onSave` callback prop.
  It doubles as both the "Add" and "Edit" form depending on whether an
  `editingTask` prop is passed down from `App`.
- `TaskList` and `TaskItem` are presentational — they receive data and
  callback functions as props and don't manage any task data themselves.

## Running the App Locally

**Prerequisites:** [Node.js](https://nodejs.org/) (v18 or later recommended) and npm.

1. Open a terminal in the `todo-app` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the URL shown in the terminal (typically `http://localhost:5173`) in
   your browser.

### Building for production

```bash
npm run build
```

This outputs a production-ready bundle to the `dist/` folder. You can preview
it locally with:

```bash
npm run preview
```

## Notes & Considerations

- Tasks are stored per-browser via `localStorage`, so they won't sync across
  different browsers or devices — this is a client-only demo app with no backend.
  Each task's ID is generated with `crypto.randomUUID()`.
- If `localStorage` is unavailable (e.g., private browsing with strict
  settings) or contains corrupted data, the app falls back gracefully to an
  empty task list rather than crashing.
- Deleting a task always requires confirmation via a browser `confirm()` dialog
  to prevent accidental data loss.
- The filter (All / Active / Completed) is purely a display filter — it does
  not affect what's stored, so switching filters never loses data.
