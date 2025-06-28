import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { BugList } from './components/BugList';
import { BugDetail } from './components/BugDetail';
import { BugForm } from './components/BugForm';
import { Bug } from './types/Bug';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedBug, setSelectedBug] = useState<Bug | null>(null);

  const handleViewChange = (view: string) => {
    setActiveView(view);
    setSelectedBug(null);
  };

  const handleBugSelect = (bug: Bug) => {
    setSelectedBug(bug);
    setActiveView('bug-detail');
  };

  const handleBackToBugList = () => {
    setSelectedBug(null);
    setActiveView('bugs');
  };

  const handleBugFormSubmit = (bugData: any) => {
    console.log('New bug submitted:', bugData);
    // In a real app, this would make an API call
    setActiveView('bugs');
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'bugs':
        return <BugList onBugSelect={handleBugSelect} />;
      case 'bug-detail':
        return selectedBug ? (
          <BugDetail bug={selectedBug} onBack={handleBackToBugList} />
        ) : (
          <BugList onBugSelect={handleBugSelect} />
        );
      case 'create':
        return (
          <BugForm 
            onBack={() => setActiveView('dashboard')} 
            onSubmit={handleBugFormSubmit}
          />
        );
      case 'search':
        return (
          <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Advanced Search</h1>
              <p className="text-gray-600">Search functionality coming soon...</p>
            </div>
          </div>
        );
      case 'team':
        return (
          <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Team Management</h1>
              <p className="text-gray-600">Team management features coming soon...</p>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Notifications</h1>
              <p className="text-gray-600">Notification center coming soon...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Settings</h1>
              <p className="text-gray-600">Settings panel coming soon...</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeView={activeView} onViewChange={handleViewChange} />
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;