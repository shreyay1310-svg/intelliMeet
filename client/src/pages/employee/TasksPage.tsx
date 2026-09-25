import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { Task } from '../../types';
import { NewTaskModal } from '../../components/tasks/NewTaskModal';
import {
  CheckSquare,
  Plus,
  Filter,
  Columns,
  Calendar,
  Trash2,
  CheckCircle2,
  Clock,
  MoreVertical,
} from 'lucide-react';

export const TasksPage: React.FC = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState<'myTasks' | 'assignedToMe' | 'createdByMe'>('myTasks');
  const [statusFilter, setStatusFilter] = useState<'all' | 'todo' | 'in-progress' | 'completed'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await api.getTasks({
        filterBy: activeTab,
        status: statusFilter !== 'all' ? statusFilter : undefined,
      });
      if (res.success && res.tasks) {
        setTasks(res.tasks);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [activeTab, statusFilter]);

  const handleToggleStatus = async (task: Task) => {
    const nextStatus = task.status === 'completed' ? 'todo' : 'completed';
    try {
      await api.updateTask(task._id, { status: nextStatus });
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, status: nextStatus } : t))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (confirm('Delete this task?')) {
      try {
        await api.deleteTask(id);
        setTasks((prev) => prev.filter((t) => t._id !== id));
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header matching reference design 6 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Tasks</h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Manage actionable deliverables and sprint items
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/kanban')}
            className="py-2.5 px-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs rounded-xl border border-slate-200 transition flex items-center gap-1.5 shadow-2xs"
          >
            <Columns className="w-3.5 h-3.5 text-slate-500" />
            <span>Kanban Board</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs shadow-blue-500/20 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Tabs matching reference design: My Tasks | Assigned to Me | Created by Me */}
      <div className="border-b border-slate-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('myTasks')}
            className={`py-3 text-xs font-bold border-b-2 transition ${
              activeTab === 'myTasks'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            My Tasks
          </button>
          <button
            onClick={() => setActiveTab('assignedToMe')}
            className={`py-3 text-xs font-bold border-b-2 transition ${
              activeTab === 'assignedToMe'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Assigned to Me
          </button>
          <button
            onClick={() => setActiveTab('createdByMe')}
            className={`py-3 text-xs font-bold border-b-2 transition ${
              activeTab === 'createdByMe'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Created by Me
          </button>
        </div>
      </div>

      {/* Status Filter Pills matching reference design: All | To Do | In Progress | Completed */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setStatusFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            statusFilter === 'all'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setStatusFilter('todo')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            statusFilter === 'todo'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          To Do
        </button>
        <button
          onClick={() => setStatusFilter('in-progress')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            statusFilter === 'in-progress'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => setStatusFilter('completed')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            statusFilter === 'completed'
              ? 'bg-blue-600 text-white shadow-2xs'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          Completed
        </button>
      </div>

      {/* Tasks Table matching reference design 6 */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="py-3.5 px-6 w-10"></th>
                <th className="py-3.5 px-6">Task</th>
                <th className="py-3.5 px-6">Meeting</th>
                <th className="py-3.5 px-6">Due Date</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {tasks.map((task) => {
                const isDone = task.status === 'completed';
                return (
                  <tr key={task._id} className="hover:bg-slate-50/70 transition">
                    <td className="py-4 px-6">
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => handleToggleStatus(task)}
                        className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                      />
                    </td>
                    <td className="py-4 px-6 font-semibold text-slate-900">
                      <span className={isDone ? 'line-through text-slate-400' : ''}>
                        {task.title}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      {(task.meetingId as any)?.title || 'Roadmap Discussion'}
                    </td>
                    <td className="py-4 px-6 text-slate-500">
                      {new Date(task.dueDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                          task.status === 'completed'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                            : task.status === 'in-progress'
                            ? 'bg-blue-50 text-blue-600 border border-blue-100'
                            : 'bg-amber-50 text-amber-700 border border-amber-100'
                        }`}
                      >
                        {task.status === 'in-progress'
                          ? 'In Progress'
                          : task.status === 'completed'
                          ? 'Completed'
                          : 'To Do'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                        title="Delete Task"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {tasks.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-xs text-slate-400">
                    No tasks found matching current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={fetchTasks}
      />
    </div>
  );
};
