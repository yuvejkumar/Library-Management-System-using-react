import React from 'react';
import { useLibrary } from '../contexts/LibraryContext';
import { BookOpen, Users, Clock, AlertTriangle, TrendingUp, Award } from 'lucide-react';

export function Dashboard() {
  const { getStats, getOverdueTransactions } = useLibrary();
  const stats = getStats();
  const overdueTransactions = getOverdueTransactions();

  const statCards = [
    {
      title: 'Total Arsenal',
      value: stats.totalBooks,
      icon: BookOpen,
      color: 'bg-blue-500',
      description: 'Books in collection'
    },
    {
      title: 'Active Guild Members',
      value: stats.totalUsers,
      icon: Users,
      color: 'bg-green-500',
      description: 'Registered users'
    },
    {
      title: 'Equipment in Use',
      value: stats.issuedBooks,
      icon: Clock,
      color: 'bg-amber-500',
      description: 'Currently issued'
    },
    {
      title: 'Overdue Quests',
      value: stats.overdueBooks,
      icon: AlertTriangle,
      color: 'bg-red-500',
      description: 'Need attention'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center py-8 bounce-in">
        <h2 className="text-4xl font-bold text-slate-800 mb-2">
          Welcome to the Library Quest System
        </h2>
        <p className="text-slate-600 text-lg">
          Your command center for managing the ultimate knowledge inventory
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover-lift border border-slate-200 bubble-animation mouse-track bounce-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.05) rotateY(5deg)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1) rotateY(0deg)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.color} shine-effect float-animation`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-slate-800 pulse-glow">{card.value}</p>
                </div>
              </div>
              <h3 className="font-semibold text-slate-800 mb-1">{card.title}</h3>
              <p className="text-sm text-slate-600">{card.description}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover-lift mouse-track">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="w-6 h-6 text-blue-500 float-animation" />
            <h3 className="text-xl font-bold text-slate-800">Quick Stats</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg hover-lift transition-all duration-200">
              <span className="text-slate-600">Availability Rate</span>
              <span className="font-semibold text-green-600">
                {stats.totalBooks > 0 
                  ? Math.round(((stats.totalBooks - stats.issuedBooks) / stats.totalBooks) * 100)
                  : 0
                }%
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg hover-lift transition-all duration-200">
              <span className="text-slate-600">Books per Member</span>
              <span className="font-semibold text-blue-600">
                {stats.totalUsers > 0 
                  ? Math.round(stats.totalBooks / stats.totalUsers)
                  : 0
                }
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg hover-lift transition-all duration-200">
              <span className="text-slate-600">Active Borrowers</span>
              <span className="font-semibold text-purple-600">{stats.issuedBooks}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover-lift mouse-track">
          <div className="flex items-center space-x-3 mb-6">
            <Award className="w-6 h-6 text-amber-500 bubble-animation" />
            <h3 className="text-xl font-bold text-slate-800">Achievement Center</h3>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover-lift ripple-effect">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-800">Inventory Master</p>
                  <p className="text-sm text-blue-600">Manage your growing collection</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200 hover-lift ripple-effect">
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-semibold text-green-800">Guild Leader</p>
                  <p className="text-sm text-green-600">Growing community of readers</p>
                </div>
              </div>
            </div>
            {stats.overdueBooks === 0 && (
              <div className="p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg border border-amber-200 hover-lift ripple-effect pulse-glow">
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="font-semibold text-amber-800">Perfect Record</p>
                    <p className="text-sm text-amber-600">No overdue items!</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {overdueTransactions.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 wiggle-animation hover-lift">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600 pulse-glow" />
            <h3 className="text-xl font-bold text-red-800">Urgent Quests</h3>
          </div>
          <p className="text-red-700 mb-4">
            {overdueTransactions.length} book{overdueTransactions.length !== 1 ? 's' : ''} overdue and need immediate attention.
          </p>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 font-medium hover-lift ripple-effect">
            View Overdue Items
          </button>
        </div>
      )}
    </div>
  );
}