import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Donation {
  id: string;
  templeId: string;
  templeName: string;
  amount: number;
  donorName: string;
  donorPhone: string;
  donorEmail?: string;
  paymentMethod: 'upi' | 'card' | 'netbanking';
  status: 'pending' | 'completed' | 'failed';
  transactionId: string;
  createdAt: Date;
  receiptNumber: string;
}

interface DonationContextType {
  donations: Donation[];
  addDonation: (donation: Omit<Donation, 'id' | 'transactionId' | 'receiptNumber' | 'createdAt' | 'status'>) => Donation;
  getDonationsByTemple: (templeId: string) => Donation[];
  getDonationsByUser: (phone: string) => Donation[];
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export const DonationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [donations, setDonations] = useState<Donation[]>(() => {
    const saved = localStorage.getItem('donations');
    return saved ? JSON.parse(saved) : [];
  });

  const generateId = () => Math.random().toString(36).substr(2, 9);
  const generateReceiptNumber = () => `RCP${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`;
  const generateTransactionId = () => `TXN${Date.now()}${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

  const addDonation = (donationData: Omit<Donation, 'id' | 'transactionId' | 'receiptNumber' | 'createdAt' | 'status'>): Donation => {
    const newDonation: Donation = {
      ...donationData,
      id: generateId(),
      transactionId: generateTransactionId(),
      receiptNumber: generateReceiptNumber(),
      createdAt: new Date(),
      status: 'completed',
    };
    
    setDonations(prev => {
      const updated = [...prev, newDonation];
      localStorage.setItem('donations', JSON.stringify(updated));
      return updated;
    });
    
    return newDonation;
  };

  const getDonationsByTemple = (templeId: string) => {
    return donations.filter(d => d.templeId === templeId);
  };

  const getDonationsByUser = (phone: string) => {
    return donations.filter(d => d.donorPhone === phone);
  };

  return (
    <DonationContext.Provider value={{ donations, addDonation, getDonationsByTemple, getDonationsByUser }}>
      {children}
    </DonationContext.Provider>
  );
};

export const useDonation = () => {
  const context = useContext(DonationContext);
  if (!context) {
    throw new Error('useDonation must be used within a DonationProvider');
  }
  return context;
};
