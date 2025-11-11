import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import AdvancedAssistant from './ai-tools/AdvancedAssistant';

const AITools: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-5xl mx-auto animate-fadeInUp">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t.aiTools.advancedAssistant}</h1>
      <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-6">{t.aiTools.assistantDesc}</p>
      
      <div className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-xl shadow-md">
        <AdvancedAssistant />
      </div>
    </div>
  );
};

export default AITools;
