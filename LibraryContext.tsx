import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Book, User, Transaction, LibraryStats } from '../types';

interface LibraryContextType {
  books: Book[];
  users: User[];
  transactions: Transaction[];
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (id: string, book: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;
  issueBook: (bookId: string, userId: string, dueDate: string) => boolean;
  returnBook: (transactionId: string) => void;
  getStats: () => LibraryStats;
  searchBooks: (query: string) => Book[];
  getOverdueTransactions: () => Transaction[];
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const [books, setBooks] = useLocalStorage<Book[]>('lms-books', []);
  const [users, setUsers] = useLocalStorage<User[]>('lms-users', []);
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('lms-transactions', []);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addBook = (bookData: Omit<Book, 'id'>) => {
    const newBook: Book = {
      ...bookData,
      id: generateId(),
      availableCopies: bookData.copies,
    };
    setBooks(prev => [...prev, newBook]);
  };

  const updateBook = (id: string, bookData: Partial<Book>) => {
    setBooks(prev => prev.map(book => 
      book.id === id ? { ...book, ...bookData } : book
    ));
  };

  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(book => book.id !== id));
  };

  const addUser = (userData: Omit<User, 'id'>) => {
    const newUser: User = {
      ...userData,
      id: generateId(),
    };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (id: string, userData: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...userData } : user
    ));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id));
  };

  const issueBook = (bookId: string, userId: string, dueDate: string): boolean => {
    const book = books.find(b => b.id === bookId);
    if (!book || book.availableCopies <= 0) return false;

    const transaction: Transaction = {
      id: generateId(),
      bookId,
      userId,
      issueDate: new Date().toISOString(),
      dueDate,
      status: 'issued',
    };

    setTransactions(prev => [...prev, transaction]);
    updateBook(bookId, { availableCopies: book.availableCopies - 1 });
    return true;
  };

  const returnBook = (transactionId: string) => {
    const transaction = transactions.find(t => t.id === transactionId);
    if (!transaction) return;

    const book = books.find(b => b.id === transaction.bookId);
    if (book) {
      updateBook(book.id, { availableCopies: book.availableCopies + 1 });
    }

    setTransactions(prev => prev.map(t => 
      t.id === transactionId 
        ? { ...t, returnDate: new Date().toISOString(), status: 'returned' as const }
        : t
    ));
  };

  const getStats = (): LibraryStats => {
    const activeTransactions = transactions.filter(t => t.status === 'issued');
    const now = new Date();
    const overdueCount = activeTransactions.filter(t => new Date(t.dueDate) < now).length;

    return {
      totalBooks: books.reduce((sum, book) => sum + book.copies, 0),
      totalUsers: users.filter(u => u.isActive).length,
      issuedBooks: activeTransactions.length,
      overdueBooks: overdueCount,
    };
  };

  const searchBooks = (query: string): Book[] => {
    const lowercaseQuery = query.toLowerCase();
    return books.filter(book => 
      book.title.toLowerCase().includes(lowercaseQuery) ||
      book.author.toLowerCase().includes(lowercaseQuery) ||
      book.genre.toLowerCase().includes(lowercaseQuery) ||
      book.isbn.includes(query)
    );
  };

  const getOverdueTransactions = (): Transaction[] => {
    const now = new Date();
    return transactions.filter(t => 
      t.status === 'issued' && new Date(t.dueDate) < now
    );
  };

  const value = {
    books,
    users,
    transactions,
    addBook,
    updateBook,
    deleteBook,
    addUser,
    updateUser,
    deleteUser,
    issueBook,
    returnBook,
    getStats,
    searchBooks,
    getOverdueTransactions,
  };

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
}