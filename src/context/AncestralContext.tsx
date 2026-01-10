import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface AncestralFormData {
  // Core Location (Required)
  nativeVillage: string;
  district: string;
  state: string;
  
  // Genealogical Data (Optional - for AI training)
  familySurname: string;
  gotra: string;
  caste: string;
  motherTongue: string;
  
  // Temple Hints (Optional)
  knownTempleName: string;
  deityName: string;
  nearbyLandmarks: string;
  
  // Additional Context (Optional)
  familyMemberWhoKnows: string;
  approximateTempleAge: string;
  festivalsCelebrated: string[];
  additionalNotes: string;
  
  // Supporting Documents
  photoFile: File | null;
  
  // Meta
  notSure: boolean;
  consentToStore: boolean;
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
  primaryDeity?: string;
  templeType?: string;
  isCustom: boolean;
}

export interface AncestralSearchAttempt {
  id: string;
  timestamp: string;
  formData: AncestralFormData;
  selectedTemple: SavedAncestralTemple | null;
  wasManuallyAdded: boolean;
}

interface AncestralContextType {
  formData: AncestralFormData;
  setFormData: (data: AncestralFormData) => void;
  suggestedTemples: SuggestedTemple[];
  selectedTemple: SavedAncestralTemple | null;
  setSelectedTemple: (temple: SavedAncestralTemple | null) => void;
  saveAncestralTemple: (temple: SavedAncestralTemple) => void;
  savedAncestralTemples: SavedAncestralTemple[];
  searchAttempts: AncestralSearchAttempt[];
  saveSearchAttempt: (attempt: AncestralSearchAttempt) => void;
  resetFlow: () => void;
}

const defaultFormData: AncestralFormData = {
  nativeVillage: '',
  district: '',
  state: '',
  familySurname: '',
  gotra: '',
  caste: '',
  motherTongue: '',
  knownTempleName: '',
  deityName: '',
  nearbyLandmarks: '',
  familyMemberWhoKnows: '',
  approximateTempleAge: '',
  festivalsCelebrated: [],
  additionalNotes: '',
  photoFile: null,
  notSure: false,
  consentToStore: true,
};

// Dummy suggested temples for browsing (filtered by state)
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
  {
    id: 'ancestor-4',
    name: 'Siddhivinayak Temple',
    location: 'Mumbai, Maharashtra',
    distance: '15 km from your village',
    image: '/temples/siddhivinayak.jpg',
  },
  {
    id: 'ancestor-5',
    name: 'Golden Temple',
    location: 'Amritsar, Punjab',
    distance: '20 km from your village',
    image: '/temples/golden-temple.jpg',
  },
  {
    id: 'ancestor-6',
    name: 'Jagannath Temple',
    location: 'Puri, Odisha',
    distance: '35 km from your village',
    image: '/temples/jagannath.jpg',
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
  const [searchAttempts, setSearchAttempts] = useState<AncestralSearchAttempt[]>(() => {
    const saved = localStorage.getItem('ancestralSearchAttempts');
    return saved ? JSON.parse(saved) : [];
  });

  const saveAncestralTemple = (temple: SavedAncestralTemple) => {
    const updated = [...savedAncestralTemples, temple];
    setSavedAncestralTemples(updated);
    localStorage.setItem('ancestralTemples', JSON.stringify(updated));
  };

  const saveSearchAttempt = (attempt: AncestralSearchAttempt) => {
    const updated = [...searchAttempts, attempt];
    setSearchAttempts(updated);
    // Store without photoFile (can't serialize File object)
    const attemptForStorage = {
      ...attempt,
      formData: { ...attempt.formData, photoFile: null }
    };
    const storedAttempts = [...searchAttempts.map(a => ({ ...a, formData: { ...a.formData, photoFile: null } })), attemptForStorage];
    localStorage.setItem('ancestralSearchAttempts', JSON.stringify(storedAttempts));
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
        searchAttempts,
        saveSearchAttempt,
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
