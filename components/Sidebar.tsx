import React from 'react';
import { NavigationItem, User } from '../types';
import { useLanguage } from '../hooks/useLanguage';
import { SquaresIcon, ChartBarIcon, UserCircleIcon, DocumentTextIcon, PuzzleIcon } from './Icons';

interface SidebarProps {
  activeTab: NavigationItem;
  onSelectTab: (tab: NavigationItem) => void;
  areAllTasksCompleted: boolean;
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, onSelectTab, areAllTasksCompleted, user }) => {
  const { t } = useLanguage();

  const navItemsMap: { [key in NavigationItem | string]?: { label: string, icon: React.ReactNode, roles: Array<'student'|'professor'>, condition?: boolean } } = {
    profile: { label: t.sidebar.profile, icon: <UserCircleIcon />, roles: ['student'] },
    unites: { label: t.sidebar.unites, icon: <SquaresIcon />, roles: ['student'] },
    aiTools: { label: t.sidebar.aiTools, icon: <PuzzleIcon />, roles: ['student'], condition: !!user.isPremium },
    gradeSheet: { label: t.sidebar.gradeSheet, icon: <DocumentTextIcon />, roles: ['student'] },
    dashboard: { label: t.sidebar.dashboard, icon: <ChartBarIcon />, roles: ['professor', 'student'], condition: user.role === 'professor' ? true : areAllTasksCompleted },
  };

  // The studentDashboard key is effectively an alias for the dashboard with a specific condition.
  // The map handles the label, icon and roles, we just need to manage the logic of showing it.
  if (user.role === 'student') {
      navItemsMap.dashboard.label = t.sidebar.dashboard;
  }
  
  const studentNavOrder: NavigationItem[] = ['profile', 'unites', 'aiTools', 'gradeSheet', 'dashboard'];
  const profNavOrder: NavigationItem[] = ['dashboard'];

  const orderedNavItems = (user.role === 'student' ? studentNavOrder : profNavOrder).filter(key => {
      const item = navItemsMap[key];
      if (!item) return false;
      if (!item.roles.includes(user.role)) return false;
      if (item.condition === undefined) return true;
      return item.condition;
  });

  return (
    <aside className="w-64 bg-white dark:bg-slate-800 h-full flex flex-col border-e border-slate-200 dark:border-slate-700 shadow-lg">
      <div className="p-6 text-2xl font-bold text-sky-600 dark:text-sky-400 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900">
        {t.sidebar.title}
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {orderedNavItems.map(itemKey => {
          const item = navItemsMap[itemKey]!;
          
          return (
            <button
              key={itemKey}
              onClick={() => onSelectTab(itemKey)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-lg text-lg transition-colors duration-200 
                ${activeTab === itemKey
                  ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300' 
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-700'
                }
                ${ 'rtl' === document.documentElement.dir ? 'justify-start' : '' }
              `}
              aria-current={activeTab === itemKey ? 'page' : undefined}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
       <div className="p-4 border-t border-slate-200 dark:border-slate-700">
        <p className="text-sm text-slate-600 dark:text-slate-300">{t.login.loggedInAs}:</p>
        <p className="font-semibold truncate">{user.role === 'student' ? `${user.firstName} ${user.lastName}` : t.login.profAccount}</p>
      </div>
    </aside>
  );
};

export default Sidebar;