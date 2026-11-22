import React from 'react';
import { Menu, Plus, Search } from 'lucide-react';

export default function Header({ searchQuery, setSearchQuery, onOpenCreate, onOpenMobileMenu }) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-slate-900">My Tasks Overview</h1>
            <p className="text-xs sm:text-sm text-slate-500 hidden sm:block">
              Track priorities, manage workflow status, and stay focused
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          <div className="relative flex-1 sm:w-64 md:w-72">
            <label htmlFor="task-search" className="sr-only">
              Search tasks by title
            </label>
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="task-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks by title..."
              className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={onOpenCreate}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-xs shrink-0 min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>
    </header>
  );
}
