import React from 'react';

const STATUS_TABS = ['All', 'To do', 'In progress', 'Completed'];
const PRIORITIES = ['All', 'High', 'Medium', 'Low'];

export default function FilterBar({
  statusFilter,
  setStatusFilter,
  priorityFilter,
  setPriorityFilter,
  resultCount,
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
      <div role="tablist" aria-label="Filter tasks by status" className="flex flex-wrap gap-1.5">
        {STATUS_TABS.map((status) => {
          const active = statusFilter === status;
          return (
            <button
              key={status}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors min-h-[40px] ${
                active
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {status}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between md:justify-end gap-3">
        <span className="text-xs text-slate-500">
          Showing <strong className="text-slate-800">{resultCount}</strong> tasks
        </span>

        <div className="flex items-center gap-2">
          <label htmlFor="priority-filter" className="text-xs font-medium text-slate-600">
            Priority:
          </label>
          <select
            id="priority-filter"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 focus:border-indigo-500 focus:bg-white min-h-[40px]"
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {p === 'All' ? 'All Priorities' : p}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
