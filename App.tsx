import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Unites from './components/Lessons';
import Dashboard from './components/Dashboard';
import { translations } from './constants';
import { Language, NavigationItem } from './types';
import { LanguageContext } from './contexts/LanguageContext';
import { MenuIcon, XIcon } from './components/Icons';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ar');
  const [activeTab, setActiveTab] = useState<NavigationItem>('unites');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = useMemo(() => translations[language], [language]);

  const renderContent = () => {
    switch (activeTab) {
      case 'unites':
        return <Unites />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return <Unites />;
    }
  };

  const handleTabSelect = useCallback((tab: NavigationItem) => {
    setActiveTab(tab);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className="flex h-screen bg-slate-100 dark:bg-slate-900 font-sans">
        <div className={`fixed inset-y-0 z-30 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : (language === 'ar' ? 'translate-x-full' : '-translate-x-full')}`}>
          <Sidebar activeTab={activeTab} onSelectTab={handleTabSelect} />
        </div>
        
        {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="flex items-center justify-between md:justify-end p-3 md:p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-slate-600 dark:text-slate-300"
              aria-label="Toggle menu"
            >
              {isSidebarOpen ? <XIcon /> : <MenuIcon />}
            </button>
            <button
              onClick={() => setLanguage(lang => lang === 'ar' ? 'fr' : 'ar')}
              className="px-4 py-2 text-sm font-medium rounded-md bg-sky-500 text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-900 transition-colors"
            >
              {language === 'ar' ? 'Français' : 'العربية'}
            </button>
          </header>
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </LanguageContext.Provider>
  );
};

export default App;