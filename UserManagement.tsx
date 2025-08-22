import React, { useState } from 'react';
import { useLibrary } from '../contexts/LibraryContext';
import { User } from '../types';
import { Plus, Edit3, Trash2, Users, Mail, Phone, Calendar, Shield } from 'lucide-react';

export function UserManagement() {
  const { users, addUser, updateUser, deleteUser } = useLibrary();
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    membershipType: 'general' as 'student' | 'faculty' | 'general',
    isActive: true,
  });

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      membershipType: 'general',
      isActive: true,
    });
    setEditingUser(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      ...formData,
      joinDate: editingUser?.joinDate || new Date().toISOString(),
    };
    
    if (editingUser) {
      updateUser(editingUser.id, userData);
    } else {
      addUser(userData);
    }
    resetForm();
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      membershipType: user.membershipType,
      isActive: user.isActive,
    });
    setShowForm(true);
  };

  const getMembershipBadge = (type: string) => {
    const badges = {
      student: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Student' },
      faculty: { color: 'bg-purple-100 text-purple-800 border-purple-200', label: 'Faculty' },
      general: { color: 'bg-green-100 text-green-800 border-green-200', label: 'General' },
    };
    return badges[type as keyof typeof badges] || badges.general;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Guild Member Registry</h2>
          <p className="text-slate-600">Manage your library's adventuring party</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 hover-lift shadow-lg ripple-effect bubble-animation"
        >
          <Plus className="w-5 h-5" />
          <span>Recruit Member</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              {editingUser ? 'Update Member Profile' : 'Register New Member'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Enter full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Membership Class
                  </label>
                  <select
                    value={formData.membershipType}
                    onChange={(e) => setFormData({...formData, membershipType: e.target.value as any})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                  >
                    <option value="general">General Member</option>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="w-4 h-4 text-green-600 rounded focus:ring-green-500 border-slate-300"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-slate-700">
                  Active member status
                </label>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {editingUser ? 'Update Member' : 'Register Member'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user, index) => {
          const badge = getMembershipBadge(user.membershipType);
          return (
            <div
              key={user.id}
              className={`bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover-lift border-2 mouse-track float-animation bounce-in ${
                user.isActive ? 'border-green-200' : 'border-red-200'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px) scale(1.02) rotateY(-3deg)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{user.name}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${badge.color} pulse-glow`}>
                    {badge.label}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover-lift ripple-effect"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover-lift ripple-effect"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-slate-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{user.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    Joined {new Date(user.joinDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className={`w-4 h-4 ${user.isActive ? 'text-green-600' : 'text-red-600'}`} />
                  <span className={`text-sm font-medium ${user.isActive ? 'text-green-700' : 'text-red-700'}`}>
                    {user.isActive ? 'Active Member' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg ${
                  user.isActive 
                    ? 'bg-green-50 text-green-700 border border-green-200'
                    : 'bg-red-50 text-red-700 border border-red-200'
                } hover-lift shine-effect`}>
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {user.isActive ? 'Ready for Quests' : 'Currently Offline'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {users.length === 0 && (
        <div className="text-center py-12 bounce-in">
          <Users className="w-16 h-16 text-slate-300 mx-auto mb-4 bubble-animation" />
          <h3 className="text-xl font-semibold text-slate-600 mb-2">No Guild Members Yet</h3>
          <p className="text-slate-500 mb-6">Start building your community by registering your first member.</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 hover-lift ripple-effect"
          >
            Recruit Your First Member
          </button>
        </div>
      )}
    </div>
  );
}