export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  genre: string;
  publishedYear: number;
  copies: number;
  availableCopies: number;
  description?: string;
  coverUrl?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: 'student' | 'faculty' | 'general';
  joinDate: string;
  isActive: boolean;
}

export interface Transaction {
  id: string;
  bookId: string;
  userId: string;
  issueDate: string;
  dueDate: string;
  returnDate?: string;
  status: 'issued' | 'returned' | 'overdue';
  fineAmount?: number;
}

export interface LibraryStats {
  totalBooks: number;
  totalUsers: number;
  issuedBooks: number;
  overdueBooks: number;
}