import React, { useState } from 'react';
import { ArrowLeft, Plus, X } from 'lucide-react';

interface BugFormProps {
  onBack: () => void;
  onSubmit: (bugData: any) => void;
}

export const BugForm: React.FC<BugFormProps> = ({ onBack, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: '',
    assignee: '',
    environment: '',
    version: '',
    reproductionSteps: [''],
    tags: [] as string[],
    dueDate: ''
  });

  const [newTag, setNewTag] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addReproductionStep = () => {
    setFormData(prev => ({
      ...prev,
      reproductionSteps: [...prev.reproductionSteps, '']
    }));
  };

  const updateReproductionStep = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      reproductionSteps: prev.reproductionSteps.map((step, i) => 
        i === index ? value : step
      )
    }));
  };

  const removeReproductionStep = (index: number) => {
    setFormData(prev => ({
      ...prev,
      reproductionSteps: prev.reproductionSteps.filter((_, i) => i !== index)
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Report New Bug</h1>
          <p className="text-gray-600">Fill out the form below to report a new software issue</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bug Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brief, descriptive title of the bug"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Detailed description of the bug, including what happened and what was expected"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => handleInputChange('priority', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Authentication">Authentication</option>
                    <option value="Database">Database</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Performance">Performance</option>
                    <option value="Security">Security</option>
                    <option value="API">API</option>
                    <option value="Email">Email</option>
                    <option value="Search">Search</option>
                    <option value="Dashboard">Dashboard</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign To
                  </label>
                  <select
                    value={formData.assignee}
                    onChange={(e) => handleInputChange('assignee', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Unassigned</option>
                    <option value="Sarah Johnson">Sarah Johnson</option>
                    <option value="Alex Rodriguez">Alex Rodriguez</option>
                    <option value="David Kim">David Kim</option>
                    <option value="Sophie Turner">Sophie Turner</option>
                    <option value="Michael Zhang">Michael Zhang</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) => handleInputChange('dueDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Technical Details */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Technical Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Environment
                </label>
                <input
                  type="text"
                  value={formData.environment}
                  onChange={(e) => handleInputChange('environment', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Chrome 120, iOS Safari, Production"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Version
                </label>
                <input
                  type="text"
                  value={formData.version}
                  onChange={(e) => handleInputChange('version', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 2.1.4"
                />
              </div>
            </div>
          </div>

          {/* Reproduction Steps */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Steps to Reproduce</h2>
              <button
                type="button"
                onClick={addReproductionStep}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
                <span>Add Step</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.reproductionSteps.map((step, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium text-gray-600">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={step}
                    onChange={(e) => updateReproductionStep(index, e.target.value)}
                    placeholder={`Step ${index + 1}`}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {formData.reproductionSteps.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeReproductionStep(index)}
                      className="flex-shrink-0 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Tags</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add a tag"
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                >
                  Add Tag
                </button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Create Bug Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};