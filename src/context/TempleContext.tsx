import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Temple, temples as templeData } from '@/data/temples';

interface TempleContextType {
  temples: Temple[];
  loading: boolean;
  error: string | null;
  getTempleById: (id: string) => Temple | undefined;
  followedTemples: string[];
  toggleFollowTemple: (templeId: string) => void;
  isFollowing: (templeId: string) => boolean;
}

const TempleContext = createContext<TempleContextType | undefined>(undefined);

export const TempleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [temples, setTemples] = useState<Temple[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [followedTemples, setFollowedTemples] = useState<string[]>(() => {
    const saved = localStorage.getItem('followedTemples');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    // Simulate API call - in production, this would be an actual API request
    const fetchTemples = async () => {
      try {
        setLoading(true);
        // Simulating network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setTemples(templeData);
        setError(null);
      } catch (err) {
        setError('Failed to load temples');
      } finally {
        setLoading(false);
      }
    };

    fetchTemples();
  }, []);

  useEffect(() => {
    localStorage.setItem('followedTemples', JSON.stringify(followedTemples));
  }, [followedTemples]);

  const getTempleById = (id: string) => {
    return temples.find(temple => temple.id === id);
  };

  const toggleFollowTemple = (templeId: string) => {
    setFollowedTemples(prev => 
      prev.includes(templeId)
        ? prev.filter(id => id !== templeId)
        : [...prev, templeId]
    );
  };

  const isFollowing = (templeId: string) => {
    return followedTemples.includes(templeId);
  };

  return (
    <TempleContext.Provider
      value={{
        temples,
        loading,
        error,
        getTempleById,
        followedTemples,
        toggleFollowTemple,
        isFollowing,
      }}
    >
      {children}
    </TempleContext.Provider>
  );
};

export const useTemple = () => {
  const context = useContext(TempleContext);
  if (context === undefined) {
    throw new Error('useTemple must be used within a TempleProvider');
  }
  return context;
};
