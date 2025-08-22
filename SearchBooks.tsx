import React, { useState, useMemo } from 'react';
import { useLibrary } from '../contexts/LibraryContext';
import { Search, Filter, BookOpen, User, Calendar, Tag } from 'lucide-react';
import { Book } from '../types';

export function SearchBooks() {
  const { books } = useLibrary();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);

  const genres = useMemo(() => {
    const allGenres = books.map(book => book.genre);
    return [...new Set(allGenres)].filter(Boolean).sort();
  }, [books]);

  const filteredBooks = useMemo(() => {
    let filtered = books;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query) ||
        book.isbn.includes(searchQuery) ||
        book.genre.toLowerCase().includes(query)
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter(book => book.genre === selectedGenre);
    }

    if (availableOnly) {
      filtered = filtered.filter(book => book.availableCopies > 0);
    }

    return filtered;
  }, [books, searchQuery, selectedGenre, availableOnly]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Quest Search</h2>
        <p className="text-slate-600">Find the perfect knowledge artifact for your adventure</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 border border-slate-200 hover-lift mouse-track">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2 float-animation" />
            <input
              type="text"
              placeholder="Search by title, author, ISBN, or genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover-lift"
            />
          </div>
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-slate-600 bubble-animation" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover-lift"
            >
              <option value="">All Genres</option>
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
            <label className="flex items-center space-x-2 text-slate-600">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-slate-300 hover-lift"
              />
              <span className="text-sm">Available only</span>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-slate-600 mb-4">
          <span>Showing {filteredBooks.length} of {books.length} items</span>
          {searchQuery && (
            <span className="pulse-glow">Searching for: <strong>"{searchQuery}"</strong></span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book, index) => (
          <div
            key={book.id}
            className="bg-white rounded-xl shadow-lg p-6 transform transition-all duration-300 hover-lift border border-slate-200 mouse-track bubble-animation bounce-in"
            style={{ animationDelay: `${index * 0.05}s` }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px) scale(1.02) rotateZ(1deg)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1) rotateZ(0deg)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div className="mb-4">
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
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Genre:</span>
                <div className="flex items-center space-x-2">
                  <Tag className="w-3 h-3 text-slate-500" />
                  <span className="text-sm font-medium text-slate-800 bg-slate-100 px-2 py-1 rounded hover-lift">
                    {book.genre}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Availability:</span>
                <span className={`text-sm font-bold ${
                  book.availableCopies > 0 ? 'text-green-600' : 'text-red-600'
                } pulse-glow`}>
                  {book.availableCopies}/{book.copies} available
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
                  {book.availableCopies > 0 ? 'Ready for Quest' : 'Currently on Adventure'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12 bounce-in">
          <Search className="w-16 h-16 text-slate-300 mx-auto mb-4 float-animation" />
          <h3 className="text-xl font-semibold text-slate-600 mb-2">No Artifacts Found</h3>
          <p className="text-slate-500">
            {searchQuery || selectedGenre || availableOnly 
              ? 'Try adjusting your search criteria or filters.'
              : 'No books available in the inventory yet.'}
          </p>
        </div>
      )}
    </div>
  );
}