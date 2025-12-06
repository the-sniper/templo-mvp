import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AncestralFormData {
  nativeVillage: string;
  district: string;
  state: string;
  familySurname: string;
  knownTempleName: string;
  notSure: boolean;
  photoFile: File | null;
}

export interface SuggestedTemple {
  id: string;
  name: string;
  location: string;
  distance: string;
  image: string;
}

export interface SavedAncestralTemple {
  id: string;
  name: string;
  location: string;
  image: string;
  description?: string;
  isCustom: boolean;
}

interface AncestralContextType {
  formData: AncestralFormData;
  setFormData: (data: AncestralFormData) => void;
  suggestedTemples: SuggestedTemple[];
  selectedTemple: SavedAncestralTemple | null;
  setSelectedTemple: (temple: SavedAncestralTemple | null) => void;
  saveAncestralTemple: (temple: SavedAncestralTemple) => void;
  savedAncestralTemples: SavedAncestralTemple[];
  resetFlow: () => void;
}

const defaultFormData: AncestralFormData = {
  nativeVillage: '',
  district: '',
  state: '',
  familySurname: '',
  knownTempleName: '',
  notSure: false,
  photoFile: null,
};

// Dummy suggested temples for the simulated matching
const dummySuggestedTemples: SuggestedTemple[] = [
  {
    id: 'ancestor-1',
    name: 'Sri Venkateshwara Temple',
    location: 'Tirumala, Andhra Pradesh',
    distance: '12 km from your village',
    image: '/temples/tirupati.jpg',
  },
  {
    id: 'ancestor-2',
    name: 'Kashi Vishwanath Temple',
    location: 'Varanasi, Uttar Pradesh',
    distance: '45 km from your village',
    image: '/temples/kashi.jpg',
  },
  {
    id: 'ancestor-3',
    name: 'Meenakshi Amman Temple',
    location: 'Madurai, Tamil Nadu',
    distance: '28 km from your village',
    image: '/temples/meenakshi.jpg',
  },
];

const AncestralContext = createContext<AncestralContextType | undefined>(undefined);

export const AncestralProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<AncestralFormData>(defaultFormData);
  const [selectedTemple, setSelectedTemple] = useState<SavedAncestralTemple | null>(null);
  const [savedAncestralTemples, setSavedAncestralTemples] = useState<SavedAncestralTemple[]>(() => {
    const saved = localStorage.getItem('ancestralTemples');
    return saved ? JSON.parse(saved) : [];
  });

  const saveAncestralTemple = (temple: SavedAncestralTemple) => {
    const updated = [...savedAncestralTemples, temple];
    setSavedAncestralTemples(updated);
    localStorage.setItem('ancestralTemples', JSON.stringify(updated));
  };

  const resetFlow = () => {
    setFormData(defaultFormData);
    setSelectedTemple(null);
  };

  return (
    <AncestralContext.Provider
      value={{
        formData,
        setFormData,
        suggestedTemples: dummySuggestedTemples,
        selectedTemple,
        setSelectedTemple,
        saveAncestralTemple,
        savedAncestralTemples,
        resetFlow,
      }}
    >
      {children}
    </AncestralContext.Provider>
  );
};

export const useAncestral = () => {
  const context = useContext(AncestralContext);
  if (context === undefined) {
    throw new Error('useAncestral must be used within an AncestralProvider');
  }
  return context;
};
