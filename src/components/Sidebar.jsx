import React from 'react';
import { LayoutDashboard, CheckSquare, Calendar, FolderKanban, Settings, X } from 'lucide-react';

export default function Sidebar({ activeNav, setActiveNav, mobileOpen, setMobileOpen }) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'tasks', label: 'My Tasks', icon: CheckSquare },
    { id: 'projects', label: 'Categories', icon: FolderKanban },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
  ];

  const content = (
    <div className="flex h-full flex-col justify-between bg-white border-r border-slate-200 px-4 py-6 w-64">
      <div>
        <div className="flex items-center justify-between px-2 mb-8">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
              F
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">FocusBoard</span>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav aria-label="Primary Sidebar Navigation" className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveNav(item.id);
                  setMobileOpen(false);
                }}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <div className="rounded-xl bg-slate-50 p-3.5 text-xs text-slate-500">
          <p className="font-semibold text-slate-700 mb-1">Local Persistence Active</p>
          <p>Changes are saved automatically in your browser.</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block shrink-0">{content}</aside>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-10">{content}</div>
        </div>
      )}
    </>
  );
}
