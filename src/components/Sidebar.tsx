import React from 'react';
import { Bug, BarChart3, Users, Settings, Bell, Search, Plus } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'bugs', label: 'All Bugs', icon: Bug },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-64 bg-slate-900 text-white h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <Bug className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold">BugTracker</h1>
            <p className="text-slate-400 text-sm">Pro Edition</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <button
          onClick={() => onViewChange('create')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors duration-200"
        >
          <Plus className="w-5 h-5" />
          <span className="font-medium">Report Bug</span>
        </button>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full text-left py-3 px-4 rounded-lg flex items-center space-x-3 transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
            JD
          </div>
          <div>
            <p className="text-sm font-medium text-white">Kanika Sharma</p>
            <p className="text-xs text-slate-400">Senior Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
};