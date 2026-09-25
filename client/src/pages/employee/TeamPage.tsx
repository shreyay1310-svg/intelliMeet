import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { User } from '../../types';
import { Users, Mail, Building2, UserPlus, Search, Shield, CheckCircle } from 'lucide-react';

export const TeamPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [teamFilter, setTeamFilter] = useState('all');

  const fetchUsers = async () => {
    try {
      const res = await api.getUsers({ search, team: teamFilter !== 'all' ? teamFilter : undefined });
      if (res.success && res.users) {
        setUsers(res.users);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search, teamFilter]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span>Team & Collaborators</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            View organization members, departments, and roles
          </p>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="relative w-full sm:w-80">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <select
          value={teamFilter}
          onChange={(e) => setTeamFilter(e.target.value)}
          className="py-1.5 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700"
        >
          <option value="all">All Departments</option>
          <option value="Product Team">Product</option>
          <option value="Engineering">Engineering</option>
          <option value="Design">Design</option>
          <option value="Marketing">Marketing</option>
          <option value="Executive">Executive</option>
        </select>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {users.map((member) => (
          <div
            key={member.id}
            className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-card hover:shadow-soft transition flex items-start gap-4"
          >
            <img
              src={
                member.avatar ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}`
              }
              alt={member.name}
              className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <h3 className="text-sm font-bold text-slate-900 truncate">{member.name}</h3>
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    member.role === 'admin'
                      ? 'bg-purple-50 text-purple-700 border border-purple-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {member.role}
                </span>
              </div>

              <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                {member.jobTitle || 'Team Member'}
              </p>

              <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{member.email}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{member.team || 'Product Team'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
