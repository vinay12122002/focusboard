import React from 'react';
import { Calendar, Edit2, Trash2, Tag } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

const PRIORITY_STYLES = {
  High: 'bg-rose-50 text-rose-700 border-rose-200',
  Medium: 'bg-amber-50 text-amber-700 border-amber-200',
  Low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const STATUS_STYLES = {
  'To do': 'bg-slate-100 text-slate-700',
  'In progress': 'bg-blue-50 text-blue-700',
  Completed: 'bg-emerald-50 text-emerald-700',
};

export default function TaskList({ tasks, onEditTask }) {
  const { updateTaskStatus, deleteTask } = useTasks();

  const handleDelete = (task) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"? This action cannot be undone.`
    );
    if (confirmed) {
      deleteTask(task.id);
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
        <p className="text-base font-semibold text-slate-800">No matching tasks found</p>
        <p className="text-sm text-slate-500 mt-1">
          Try clearing your search query or switching status and priority filters.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold uppercase tracking-wider text-slate-500">
              <th className="py-3.5 px-5">Task</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Priority</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Due Date</th>
              <th className="py-3.5 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {tasks.map((task) => {
              const isCompleted = task.status === 'Completed';
              return (
                <tr key={task.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-5 max-w-xs">
                    <p
                      className={`font-semibold transition-colors ${
                        isCompleted ? 'line-through text-slate-400' : 'text-slate-900'
                      }`}
                    >
                      {task.title}
                    </p>
                    {task.description && (
                      <p
                        className={`text-xs line-clamp-1 mt-0.5 ${
                          isCompleted ? 'line-through text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        {task.description}
                      </p>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium">
                      <Tag className="w-3 h-3" />
                      {task.category || 'General'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full border text-xs font-semibold ${
                        PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.Medium
                      }`}
                    >
                      {task.priority}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <label htmlFor={`status-desktop-${task.id}`} className="sr-only">
                      Status for {task.title}
                    </label>
                    <select
                      id={`status-desktop-${task.id}`}
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                      className={`rounded-xl px-3 py-1.5 text-xs font-semibold border border-transparent cursor-pointer ${
                        STATUS_STYLES[task.status] || STATUS_STYLES['To do']
                      }`}
                    >
                      <option value="To do">To do</option>
                      <option value="In progress">In progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </td>
                  <td className="py-4 px-4 text-xs text-slate-600 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {task.dueDate || 'No due date'}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => onEditTask(task)}
                        aria-label={`Edit ${task.title}`}
                        className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(task)}
                        aria-label={`Delete ${task.title}`}
                        className="p-2 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card View (390px friendly) */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {tasks.map((task) => {
          const isCompleted = task.status === 'Completed';
          return (
            <article
              key={task.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="inline-block text-[11px] font-semibold uppercase tracking-wide text-indigo-600 mb-1">
                    {task.category || 'General'}
                  </span>
                  <h3
                    className={`font-bold text-base leading-snug transition-colors ${
                      isCompleted ? 'line-through text-slate-400' : 'text-slate-900'
                    }`}
                  >
                    {task.title}
                  </h3>
                </div>
                <span
                  className={`shrink-0 px-2.5 py-1 rounded-full border text-xs font-semibold ${
                    PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.Medium
                  }`}
                >
                  {task.priority}
                </span>
              </div>

              {task.description && (
                <p
                  className={`text-xs leading-relaxed ${
                    isCompleted ? 'line-through text-slate-400' : 'text-slate-600'
                  }`}
                >
                  {task.description}
                </p>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 gap-2">
                <div className="flex-1">
                  <label htmlFor={`status-mobile-${task.id}`} className="sr-only">
                    Status for {task.title}
                  </label>
                  <select
                    id={`status-mobile-${task.id}`}
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                    className={`w-full rounded-xl px-3 py-2.5 text-xs font-semibold min-h-[44px] ${
                      STATUS_STYLES[task.status] || STATUS_STYLES['To do']
                    }`}
                  >
                    <option value="To do">To do</option>
                    <option value="In progress">In progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => onEditTask(task)}
                    aria-label={`Edit ${task.title}`}
                    className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(task)}
                    aria-label={`Delete ${task.title}`}
                    className="p-2.5 rounded-xl border border-slate-200 text-rose-600 hover:bg-rose-50 min-w-[44px] min-h-[44px] flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Due: {task.dueDate || 'No due date'}</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}