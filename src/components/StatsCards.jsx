import React from 'react';
import { ListTodo, Clock, CheckCircle2, TrendingUp } from 'lucide-react';
import { useTasks } from '../context/TaskContext';

export default function StatsCards() {
  const { stats } = useTasks();

  const cards = [
    {
      label: 'Total Tasks',
      value: stats.total,
      icon: ListTodo,
      color: 'text-indigo-600 bg-indigo-50',
    },
    {
      label: 'In Progress',
      value: stats.inProgress,
      icon: Clock,
      color: 'text-amber-600 bg-amber-50',
    },
    {
      label: 'Completed',
      value: stats.completed,
      icon: CheckCircle2,
      color: 'text-emerald-600 bg-emerald-50',
    },
    {
      label: 'Completion Rate',
      value: `${stats.completionRate}%`,
      icon: TrendingUp,
      color: 'text-violet-600 bg-violet-50',
      progress: stats.completionRate,
    },
  ];

  return (
    <section aria-label="Task Overview Statistics" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500">{card.label}</span>
              <div className={`p-2.5 rounded-xl ${card.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-bold text-slate-900">{card.value}</div>
              {typeof card.progress === 'number' && (
                <div className="mt-2.5 w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-violet-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${card.progress}%` }}
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}
    </section>
  );
}
