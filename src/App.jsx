import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import FocusCarousel from './components/FocusCarousel';
import FilterBar from './components/FilterBar';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';
import { useTasks } from './context/TaskContext';

export default function App() {
  const { tasks, addTask, updateTask } = useTasks();
  const [activeNav, setActiveNav] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());
      const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (taskData.id) {
      updateTask(taskData);
    } else {
      addTask(taskData);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900">
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onOpenCreate={handleOpenCreate}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          <StatsCards />
          <FocusCarousel />
          <FilterBar
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
            resultCount={filteredTasks.length}
          />
          <TaskList tasks={filteredTasks} onEditTask={handleOpenEdit} />
        </main>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTask}
        initialTask={editingTask}
      />
    </div>
  );
}
