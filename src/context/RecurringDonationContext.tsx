import React, { createContext, useContext, useState, ReactNode } from 'react';

export type RecurringFrequency = 'daily' | 'weekly' | 'monthly';

export interface RecurringDonation {
  id: string;
  templeId: string;
  templeName: string;
  amount: number;
  frequency: RecurringFrequency;
  dayOfWeek?: number; // 0-6 for weekly (Sunday = 0)
  dayOfMonth?: number; // 1-31 for monthly
  donorName: string;
  donorPhone: string;
  donorEmail?: string;
  paymentMethod: 'upi' | 'card' | 'netbanking';
  status: 'active' | 'paused' | 'cancelled';
  createdAt: Date;
  nextDonationDate: Date;
  totalDonated: number;
  donationCount: number;
}

interface RecurringDonationContextType {
  recurringDonations: RecurringDonation[];
  addRecurringDonation: (donation: Omit<RecurringDonation, 'id' | 'createdAt' | 'status' | 'totalDonated' | 'donationCount' | 'nextDonationDate'>) => RecurringDonation;
  pauseRecurringDonation: (id: string) => void;
  resumeRecurringDonation: (id: string) => void;
  cancelRecurringDonation: (id: string) => void;
  getRecurringDonationsByUser: (phone: string) => RecurringDonation[];
  getRecurringDonationsByTemple: (templeId: string) => RecurringDonation[];
}

const RecurringDonationContext = createContext<RecurringDonationContextType | undefined>(undefined);

const calculateNextDonationDate = (frequency: RecurringFrequency, dayOfWeek?: number, dayOfMonth?: number): Date => {
  const now = new Date();
  const next = new Date(now);
  
  switch (frequency) {
    case 'daily':
      next.setDate(next.getDate() + 1);
      break;
    case 'weekly':
      const currentDay = now.getDay();
      const targetDay = dayOfWeek ?? 1; // Default Monday
      let daysToAdd = targetDay - currentDay;
      if (daysToAdd <= 0) daysToAdd += 7;
      next.setDate(next.getDate() + daysToAdd);
      break;
    case 'monthly':
      const targetDate = dayOfMonth ?? 1;
      next.setMonth(next.getMonth() + 1);
      next.setDate(Math.min(targetDate, new Date(next.getFullYear(), next.getMonth() + 1, 0).getDate()));
      break;
  }
  
  return next;
};

export const RecurringDonationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [recurringDonations, setRecurringDonations] = useState<RecurringDonation[]>(() => {
    const saved = localStorage.getItem('recurringDonations');
    return saved ? JSON.parse(saved) : [];
  });

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addRecurringDonation = (donationData: Omit<RecurringDonation, 'id' | 'createdAt' | 'status' | 'totalDonated' | 'donationCount' | 'nextDonationDate'>): RecurringDonation => {
    const newDonation: RecurringDonation = {
      ...donationData,
      id: generateId(),
      createdAt: new Date(),
      status: 'active',
      totalDonated: 0,
      donationCount: 0,
      nextDonationDate: calculateNextDonationDate(donationData.frequency, donationData.dayOfWeek, donationData.dayOfMonth),
    };
    
    setRecurringDonations(prev => {
      const updated = [...prev, newDonation];
      localStorage.setItem('recurringDonations', JSON.stringify(updated));
      return updated;
    });
    
    return newDonation;
  };

  const pauseRecurringDonation = (id: string) => {
    setRecurringDonations(prev => {
      const updated = prev.map(d => d.id === id ? { ...d, status: 'paused' as const } : d);
      localStorage.setItem('recurringDonations', JSON.stringify(updated));
      return updated;
    });
  };

  const resumeRecurringDonation = (id: string) => {
    setRecurringDonations(prev => {
      const updated = prev.map(d => {
        if (d.id === id) {
          return {
            ...d,
            status: 'active' as const,
            nextDonationDate: calculateNextDonationDate(d.frequency, d.dayOfWeek, d.dayOfMonth),
          };
        }
        return d;
      });
      localStorage.setItem('recurringDonations', JSON.stringify(updated));
      return updated;
    });
  };

  const cancelRecurringDonation = (id: string) => {
    setRecurringDonations(prev => {
      const updated = prev.map(d => d.id === id ? { ...d, status: 'cancelled' as const } : d);
      localStorage.setItem('recurringDonations', JSON.stringify(updated));
      return updated;
    });
  };

  const getRecurringDonationsByUser = (phone: string) => {
    return recurringDonations.filter(d => d.donorPhone === phone);
  };

  const getRecurringDonationsByTemple = (templeId: string) => {
    return recurringDonations.filter(d => d.templeId === templeId);
  };

  return (
    <RecurringDonationContext.Provider value={{
      recurringDonations,
      addRecurringDonation,
      pauseRecurringDonation,
      resumeRecurringDonation,
      cancelRecurringDonation,
      getRecurringDonationsByUser,
      getRecurringDonationsByTemple,
    }}>
      {children}
    </RecurringDonationContext.Provider>
  );
};

export const useRecurringDonation = () => {
  const context = useContext(RecurringDonationContext);
  if (!context) {
    throw new Error('useRecurringDonation must be used within a RecurringDonationProvider');
  }
  return context;
};
