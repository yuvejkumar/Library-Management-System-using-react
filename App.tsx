import React, { useState } from 'react';
import { LibraryProvider } from './contexts/LibraryContext';
import { Navbar } from './components/Navbar';
import { Dashboard } from './components/Dashboard';
import { BookManagement } from './components/BookManagement';
import { UserManagement } from './components/UserManagement';
import { SearchBooks } from './components/SearchBooks';
import { IssueBook } from './components/IssueBook';
import { ReturnBook } from './components/ReturnBook';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'books':
        return <BookManagement />;
      case 'users':
        return <UserManagement />;
      case 'search':
        return <SearchBooks />;
      case 'issue':
        return <IssueBook />;
      case 'return':
        return <ReturnBook />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <LibraryProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <Navbar currentView={currentView} onViewChange={setCurrentView} />
        <main className="max-w-7xl mx-auto px-6 py-8">
          {renderView()}
        </main>
      </div>
    </LibraryProvider>
  );
}

export default App;