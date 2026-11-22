import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { INITIAL_TASKS } from '../data/initialTasks';

const STORAGE_KEY = 'focusboard_tasks_v1';
const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (err) {
      console.error('Failed to read tasks from localStorage:', err);
    }
    return INITIAL_TASKS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      console.error('Failed to write tasks to localStorage:', err);
    }
  }, [tasks]);

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: `task-${Date.now()}`,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? { ...task, ...updatedTask } : task))
    );
  };

  const updateTaskStatus = (id, status) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const stats = useMemo(() => {
    const total = tasks.length;
    const inProgress = tasks.filter((t) => t.status === 'In progress').length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const todo = tasks.filter((t) => t.status === 'To do').length;
    const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, inProgress, completed, todo, completionRate };
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        stats,
        addTask,
        updateTask,
        updateTaskStatus,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used within a TaskProvider');
  return ctx;
}
