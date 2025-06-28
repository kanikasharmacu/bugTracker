import React, { useState } from 'react';
import { Search, Filter, Clock, AlertTriangle, CheckCircle, Bug, Users, Calendar } from 'lucide-react';
import { mockBugs } from '../data/mockData';
import { Bug as BugType } from '../types/Bug';

interface BugListProps {
  onBugSelect: (bug: BugType) => void;
}

export const BugList: React.FC<BugListProps> = ({ onBugSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('updatedAt');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-red-700 bg-red-50 border-red-200';
      case 'in-progress': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'testing': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'resolved': return 'text-green-700 bg-green-50 border-green-200';
      case 'closed': return 'text-gray-700 bg-gray-50 border-gray-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'high': return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'medium': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low': return <Clock className="w-4 h-4 text-blue-500" />;
      default: return <Bug className="w-4 h-4 text-gray-500" />;
    }
  };

  const filteredBugs = mockBugs
    .filter(bug => {
      const matchesSearch = bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           bug.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || bug.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || bug.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'createdAt':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'updatedAt':
        default:
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bug Reports</h1>
          <p className="text-gray-600">Track and manage all software issues</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search bugs by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex space-x-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in-progress">In Progress</option>
                <option value="testing">Testing</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priority</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="updatedAt">Recently Updated</option>
                <option value="createdAt">Recently Created</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredBugs.length} of {mockBugs.length} bugs
          </p>
        </div>

        {/* Bug List */}
        <div className="space-y-4">
          {filteredBugs.map((bug) => (
            <div
              key={bug.id}
              onClick={() => onBugSelect(bug)}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    {getPriorityIcon(bug.priority)}
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                      {bug.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(bug.status)}`}>
                      {bug.status.replace('-', ' ').toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(bug.priority)}`}>
                      {bug.priority.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{bug.description}</p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Bug className="w-4 h-4" />
                      <span>#{bug.id}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>{bug.category}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{bug.assignee}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>Updated {new Date(bug.updatedAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  {bug.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {bug.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBugs.length === 0 && (
          <div className="text-center py-12">
            <Bug className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bugs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};