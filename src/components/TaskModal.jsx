import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export default function TaskModal({ isOpen, onClose, onSave, initialTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Engineering');
  const [status, setStatus] = useState('To do');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title || '');
      setDescription(initialTask.description || '');
      setCategory(initialTask.category || 'Engineering');
      setStatus(initialTask.status || 'To do');
      setPriority(initialTask.priority || 'Medium');
      setDueDate(initialTask.dueDate || '');
    } else {
      setTitle('');
      setDescription('');
      setCategory('Engineering');
      setStatus('To do');
      setPriority('Medium');
      setDueDate('');
    }
    setError('');
  }, [initialTask, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required. Please enter a descriptive title.');
      return;
    }
    onSave({
      ...(initialTask || {}),
      title: title.trim(),
      description: description.trim(),
      category: category.trim() || 'General',
      status,
      priority,
      dueDate,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
    >
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 id="task-modal-title" className="text-lg font-bold text-slate-900">
            {initialTask ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4" noValidate>
          <div>
            <label htmlFor="task-title" className="block text-sm font-semibold text-slate-700 mb-1">
              Task Title <span className="text-rose-600">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g., Audit mobile dashboard spacing"
              aria-invalid={Boolean(error)}
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-indigo-600 focus:outline-none"
            />
            {error && (
              <p role="alert" className="mt-1.5 text-xs font-medium text-rose-600">
                {error}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="task-desc" className="block text-sm font-semibold text-slate-700 mb-1">
              Description
            </label>
            <textarea
              id="task-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add acceptance criteria, notes, or links..."
              className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-indigo-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="task-status" className="block text-sm font-semibold text-slate-700 mb-1">
                Status
              </label>
              <select
                id="task-status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm bg-white focus:border-indigo-600 focus:outline-none"
              >
                <option value="To do">To do</option>
                <option value="In progress">In progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div>
              <label htmlFor="task-priority" className="block text-sm font-semibold text-slate-700 mb-1">
                Priority
              </label>
              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm bg-white focus:border-indigo-600 focus:outline-none"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="task-category" className="block text-sm font-semibold text-slate-700 mb-1">
                Category
              </label>
              <input
                id="task-category"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g., Design, Frontend"
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-indigo-600 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="task-due" className="block text-sm font-semibold text-slate-700 mb-1">
                Due Date
              </label>
              <input
                id="task-due"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm focus:border-indigo-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 hover:bg-slate-50 min-h-[44px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 text-sm font-semibold text-white hover:bg-indigo-700 min-h-[44px]"
            >
              {initialTask ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
