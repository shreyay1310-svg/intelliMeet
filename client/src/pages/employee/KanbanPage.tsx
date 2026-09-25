import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Task } from '../../types';
import { NewTaskModal } from '../../components/tasks/NewTaskModal';
import {
  Columns,
  Plus,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Tag,
  User as UserIcon,
} from 'lucide-react';

export const KanbanPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await api.getTasks();
      if (res.success && res.tasks) {
        setTasks(res.tasks);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const columns: ('To Do' | 'In Progress' | 'Review' | 'Completed')[] = [
    'To Do',
    'In Progress',
    'Review',
    'Completed',
  ];

  const moveTask = async (
    task: Task,
    newColumn: 'To Do' | 'In Progress' | 'Review' | 'Completed'
  ) => {
    try {
      await api.updateTask(task._id, { kanbanColumn: newColumn });
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, kanbanColumn: newColumn } : t))
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Columns className="w-5 h-5 text-blue-600" />
            <span>Project Workspace (Kanban)</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Visualize workflow milestones and transition task states
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* 4 Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
        {columns.map((col, colIndex) => {
          const colTasks = tasks.filter(
            (t) => (t.kanbanColumn || 'To Do') === col
          );

          const colColors = {
            'To Do': 'border-t-amber-500 bg-amber-500/10 text-amber-700',
            'In Progress': 'border-t-blue-500 bg-blue-500/10 text-blue-700',
            'Review': 'border-t-purple-500 bg-purple-500/10 text-purple-700',
            'Completed': 'border-t-emerald-500 bg-emerald-500/10 text-emerald-700',
          }[col];

          return (
            <div
              key={col}
              className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-3"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-800">{col}</span>
                  <span className="text-[10px] font-semibold bg-white border border-slate-200 px-2 py-0.5 rounded-full text-slate-600">
                    {colTasks.length}
                  </span>
                </div>
              </div>

              {/* Task Cards */}
              <div className="space-y-3 min-h-[300px]">
                {colTasks.map((t) => (
                  <div
                    key={t._id}
                    className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-xs hover:shadow-soft transition space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-800 leading-snug">
                        {t.title}
                      </h4>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                          t.priority === 'high'
                            ? 'bg-rose-50 text-rose-600'
                            : t.priority === 'medium'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {t.priority}
                      </span>
                    </div>

                    {t.description && (
                      <p className="text-[11px] text-slate-500 line-clamp-2">
                        {t.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>
                          {new Date(t.dueDate).toLocaleDateString([], {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <img
                          src={
                            t.assignedTo?.avatar ||
                            `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(t.assignedTo?.name || 'User')}`
                          }
                          alt={t.assignedTo?.name}
                          className="w-4 h-4 rounded-full object-cover"
                        />
                        <span className="text-slate-600 font-medium truncate max-w-[80px]">
                          {t.assignedTo?.name || 'Assignee'}
                        </span>
                      </div>
                    </div>

                    {/* Move Column Actions */}
                    <div className="flex items-center justify-between pt-1">
                      {colIndex > 0 ? (
                        <button
                          onClick={() => moveTask(t, columns[colIndex - 1])}
                          className="text-[10px] text-slate-400 hover:text-blue-600 flex items-center gap-0.5 p-1 rounded hover:bg-slate-50 transition"
                          title={`Move to ${columns[colIndex - 1]}`}
                        >
                          <ArrowLeft className="w-3 h-3" />
                          <span>Back</span>
                        </button>
                      ) : <div />}

                      {colIndex < columns.length - 1 ? (
                        <button
                          onClick={() => moveTask(t, columns[colIndex + 1])}
                          className="text-[10px] text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-0.5 p-1 rounded hover:bg-blue-50 transition"
                          title={`Move to ${columns[colIndex + 1]}`}
                        >
                          <span>Advance</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                          <CheckCircle className="w-3 h-3" />
                          <span>Done</span>
                        </span>
                      )}
                    </div>
                  </div>
                ))}

                {colTasks.length === 0 && (
                  <div className="py-10 text-center text-[11px] text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                    No tasks in {col}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <NewTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onTaskCreated={fetchTasks}
      />
    </div>
  );
};
