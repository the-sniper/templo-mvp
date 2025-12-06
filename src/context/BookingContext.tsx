import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  maxCapacity: number;
  booked: number;
}

export interface Booking {
  id: string;
  templeId: string;
  templeName: string;
  eventType: 'special-darshan' | 'pooja' | 'abhishekam';
  eventName: string;
  date: string;
  timeSlot: string;
  devotees: number;
  devoteeNames: string[];
  bookerName: string;
  bookerPhone: string;
  bookerEmail?: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  bookingId: string;
  createdAt: Date;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'bookingId' | 'createdAt' | 'status'>) => Booking;
  getBookingsByTemple: (templeId: string) => Booking[];
  getBookingsByUser: (phone: string) => Booking[];
  cancelBooking: (bookingId: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const generateId = () => Math.random().toString(36).substr(2, 9);
  const generateBookingId = () => `BKG${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;

  const addBooking = (bookingData: Omit<Booking, 'id' | 'bookingId' | 'createdAt' | 'status'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: generateId(),
      bookingId: generateBookingId(),
      createdAt: new Date(),
      status: 'confirmed',
    };
    
    setBookings(prev => {
      const updated = [...prev, newBooking];
      localStorage.setItem('bookings', JSON.stringify(updated));
      return updated;
    });
    
    return newBooking;
  };

  const getBookingsByTemple = (templeId: string) => {
    return bookings.filter(b => b.templeId === templeId);
  };

  const getBookingsByUser = (phone: string) => {
    return bookings.filter(b => b.bookerPhone === phone);
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => {
      const updated = prev.map(b => 
        b.bookingId === bookingId ? { ...b, status: 'cancelled' as const } : b
      );
      localStorage.setItem('bookings', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, getBookingsByTemple, getBookingsByUser, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
