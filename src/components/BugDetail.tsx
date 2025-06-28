import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  AlertTriangle, 
  Clock, 
  MessageSquare, 
  Paperclip,
  Edit,
  CheckCircle,
  X
} from 'lucide-react';
import { Bug } from '../types/Bug';

interface BugDetailProps {
  bug: Bug;
  onBack: () => void;
}

export const BugDetail: React.FC<BugDetailProps> = ({ bug, onBack }) => {
  const [newComment, setNewComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      // In a real app, this would make an API call
      console.log('Adding comment:', newComment);
      setNewComment('');
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Bug List</span>
          </button>
          
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{bug.title}</h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <Edit className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600">Bug ID: #{bug.id}</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className={`px-4 py-2 rounded-lg text-sm font-medium border ${getStatusColor(bug.status)}`}>
                {bug.status.replace('-', ' ').toUpperCase()}
              </span>
              <span className={`px-4 py-2 rounded-lg text-sm font-medium border ${getPriorityColor(bug.priority)}`}>
                {bug.priority.toUpperCase()} PRIORITY
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{bug.description}</p>
            </div>

            {/* Reproduction Steps */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Steps to Reproduce</h2>
              <ol className="list-decimal list-inside space-y-2">
                {bug.reproductionSteps.map((step, index) => (
                  <li key={index} className="text-gray-700">{step}</li>
                ))}
              </ol>
            </div>

            {/* Environment */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Environment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Environment</p>
                  <p className="text-gray-900">{bug.environment}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Version</p>
                  <p className="text-gray-900">{bug.version}</p>
                </div>
              </div>
            </div>

            {/* Attachments */}
            {bug.attachments.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Attachments</h2>
                <div className="space-y-2">
                  {bug.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Paperclip className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">{attachment}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Comments */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Comments</h2>
              
              {bug.comments.length > 0 ? (
                <div className="space-y-4 mb-6">
                  {bug.comments.map((comment) => (
                    <div key={comment.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {comment.author.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-gray-900">{comment.author}</span>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 mb-6">No comments yet.</p>
              )}

              {/* Add Comment */}
              <div className="border-t pt-6">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
                <div className="flex justify-end mt-3">
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add Comment
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 flex items-center justify-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>Start Working</span>
                </button>
                <button className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>Mark as Resolved</span>
                </button>
                <button className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center justify-center space-x-2">
                  <X className="w-4 h-4" />
                  <span>Close Bug</span>
                </button>
              </div>
            </div>

            {/* Bug Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Details</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Assignee</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {bug.assignee.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-gray-900">{bug.assignee}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Reporter</p>
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">{bug.reporter}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Category</p>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    {bug.category}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Created</p>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">{new Date(bug.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Last Updated</p>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-900">{new Date(bug.updatedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {bug.dueDate && (
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-1">Due Date</p>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <span className="text-gray-900">{new Date(bug.dueDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {bug.tags.length > 0 && (
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {bug.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};