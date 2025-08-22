import React, { useState } from 'react';
import { useLibrary } from '../contexts/LibraryContext';
import { Book } from '../types';
import { Plus, Edit3, Trash2, BookOpen, User, Calendar } from 'lucide-react';

export function BookManagement() {
  const { books, addBook, updateBook, deleteBook } = useLibrary();
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    genre: '',
    publishedYear: new Date().getFullYear(),
    copies: 1,
    description: '',
  });

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      isbn: '',
      genre: '',
      publishedYear: new Date().getFullYear(),
      copies: 1,
      description: '',
    });
    setEditingBook(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBook) {
      updateBook(editingBook.id, formData);
    } else {
      addBook(formData);
    }
    resetForm();
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      genre: book.genre,
      publishedYear: book.publishedYear,
      copies: book.copies,
      description: book.description || '',
    });
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">Inventory Management</h2>
          <p className="text-slate-600">Manage your collection of knowledge artifacts</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 hover-lift shadow-lg ripple-effect float-animation"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Item</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
              {editingBook ? 'Upgrade Item' : 'Add New Item'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter book title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Author
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.author}
                    onChange={(e) => setFormData({...formData, author: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter author name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    ISBN
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.isbn}
                    onChange={(e) => setFormData({...formData, isbn: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="Enter ISBN"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Genre
                  </label>
                  <select
                    value={formData.genre}
                    onChange={(e) => setFormData({...formData, genre: e.target.value})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select genre</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Science">Science</option>
                    <option value="Technology">Technology</option>
                    <option value="History">History</option>
                    <option value="Biography">Biography</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Mystery">Mystery</option>
                    <option value="Romance">Romance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Published Year
                  </label>
                  <input
                    type="number"
                    required
                    min="1000"
                    max={new Date().getFullYear()}
                    value={formData.publishedYear}
                    onChange={(e) => setFormData({...formData, publishedYear: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Copies
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.copies}
                    onChange={(e) => setFormData({...formData, copies: parseInt(e.target.value)})}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Enter book description (optional)"
                />
              </div>
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingBook ? 'Update Item' : 'Add to Inventory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book, index) => (
          <div
            key={book.id}
            className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover-lift border border-slate-200 mouse-track bubble-animation bounce-in"
            style={{ animationDelay: `${index * 0.1}s` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-10px) scale(1.03) rotateX(5deg)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2">
                  {book.title}
                </h3>
                <div className="flex items-center space-x-2 text-slate-600 mb-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{book.author}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600 mb-3">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{book.publishedYear}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(book)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover-lift ripple-effect"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteBook(book.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover-lift ripple-effect"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Genre:</span>
                <span className="text-sm font-medium text-slate-800 bg-slate-100 px-2 py-1 rounded hover-lift">
                  {book.genre}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Available:</span>
                <span className={`text-sm font-bold ${
                  book.availableCopies > 0 ? 'text-green-600' : 'text-red-600'
                } pulse-glow`}>
                  {book.availableCopies}/{book.copies}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">ISBN:</span>
                <span className="text-sm font-mono text-slate-800">{book.isbn}</span>
              </div>
            </div>

            {book.description && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="text-sm text-slate-600 line-clamp-3">{book.description}</p>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg ${
                book.availableCopies > 0 
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              } hover-lift shine-effect`}>
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {book.availableCopies > 0 ? 'Available for Quest' : 'Currently Equipped'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center py-12 bounce-in">
          <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4 float-animation" />
          <h3 className="text-xl font-semibold text-slate-600 mb-2">No Items in Inventory</h3>
          <p className="text-slate-500 mb-6">Start building your collection by adding your first book.</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 hover-lift ripple-effect"
          >
            Add Your First Item
          </button>
        </div>
      )}
    </div>
  );
}