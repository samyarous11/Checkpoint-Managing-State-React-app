import { useState, useEffect } from 'react';

/**
 * useLocalStorage
 * A reusable hook that behaves like useState but automatically persists
 * its value to the browser's localStorage, and rehydrates from it on load.
 *
 * @param {string} key - the localStorage key to store the value under
 * @param {*} initialValue - the default value if nothing is found in storage
 * @returns {[value, setValue]} - same shape as useState
 */
export function useLocalStorage(key, initialValue) {
  // Lazy initializer: only runs once, on first render, so we don't
  // read from localStorage on every re-render.
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (error) {
      // If parsing fails (corrupted data) or localStorage is unavailable,
      // fall back to the initial value instead of crashing the app.
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Whenever `value` changes, write it back to localStorage.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
