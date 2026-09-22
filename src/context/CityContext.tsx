import React, { createContext, useContext, useState, useEffect } from 'react';

export type CityName = 'Hà Nội' | 'TP. Hồ Chí Minh';

interface CityContextType {
  city: CityName;
  setCity: (city: CityName) => void;
}

const STORAGE_KEY = 'fixnear_selected_city';

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [city, setCityState] = useState<CityName>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored === 'Hà Nội' || stored === 'TP. Hồ Chí Minh' ? stored : 'Hà Nội';
    } catch {
      return 'Hà Nội';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, city);
    } catch {
      // ignore write failures (e.g. private browsing)
    }
  }, [city]);

  const setCity = (next: CityName) => setCityState(next);

  return (
    <CityContext.Provider value={{ city, setCity }}>
      {children}
    </CityContext.Provider>
  );
};

export const useCity = (): CityContextType => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
};
