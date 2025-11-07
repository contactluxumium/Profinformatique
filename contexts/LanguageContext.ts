
import React, { createContext } from 'react';
import { Language } from '../types';
import { translations } from '../constants';

interface LanguageContextType {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  t: typeof translations['ar']; // Use one of the translation objects as the type
}

// The default value is a placeholder and will be replaced by the Provider.
export const LanguageContext = createContext<LanguageContextType>({
  language: 'ar',
  setLanguage: () => {},
  t: translations.ar,
});
