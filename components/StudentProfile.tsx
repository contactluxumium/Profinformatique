import React, { useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { User } from '../types';
import { translations } from '../constants';
import { UserCircleIcon, CheckCircleIcon } from './Icons';

interface StudentProfileProps {
  user: User;
  completedSubUnits: Set<string>;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ user, completedSubUnits }) => {
  const { t } = useLanguage();

  const totalSubUnits = useMemo(() => {
    const allUnits = (translations.ar.unites.units || []);
    return allUnits.reduce((acc, unit) => acc + unit.subUnits.length, 0);
  }, []);

  const progressPercentage = totalSubUnits > 0 ? (completedSubUnits.size / totalSubUnits) * 100 : 0;
  
  return (
    <div className="max-w-4xl mx-auto animate-fadeInUp">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <UserCircleIcon className="h-24 w-24 text-sky-500" />
          </div>
          <div className="text-center sm:text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">{user.firstName} {user.lastName}</h1>
            <p className="text-lg text-slate-500 dark:text-slate-400">{t.login.class}: <span className="font-semibold">{user.class}</span></p>
            <p className="text-lg text-slate-500 dark:text-slate-400">{t.login.number}: <span className="font-semibold">{user.number}</span></p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
            <h2 className="text-xl font-bold text-slate-700 dark:text-slate-200 mb-4">{t.profile.progressTitle}</h2>
            <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-6">
                <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">{t.profile.lessonsCompleted}</span>
                    <span className="font-bold text-sky-600 dark:text-sky-400">{completedSubUnits.size} / {totalSubUnits}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-4 dark:bg-slate-600 overflow-hidden">
                    <div className="bg-gradient-to-r from-sky-400 to-blue-500 h-4 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                </div>
                 <p className="text-center mt-3 text-sm text-slate-500 dark:text-slate-400">
                    {progressPercentage.toFixed(0)}% {t.unites.progress}
                 </p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default StudentProfile;
