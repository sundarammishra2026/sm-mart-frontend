import React, { useState, useEffect } from 'react';
import { UserGroupIcon, UserIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      // TODO: Replace with actual API call
      // const response = await api.get('/Users');
      // setUsers(response.data);
      
      // Mock data
      setUsers([
        { id: 1, email: 'admin@smmart.com', fullName: 'Admin User', role: 'Admin', createdAt: '2026-01-01', status: 'Active' },
        { id: 2, email: 'test@user.com', fullName: 'Test User', role: 'Customer', createdAt: '2026-08-13', status: 'Active' },
        { id: 3, email: 'demo@user.com', fullName: 'Demo User', role: 'Customer', createdAt: '2026-08-15', status: 'Inactive' }
      ]);
    } catch (error) {
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Total Users', value: users.length, icon: <UserGroupIcon className="w-5 h-5" />, color: 'bg-blue-50 text-blue-600' },
    { label: 'Admin', value: users.filter(u => u.role === 'Admin').length, icon: <UserIcon className="w-5 h-5" />, color: 'bg-purple-50 text-purple-600' },
    { label: 'Customers', value: users.filter(u => u.role === 'Customer').length, icon: <UserPlusIcon className="w-5 h-5" />, color: 'bg-green-50 text-green-600' }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#12233D] mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#12233D] flex items-center gap-2">
            <UserGroupIcon className="w-8 h-8 text-[#FFB627]" />
            User Management
          </h1>
          <p className="text-gray-500 text-sm mt-1">Manage all registered users</p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#12233D] text-white rounded-xl font-semibold text-sm hover:bg-[#0F6E6E] transition-all">
          <UserPlusIcon className="w-5 h-5" />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className={`${stat.color} rounded-xl p-5 border border-[#12233D]/5`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium opacity-70">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className="p-3 bg-white/50 rounded-full">
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pl-10 rounded-xl border border-[#12233D]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#12233D] bg-white"
        />
        <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#12233D]/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#FBF6ED]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-mono font-bold text-[#12233D] uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-mono font-bold text-[#12233D] uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-mono font-bold text-[#12233D] uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-mono font-bold text-[#12233D] uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-mono font-bold text-[#12233D] uppercase tracking-wider">Joined</th>
                <th className="px-6 py-3 text-left text-xs font-mono font-bold text-[#12233D] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No users found
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#FBF6ED] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#12233D]/10 flex items-center justify-center text-[#12233D] font-bold text-sm">
                          {user.fullName.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-semibold text-[#12233D] text-sm">{user.fullName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-mono px-3 py-1 rounded-full ${
                        user.role === 'Admin' 
                          ? 'bg-[#FFB627]/20 text-[#12233D] border border-[#FFB627]/30' 
                          : 'bg-gray-100 text-gray-600 border border-gray-200'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-mono px-3 py-1 rounded-full ${
                        user.status === 'Active' 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
                          : 'bg-red-50 text-red-600 border border-red-200'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-mono text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="text-[#0F6E6E] hover:text-[#12233D] text-sm font-medium">
                          Edit
                        </button>
                        <button className="text-[#E23E3E] hover:text-red-700 text-sm font-medium">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;