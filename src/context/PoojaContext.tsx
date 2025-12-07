import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PoojaRequest, priests, poojaServices, Priest, PoojaService } from '@/data/priests';

interface PoojaContextType {
  poojaRequests: PoojaRequest[];
  addPoojaRequest: (request: Omit<PoojaRequest, 'id' | 'createdAt' | 'status'>) => PoojaRequest;
  getPoojaRequestsByUser: (phone: string) => PoojaRequest[];
  getPoojaRequestsByPriest: (priestId: string) => PoojaRequest[];
  updateRequestStatus: (requestId: string, status: PoojaRequest['status']) => void;
  getPriestsByTemple: (templeId: string) => Priest[];
  getAllPoojaServices: () => PoojaService[];
  getPriestById: (priestId: string) => Priest | undefined;
  getServiceById: (serviceId: string) => PoojaService | undefined;
}

const PoojaContext = createContext<PoojaContextType | undefined>(undefined);

export const PoojaProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [poojaRequests, setPoojaRequests] = useState<PoojaRequest[]>(() => {
    const saved = localStorage.getItem('poojaRequests');
    return saved ? JSON.parse(saved) : [];
  });

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addPoojaRequest = (requestData: Omit<PoojaRequest, 'id' | 'createdAt' | 'status'>): PoojaRequest => {
    const newRequest: PoojaRequest = {
      ...requestData,
      id: generateId(),
      createdAt: new Date(),
      status: 'pending',
    };
    
    setPoojaRequests(prev => {
      const updated = [...prev, newRequest];
      localStorage.setItem('poojaRequests', JSON.stringify(updated));
      return updated;
    });
    
    return newRequest;
  };

  const getPoojaRequestsByUser = (phone: string) => {
    return poojaRequests.filter(r => r.devoteePhone === phone);
  };

  const getPoojaRequestsByPriest = (priestId: string) => {
    return poojaRequests.filter(r => r.priestId === priestId);
  };

  const updateRequestStatus = (requestId: string, status: PoojaRequest['status']) => {
    setPoojaRequests(prev => {
      const updated = prev.map(r => 
        r.id === requestId ? { ...r, status } : r
      );
      localStorage.setItem('poojaRequests', JSON.stringify(updated));
      return updated;
    });
  };

  const getPriestsByTemple = (templeId: string) => {
    return priests.filter(p => p.templeId === templeId);
  };

  const getAllPoojaServices = () => poojaServices;

  const getPriestById = (priestId: string) => {
    return priests.find(p => p.id === priestId);
  };

  const getServiceById = (serviceId: string) => {
    return poojaServices.find(s => s.id === serviceId);
  };

  return (
    <PoojaContext.Provider value={{
      poojaRequests,
      addPoojaRequest,
      getPoojaRequestsByUser,
      getPoojaRequestsByPriest,
      updateRequestStatus,
      getPriestsByTemple,
      getAllPoojaServices,
      getPriestById,
      getServiceById,
    }}>
      {children}
    </PoojaContext.Provider>
  );
};

export const usePooja = () => {
  const context = useContext(PoojaContext);
  if (!context) {
    throw new Error('usePooja must be used within a PoojaProvider');
  }
  return context;
};
