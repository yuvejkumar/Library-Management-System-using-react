import React from 'react';
import { BookOpen, Users, BarChart3, Search, PlusCircle, RefreshCw } from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Navbar({ currentView, onViewChange }: NavbarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Command Center', icon: BarChart3 },
    { id: 'books', label: 'Inventory', icon: BookOpen },
    { id: 'users', label: 'Guild Members', icon: Users },
    { id: 'search', label: 'Quest Search', icon: Search },
    { id: 'issue', label: 'Equip Items', icon: PlusCircle },
    { id: 'return', label: 'Store Items', icon: RefreshCw },
  ];

  return (
    <nav className="bg-slate-900 text-white shadow-lg border-b border-slate-700 relative overflow-hidden">
      <div className="absolute inset-0 gradient-shift opacity-10"></div>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3 float-animation">
            <BookOpen className="w-8 h-8 text-blue-400 pulse-glow" />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Library Quest System
            </h1>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 hover-lift ripple-effect
                    ${currentView === item.id 
                      ? 'bg-blue-600 text-white shadow-lg transform scale-105 pulse-glow' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800 hover:scale-110'
                    }
                  `}
                  onMouseEnter={(e) => {
                    e.currentTarget.classList.add('wiggle-animation');
                  }}
                  onAnimationEnd={(e) => {
                    e.currentTarget.classList.remove('wiggle-animation');
                  }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:block">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}