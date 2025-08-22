import React, { useState } from 'react';
import { useLibrary } from '../contexts/LibraryContext';
import { BookOpen, Users, Calendar, Sword, CheckCircle } from 'lucide-react';

export function IssueBook() {
  const { books, users, issueBook } = useLibrary();
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const availableBooks = books.filter(book => book.availableCopies > 0);
  const activeUsers = users.filter(user => user.isActive);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedBook && selectedUser && dueDate) {
      const success = issueBook(selectedBook, selectedUser, dueDate);
      if (success) {
        setShowSuccess(true);
        setSelectedBook('');
        setSelectedUser('');
        setDueDate('');
        setTimeout(() => setShowSuccess(false), 3000);
      }
    }
  };

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getDefaultDueDate = () => {
    const twoWeeksLater = new Date();
    twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);
    return twoWeeksLater.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Equipment Assignment</h2>
        <p className="text-slate-600">Assign knowledge artifacts to guild members for their quests</p>
      </div>

      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-lg bounce-in pulse-glow">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-8 h-8 text-green-600 float-animation" />
            <div>
              <h3 className="text-lg font-bold text-green-800">Quest Item Successfully Equipped!</h3>
              <p className="text-green-700">The artifact has been assigned to the adventurer.</p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200 hover-lift mouse-track">
        <div className="flex items-center space-x-3 mb-8">
          <Sword className="w-8 h-8 text-blue-600 bubble-animation" />
          <h3 className="text-2xl font-bold text-slate-800">New Quest Assignment</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 float-animation" />
                  <span>Select Knowledge Artifact</span>
                </div>
              </label>
              <select
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover-lift"
              >
                <option value="">Choose an available item...</option>
                {availableBooks.map(book => (
                  <option key={book.id} value={book.id}>
                    {book.title} by {book.author} ({book.availableCopies} available)
                  </option>
                ))}
              </select>
              {availableBooks.length === 0 && (
                <p className="text-sm text-red-600 mt-2">No books available for assignment.</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-3">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 bubble-animation" />
                  <span>Select Guild Member</span>
                </div>
              </label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover-lift"
              >
                <option value="">Choose a member...</option>
                {activeUsers.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.membershipType})
                  </option>
                ))}
              </select>
              {activeUsers.length === 0 && (
                <p className="text-sm text-red-600 mt-2">No active members available.</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 float-animation" />
                  <span>Quest Completion Deadline</span>
                </div>
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                min={getMinDate()}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover-lift"
              />
              <p className="text-sm text-slate-500 mt-2">
                Recommended: {new Date(getDefaultDueDate()).toLocaleDateString()} (2 weeks from today)
              </p>
            </div>
          </div>

          {selectedBook && selectedUser && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 bounce-in pulse-glow">
              <h4 className="font-semibold text-blue-800 mb-4">Assignment Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-blue-600 font-medium">Artifact:</span>
                  <p className="text-blue-800">
                    {availableBooks.find(book => book.id === selectedBook)?.title}
                  </p>
                </div>
                <div>
                  <span className="text-blue-600 font-medium">Adventurer:</span>
                  <p className="text-blue-800">
                    {activeUsers.find(user => user.id === selectedUser)?.name}
                  </p>
                </div>
                {dueDate && (
                  <div className="md:col-span-2">
                    <span className="text-blue-600 font-medium">Due Date:</span>
                    <p className="text-blue-800">{new Date(dueDate).toLocaleDateString()}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-6 border-t border-slate-200">
            <button
              type="button"
              onClick={() => {
                setSelectedBook('');
                setSelectedUser('');
                setDueDate('');
              }}
              className="px-8 py-3 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-all duration-300 font-medium hover-lift ripple-effect"
            >
              Clear Form
            </button>
            <button
              type="submit"
              disabled={!selectedBook || !selectedUser || !dueDate}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-300 font-medium hover-lift ripple-effect"
            >
              Assign Equipment
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover-lift mouse-track">
          <div className="flex items-center space-x-3 mb-4">
            <BookOpen className="w-6 h-6 text-green-600 float-animation" />
            <h3 className="text-lg font-bold text-slate-800">Available Artifacts</h3>
          </div>
          <p className="text-2xl font-bold text-green-600 mb-2 pulse-glow">{availableBooks.length}</p>
          <p className="text-sm text-slate-600">Items ready for assignment</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover-lift mouse-track">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="w-6 h-6 text-blue-600 bubble-animation" />
            <h3 className="text-lg font-bold text-slate-800">Active Members</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600 mb-2 pulse-glow">{activeUsers.length}</p>
          <p className="text-sm text-slate-600">Members ready for quests</p>
        </div>
      </div>
    </div>
  );
}