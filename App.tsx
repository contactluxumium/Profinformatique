import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import Unites from './components/Lessons';
import Dashboard from './components/Dashboard';
import StudentProfile from './components/StudentProfile';
import LoginPage from './components/LoginPage';
import GradeSheet from './components/GradeSheet';
import { translations } from './constants';
import { Language, NavigationItem, User } from './types';
import { LanguageContext } from './contexts/LanguageContext';
import { MenuIcon, XIcon } from './components/Icons';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('ar');
  const [activeTab, setActiveTab] = useState<NavigationItem>('unites');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [completedSubUnits, setCompletedSubUnits] = useState<Set<string>>(new Set());

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('currentUser');
    if (storedUser) {
      const user: User = JSON.parse(storedUser);
      setCurrentUser(user);
      if (user.role === 'student') {
        const allProgress = JSON.parse(localStorage.getItem('studentProgress') || '{}');
        setCompletedSubUnits(new Set(allProgress[user.id] || []));
        setActiveTab('profile'); 
      } else {
        setActiveTab('dashboard');
      }
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    if (user.role === 'student') {
        const allProgress = JSON.parse(localStorage.getItem('studentProgress') || '{}');
        setCompletedSubUnits(new Set(allProgress[user.id] || []));
        setActiveTab('profile');
    } else {
        setActiveTab('dashboard');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('currentUser');
    setCompletedSubUnits(new Set());
    setActiveTab('unites');
  };

  const t = useMemo(() => translations[language], [language]);

  const handleToggleCompletion = useCallback((subUnitId: string) => {
    if (!currentUser || currentUser.role !== 'student') return;

    const newCompleted = new Set(completedSubUnits);
    if (newCompleted.has(subUnitId)) {
      newCompleted.delete(subUnitId);
    } else {
      newCompleted.add(subUnitId);
    }
    
    setCompletedSubUnits(newCompleted);

    const allProgress = JSON.parse(localStorage.getItem('studentProgress') || '{}');
    allProgress[currentUser.id] = Array.from(newCompleted);
    localStorage.setItem('studentProgress', JSON.stringify(allProgress));
  }, [currentUser, completedSubUnits]);

  const areAllTasksCompleted = useMemo(() => {
    const allUnits = (t.unites.units || []);
    const totalSubUnits = allUnits.reduce((acc: number, unit: any) => acc + unit.subUnits.length, 0);
    if (totalSubUnits === 0) return false;
    return completedSubUnits.size === totalSubUnits;
  }, [completedSubUnits, t.unites.units]);

  useEffect(() => {
    if (currentUser?.role === 'student' && activeTab === 'dashboard' && !areAllTasksCompleted) {
      setActiveTab('unites');
    }
  }, [activeTab, areAllTasksCompleted, currentUser]);


  const renderContent = () => {
    if (!currentUser) return null;

    switch (activeTab) {
      case 'profile':
        return currentUser.role === 'student' ? <StudentProfile user={currentUser} completedSubUnits={completedSubUnits} /> : null;
      case 'unites':
        return <Unites completedSubUnits={completedSubUnits} onToggleCompletion={handleToggleCompletion} user={currentUser} />;
      case 'dashboard':
        return <Dashboard user={currentUser} />;
      case 'gradeSheet':
        return currentUser.role === 'student' ? <GradeSheet user={currentUser} /> : null;
      default:
        return <StudentProfile user={currentUser} completedSubUnits={completedSubUnits} />;
    }
  };

  const handleTabSelect = useCallback((tab: NavigationItem) => {
    setActiveTab(tab);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, []);

  if (!currentUser) {
    return (
       <LanguageContext.Provider value={{ language, setLanguage, t }}>
          <LoginPage onLogin={handleLogin} />
       </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className="flex h-screen bg-slate-100 dark:bg-slate-900 font-sans">
        <div className={`fixed inset-y-0 z-30 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : (language === 'ar' ? 'translate-x-full' : '-translate-x-full')}`}>
          <Sidebar activeTab={activeTab} onSelectTab={handleTabSelect} areAllTasksCompleted={areAllTasksCompleted} user={currentUser} />
        </div>
        
        {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

        <main className="flex-1 flex flex-col overflow-hidden">
          <header className="flex items-center justify-between p-3 md:p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 shadow-sm">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-slate-600 dark:text-slate-300"
              aria-label="Toggle menu"
            >
              {isSidebarOpen ? <XIcon /> : <MenuIcon />}
            </button>
            <div className="flex items-center gap-4">
               <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium rounded-md bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-slate-900 transition-colors"
              >
                {t.login.logout}
              </button>
              <button
                onClick={() => setLanguage(lang => lang === 'ar' ? 'fr' : 'ar')}
                className="px-4 py-2 text-sm font-medium rounded-md bg-sky-500 text-white hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 dark:focus:ring-offset-slate-900 transition-colors"
              >
                {language === 'ar' ? 'Français' : 'العربية'}
              </button>
            </div>
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