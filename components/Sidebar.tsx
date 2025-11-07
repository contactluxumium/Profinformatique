import React from 'react';
import { NavigationItem } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { SquaresIcon, ChartBarIcon } from './Icons';

interface SidebarProps {
  activeTab: NavigationItem;
  onSelectTab: (tab: NavigationItem) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab }) => {
  const { t } = useLanguage();

  const navItems = [
    { id: 'unites' as NavigationItem, label: t.sidebar.unites, icon: <SquaresIcon /> },
    { id: 'dashboard' as NavigationItem, label: t.sidebar.dashboard, icon: <ChartBarIcon /> },
  ];

  return (
    <aside className="w-64 bg-white dark:bg-slate-800 h-full flex flex-col border-e border-slate-200 dark:border-slate-700 shadow-lg">
      <div className="p-6 text-2xl font-bold text-sky-600 dark:text-sky-400 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900">
        {t.sidebar.title}
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onSelectTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-lg transition-colors duration-200 
              ${activeTab === item.id 
                ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300' 
                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
              }
              ${ 'rtl' === document.documentElement.dir ? 'justify-start' : '' }
            `}
            aria-current={activeTab === item.id ? 'page' : undefined}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;