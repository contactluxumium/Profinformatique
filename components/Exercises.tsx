import React, { useState, useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';

type SubTab = 'practice' | 'assessment';
type UnitTab = 'unit1' | 'unit2' | 'unit3' | 'unit4';


interface Question {
  id: number;
  type: 'complete' | 'vrai_faux' | 'multiple_choice';
  question: string;
  answer: string | boolean;
  options?: string[];
}

interface AnswersState {
  [key: string]: {
    userAnswer?: string | boolean;
    feedback?: 'correct' | 'incorrect';
  };
}

const Competencies: React.FC = () => {
  const { t } = useLanguage();
  const [activeUnitTab, setActiveUnitTab] = useState<UnitTab>('unit1');
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('practice');
  const [answers, setAnswers] = useState<AnswersState>({});

  const unitTabs = [
    { id: 'unit1', label: t.unites.units[0].title },
    { id: 'unit2', label: t.unites.units[1].title },
    { id: 'unit3', label: t.unites.units[2].title },
    { id: 'unit4', label: t.unites.units[3].title },
  ];

  const handleUnitTabChange = (tab: UnitTab) => {
    setActiveUnitTab(tab);
    setAnswers({}); // Reset answers when switching units
  };

  const handleAnswer = (questionId: number, userAnswer: string | boolean) => {
    const question = t.competencies[activeUnitTab][activeSubTab].questions.find((q: Question) => q.id === questionId);
    if (!question) return;

    const isCorrect = typeof userAnswer === 'string'
      ? userAnswer.trim().toLowerCase() === (question.answer as string).toLowerCase()
      : userAnswer === question.answer;

    setAnswers(prev => ({
      ...prev,
      [`${activeUnitTab}-${activeSubTab}-${questionId}`]: {
        userAnswer,
        feedback: isCorrect ? 'correct' : 'incorrect',
      },
    }));
  };
  
  const renderQuestion = (q: Question) => {
    const questionKey = `${activeUnitTab}-${activeSubTab}-${q.id}`;
    const { userAnswer, feedback } = answers[questionKey] || {};

    const baseClasses = "p-4 rounded-lg shadow-sm mb-4 transition-all duration-300";
    const feedbackClasses = {
      correct: "bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500",
      incorrect: "bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500",
      unanswered: "bg-slate-50 dark:bg-slate-700/50"
    };
    const cardClass = `${baseClasses} ${feedback ? feedbackClasses[feedback] : feedbackClasses.unanswered}`;

    return (
      <div key={q.id} className={cardClass}>
        <p className="font-bold text-slate-800 dark:text-slate-200 mb-3">{q.question}</p>
        <div className="space-y-2">
          {q.type === 'multiple_choice' && q.options?.map(option => {
            const isSelected = userAnswer === option;
            const isCorrect = q.answer === option;
            let buttonClass = "w-full text-start p-2 rounded-md border transition-colors ";
            if (feedback && isSelected) {
              buttonClass += feedback === 'correct' ? 'bg-green-200 border-green-400 dark:bg-green-800/50 dark:border-green-600' : 'bg-red-200 border-red-400 dark:bg-red-800/50 dark:border-red-600';
            } else if (feedback && isCorrect) {
              buttonClass += 'bg-green-200 border-green-400 dark:bg-green-800/50 dark:border-green-600';
            }
             else {
              buttonClass += 'bg-white hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 border-slate-300 dark:border-slate-600';
            }
            
            return (
              <button key={option} onClick={() => handleAnswer(q.id, option)} className={buttonClass} disabled={!!feedback}>
                {option}
              </button>
            );
          })}

          {q.type === 'complete' && (
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm bg-white dark:bg-slate-700"
              onBlur={(e) => handleAnswer(q.id, e.target.value)}
              disabled={!!feedback}
              placeholder={t.competencies.answer}
            />
          )}

          {q.type === 'vrai_faux' && (
            <div className="flex gap-4">
              {[true, false].map(value => {
                const isSelected = userAnswer === value;
                const isCorrect = q.answer === value;
                let buttonClass = "w-1/2 p-2 rounded-md border font-semibold transition-colors ";
                 if (feedback && isSelected) {
                  buttonClass += feedback === 'correct' ? 'bg-green-200 border-green-400 dark:bg-green-800/50 dark:border-green-600' : 'bg-red-200 border-red-400 dark:bg-red-800/50 dark:border-red-600';
                } else if (feedback && isCorrect) {
                  buttonClass += 'bg-green-200 border-green-400 dark:bg-green-800/50 dark:border-green-600';
                } else {
                  buttonClass += 'bg-white hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 border-slate-300 dark:border-slate-600';
                }
                return (
                   <button key={String(value)} onClick={() => handleAnswer(q.id, value)} className={buttonClass} disabled={!!feedback}>
                    {value ? t.competencies.true : t.competencies.false}
                  </button>
                )
              })}
            </div>
          )}
        </div>
        {feedback === 'correct' && <p className="text-green-600 dark:text-green-400 font-semibold mt-2 text-sm">{t.competencies.correct}</p>}
        {feedback === 'incorrect' && <p className="text-red-600 dark:text-red-400 font-semibold mt-2 text-sm">{t.competencies.incorrect} {t.competencies.answer}: {typeof q.answer === 'boolean' ? (q.answer ? t.competencies.true : t.competencies.false) : q.answer}</p>}
      </div>
    );
  };
  
  const questions: Question[] = useMemo(() => {
    return t.competencies[activeUnitTab]?.[activeSubTab]?.questions || [];
  }, [t, activeUnitTab, activeSubTab]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t.competencies.title}</h1>
      <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">{t.competencies.description}</p>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-2 border-b-2 border-slate-200 dark:border-slate-700">
          {unitTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleUnitTabChange(tab.id as UnitTab)}
              className={`px-4 py-2 text-sm font-semibold transition-colors ${
                activeUnitTab === tab.id
                  ? 'border-b-2 border-sky-500 text-sky-600 dark:text-sky-400'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {tab.label.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-center bg-slate-200 dark:bg-slate-800 rounded-lg p-1 mb-8 sticky top-2 z-10">
        <button
          onClick={() => { setActiveSubTab('practice'); setAnswers({}); }}
          className={`w-1/2 py-2.5 text-center font-bold rounded-md transition-all duration-300 ${activeSubTab === 'practice' ? 'bg-white dark:bg-slate-700 shadow' : 'text-slate-500 dark:text-slate-400'}`}
        >
          {t.competencies.practice.title}
        </button>
        <button
          onClick={() => { setActiveSubTab('assessment'); setAnswers({}); }}
          className={`w-1/2 py-2.5 text-center font-bold rounded-md transition-all duration-300 ${activeSubTab === 'assessment' ? 'bg-white dark:bg-slate-700 shadow' : 'text-slate-500 dark:text-slate-400'}`}
        >
          {t.competencies.assessment.title}
        </button>
      </div>

      <div>
        {questions.length > 0 ? (
          questions.map(q => renderQuestion(q))
        ) : (
          <p className="text-center text-slate-500 dark:text-slate-400">{t.common.loading}</p>
        )}
      </div>
    </div>
  );
};

export default Competencies;