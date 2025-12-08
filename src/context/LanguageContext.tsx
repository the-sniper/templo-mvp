import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ta' | 'hi' | 'te' | 'kn' | 'ml';

interface LanguageLabels {
  [key: string]: {
    [lang in Language]: string;
  };
}

const translations: LanguageLabels = {
  // Navigation
  home: { en: 'Home', ta: 'முகப்பு', hi: 'होम', te: 'హోమ్', kn: 'ಮುಖಪುಟ', ml: 'ഹോം' },
  temples: { en: 'Temples', ta: 'கோயில்கள்', hi: 'मंदिर', te: 'దేవాలయాలు', kn: 'ದೇವಾಲಯಗಳು', ml: 'ക്ഷേത്രങ്ങൾ' },
  search: { en: 'Search temples...', ta: 'கோயில்களைத் தேடு...', hi: 'मंदिर खोजें...', te: 'దేవాలయాలను వెతకండి...', kn: 'ದೇವಾಲಯಗಳನ್ನು ಹುಡುಕಿ...', ml: 'ക്ഷേത്രങ്ങൾ തിരയുക...' },
  
  // Actions
  follow: { en: 'Follow', ta: 'பின்தொடர்', hi: 'फॉलो करें', te: 'ఫాలో', kn: 'ಅನುಸರಿಸಿ', ml: 'ഫോളോ' },
  following: { en: 'Following', ta: 'பின்தொடர்கிறது', hi: 'फॉलो किया', te: 'ఫాలో చేస్తున్నారు', kn: 'ಅನುಸರಿಸುತ್ತಿದ್ದಾರೆ', ml: 'ഫോളോ ചെയ്യുന്നു' },
  donate: { en: 'Donate', ta: 'நன்கொடை', hi: 'दान करें', te: 'విరాళం', kn: 'ದಾನ', ml: 'സംഭാവന' },
  bookSlot: { en: 'Book Slot', ta: 'இடம் பதிவு', hi: 'स्लॉट बुक करें', te: 'స్లాట్ బుక్', kn: 'ಸ್ಲಾಟ್ ಬುಕ್', ml: 'സ്ലോട്ട് ബുക്ക്' },
  requestPooja: { en: 'Request Pooja', ta: 'பூஜை கோரிக்கை', hi: 'पूजा अनुरोध', te: 'పూజ అభ్యర్థన', kn: 'ಪೂಜೆ ವಿನಂತಿ', ml: 'പൂജ അഭ്യർത്ഥന' },
  share: { en: 'Share', ta: 'பகிர்', hi: 'शेयर करें', te: 'షేర్', kn: 'ಹಂಚಿಕೊಳ್ಳಿ', ml: 'ഷെയർ' },
  
  // Temple Details
  timings: { en: 'Timings', ta: 'நேரங்கள்', hi: 'समय', te: 'సమయాలు', kn: 'ಸಮಯ', ml: 'സമയം' },
  announcements: { en: 'Announcements', ta: 'அறிவிப்புகள்', hi: 'घोषणाएं', te: 'ప్రకటనలు', kn: 'ಪ್ರಕಟಣೆಗಳು', ml: 'അറിയിപ്പുകൾ' },
  gallery: { en: 'Gallery', ta: 'படத்தொகுப்பு', hi: 'गैलरी', te: 'గ్యాలరీ', kn: 'ಗ್ಯಾಲರಿ', ml: 'ഗാലറി' },
  history: { en: 'History & Significance', ta: 'வரலாறு & முக்கியத்துவம்', hi: 'इतिहास और महत्व', te: 'చరిత్ర & ప్రాముఖ్యత', kn: 'ಇತಿಹಾಸ ಮತ್ತು ಮಹತ್ವ', ml: 'ചരിത്രവും പ്രാധാന്യവും' },
  liveDarshan: { en: 'Live Darshan', ta: 'நேரடி தரிசனம்', hi: 'लाइव दर्शन', te: 'లైవ్ దర్శనం', kn: 'ಲೈವ್ ದರ್ಶನ', ml: 'ലൈവ് ദർശനം' },
  templeMusic: { en: 'Temple Music', ta: 'கோயில் இசை', hi: 'मंदिर संगीत', te: 'దేవాలయ సంగీతం', kn: 'ದೇವಾಲಯ ಸಂಗೀತ', ml: 'ക്ഷേത്ര സംഗീതം' },
  
  // Donation
  oneTimeDonation: { en: 'One-Time Donation', ta: 'ஒரு முறை நன்கொடை', hi: 'एकबार दान', te: 'ఒక సారి విరాళం', kn: 'ಒಂದು ಬಾರಿ ದಾನ', ml: 'ഒറ്റത്തവണ സംഭാവന' },
  recurringDonation: { en: 'Recurring Donation', ta: 'தொடர் நன்கொடை', hi: 'आवर्ती दान', te: 'పునరావృత విరాళం', kn: 'ಮರುಕಳಿಸುವ ದಾನ', ml: 'ആവർത്തിച്ചുള്ള സംഭാവന' },
  amount: { en: 'Amount', ta: 'தொகை', hi: 'राशि', te: 'మొత్తం', kn: 'ಮೊತ್ತ', ml: 'തുക' },
  
  // General
  viewDetails: { en: 'View Details', ta: 'விவரங்களைக் காண்க', hi: 'विवरण देखें', te: 'వివరాలు చూడండి', kn: 'ವಿವರಗಳನ್ನು ನೋಡಿ', ml: 'വിശദാംശങ്ങൾ കാണുക' },
  back: { en: 'Back', ta: 'பின்செல்', hi: 'वापस', te: 'వెనుకకు', kn: 'ಹಿಂದೆ', ml: 'മടങ്ങുക' },
  loading: { en: 'Loading...', ta: 'ஏற்றுகிறது...', hi: 'लोड हो रहा है...', te: 'లోడ్ అవుతోంది...', kn: 'ಲೋಡ್ ಆಗುತ್ತಿದೆ...', ml: 'ലോഡ് ചെയ്യുന്നു...' },
};

const languageNames: { [lang in Language]: string } = {
  en: 'English',
  ta: 'தமிழ்',
  hi: 'हिंदी',
  te: 'తెలుగు',
  kn: 'ಕನ್ನಡ',
  ml: 'മലയാളം',
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  languageNames: typeof languageNames;
  availableLanguages: Language[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const detectBrowserLanguage = (): Language => {
  const browserLang = navigator.language.split('-')[0];
  const langMap: { [key: string]: Language } = {
    ta: 'ta',
    hi: 'hi',
    te: 'te',
    kn: 'kn',
    ml: 'ml',
  };
  return langMap[browserLang] || 'en';
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('preferred-language');
    if (saved && ['en', 'ta', 'hi', 'te', 'kn', 'ml'].includes(saved)) {
      return saved as Language;
    }
    return detectBrowserLanguage();
  });

  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languageNames,
        availableLanguages: ['en', 'ta', 'hi', 'te', 'kn', 'ml'],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
