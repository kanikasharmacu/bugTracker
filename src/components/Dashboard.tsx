import React from 'react';
import { Bug, Clock, CheckCircle, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import { mockStats, mockBugs } from '../data/mockData';

export const Dashboard: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'high': return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'medium': return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'low': return <Clock className="w-5 h-5 text-blue-500" />;
      default: return <Bug className="w-5 h-5 text-gray-500" />;
    }
  };

  const recentBugs = mockBugs.slice(0, 5);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Monitor and track your bug resolution progress</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bugs</p>
                <p className="text-3xl font-bold text-gray-900">{mockStats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bug className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">+12% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Open</p>
                <p className="text-3xl font-bold text-red-600">{mockStats.open}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600">Needs attention</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-yellow-600">{mockStats.inProgress}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm text-gray-600">Being worked on</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-3xl font-bold text-green-600">{mockStats.resolved}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">Resolution rate: 78%</span>
            </div>
          </div>
        </div>

        {/* Priority Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Priority Distribution</h2>
              <div className="space-y-4">
                {[
                  { label: 'Critical', count: mockStats.critical, color: 'red' },
                  { label: 'High', count: mockStats.high, color: 'orange' },
                  { label: 'Medium', count: mockStats.medium, color: 'yellow' },
                  { label: 'Low', count: mockStats.low, color: 'blue' }
                ].map((priority) => {
                  const percentage = (priority.count / mockStats.total) * 100;
                  return (
                    <div key={priority.label}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">{priority.label}</span>
                        <span className="text-sm text-gray-600">{priority.count} bugs ({percentage.toFixed(1)}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-${priority.color}-500`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Team Performance</h2>
            <div className="space-y-4">
              {[
                { name: 'Sarah Johnson', resolved: 12, avatar: 'SJ' },
                { name: 'Alex Rodriguez', resolved: 8, avatar: 'AR' },
                { name: 'David Kim', resolved: 6, avatar: 'DK' },
                { name: 'Sophie Turner', resolved: 4, avatar: 'ST' }
              ].map((member) => (
                <div key={member.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {member.avatar}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{member.name}</span>
                  </div>
                  <span className="text-sm text-gray-600">{member.resolved} resolved</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Bugs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Recent Bug Reports</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentBugs.map((bug) => (
              <div key={bug.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getPriorityIcon(bug.priority)}
                      <h3 className="text-lg font-medium text-gray-900">{bug.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(bug.status)}`}>
                        {bug.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3 line-clamp-2">{bug.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>#{bug.id}</span>
                      <span>{bug.category}</span>
                      <span>Assigned to {bug.assignee}</span>
                      <span>{new Date(bug.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};