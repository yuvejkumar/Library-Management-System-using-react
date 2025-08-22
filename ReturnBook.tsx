import React from 'react';
import { useLibrary } from '../contexts/LibraryContext';
import { RefreshCw, BookOpen, User, Calendar, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export function ReturnBook() {
  const { transactions, books, users, returnBook } = useLibrary();
  
  const activeTransactions = transactions.filter(t => t.status === 'issued');
  const now = new Date();

  const getTransactionDetails = (transaction: any) => {
    const book = books.find(b => b.id === transaction.bookId);
    const user = users.find(u => u.id === transaction.userId);
    const isOverdue = new Date(transaction.dueDate) < now;
    const daysUntilDue = Math.ceil((new Date(transaction.dueDate).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    return { book, user, isOverdue, daysUntilDue };
  };

  const handleReturn = (transactionId: string) => {
    returnBook(transactionId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Equipment Return Center</h2>
        <p className="text-slate-600">Process returns and restore artifacts to inventory</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover-lift mouse-track">
          <div className="flex items-center space-x-3 mb-4">
            <Clock className="w-6 h-6 text-blue-600 float-animation" />
            <h3 className="text-lg font-bold text-slate-800">On Quest</h3>
          </div>
          <p className="text-2xl font-bold text-blue-600 mb-2 pulse-glow">{activeTransactions.length}</p>
          <p className="text-sm text-slate-600">Items currently assigned</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover-lift mouse-track">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600 wiggle-animation" />
            <h3 className="text-lg font-bold text-slate-800">Overdue</h3>
          </div>
          <p className="text-2xl font-bold text-red-600 mb-2">
            {activeTransactions.filter(t => new Date(t.dueDate) < now).length}
          </p>
          <p className="text-sm text-slate-600">Items past due date</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover-lift mouse-track">
          <div className="flex items-center space-x-3 mb-4">
            <CheckCircle className="w-6 h-6 text-green-600 bubble-animation" />
            <h3 className="text-lg font-bold text-slate-800">Returned Today</h3>
          </div>
          <p className="text-2xl font-bold text-green-600 mb-2">
            {transactions.filter(t => 
              t.status === 'returned' && 
              t.returnDate &&
              new Date(t.returnDate).toDateString() === new Date().toDateString()
            ).length}
          </p>
          <p className="text-sm text-slate-600">Items processed today</p>
        </div>
      </div>

      <div className="space-y-4">
        {activeTransactions.length > 0 ? (
          activeTransactions.map((transaction, index) => {
            const { book, user, isOverdue, daysUntilDue } = getTransactionDetails(transaction);
            
            if (!book || !user) return null;

            return (
              <div
                key={transaction.id}
                className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all duration-300 hover-lift mouse-track bounce-in ${
                  isOverdue ? 'border-red-300 bg-red-50' : 'border-slate-200'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.01)';
                  e.currentTarget.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-slate-600">
                        <BookOpen className="w-4 h-4" />
                        <span className="text-sm font-medium">Artifact</span>
                      </div>
                      <p className="font-bold text-slate-800">{book.title}</p>
                      <p className="text-sm text-slate-600">by {book.author}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-slate-600">
                        <User className="w-4 h-4" />
                        <span className="text-sm font-medium">Adventurer</span>
                      </div>
                      <p className="font-bold text-slate-800">{user.name}</p>
                      <p className="text-sm text-slate-600 capitalize">{user.membershipType}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">Quest Dates</span>
                      </div>
                      <p className="text-sm">
                        <span className="text-slate-600">Issued:</span><br />
                        <span className="font-medium">{new Date(transaction.issueDate).toLocaleDateString()}</span>
                      </p>
                      <p className="text-sm">
                        <span className="text-slate-600">Due:</span><br />
                        <span className={`font-medium ${isOverdue ? 'text-red-600' : 'text-slate-800'}`}>
                          {new Date(transaction.dueDate).toLocaleDateString()}
                        </span>
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">Status</span>
                      </div>
                      <div className="space-y-2">
                        {isOverdue ? (
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-red-600 wiggle-animation" />
                            <span className="text-sm font-bold text-red-600">
                              {Math.abs(daysUntilDue)} day{Math.abs(daysUntilDue) !== 1 ? 's' : ''} overdue
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium text-green-600">
                              {daysUntilDue} day{daysUntilDue !== 1 ? 's' : ''} remaining
                            </span>
                          </div>
                        )}
                        <button
                          onClick={() => handleReturn(transaction.id)}
                          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 hover-lift text-sm font-medium ripple-effect"
                        >
                          <RefreshCw className="w-4 h-4" />
                          <span>Process Return</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-slate-200 bounce-in">
            <RefreshCw className="w-16 h-16 text-slate-300 mx-auto mb-4 float-animation" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No Active Quests</h3>
            <p className="text-slate-500">All artifacts have been returned to the inventory.</p>
          </div>
        )}
      </div>
    </div>
  );
}