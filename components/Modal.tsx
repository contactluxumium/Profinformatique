import React, { useEffect, useState, useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Unit, Question, SubUnit } from '../types';
import { LockIcon } from './Icons';
import { isEqual } from 'lodash';


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  unit: Unit | null;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
  completedSubUnits: Set<string>;
  onToggleCompletion: (subUnitId: string) => void;
}

interface AnswersState {
  [questionId: string]: {
    userAnswer?: any; // Can be string, boolean, string[], or object
    feedback?: 'correct' | 'incorrect';
  };
}

const QuestionRenderer: React.FC<{ q: Question; onAnswer: (id: number, answer: any) => void; state: AnswersState[string] }> = ({ q, onAnswer, state = {} }) => {
  const { t } = useLanguage();
  const { userAnswer, feedback } = state;
  const [multiChoiceAnswers, setMultiChoiceAnswers] = useState<string[]>([]);
  const [dragPlacements, setDragPlacements] = useState<{ [key: string]: string | null }>({});

  const isAnswered = !!feedback;

  const baseClasses = "p-4 rounded-lg shadow-sm mb-4 transition-all duration-300";
  const feedbackClasses = {
    correct: "bg-green-50 dark:bg-green-900/30 border-l-4 border-green-500",
    incorrect: "bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500",
    unanswered: "bg-white dark:bg-slate-700/50"
  };
  const cardClass = `${baseClasses} ${feedback ? feedbackClasses[feedback] : feedbackClasses.unanswered}`;
  
  const handleMultiChoiceChange = (option: string) => {
    setMultiChoiceAnswers(prev => 
      prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]
    );
  };
  
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, draggableId: string) => {
    e.dataTransfer.setData("text/plain", draggableId);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, droppableId: string) => {
    e.preventDefault();
    const draggableId = e.dataTransfer.getData("text/plain");
    setDragPlacements(prev => ({ ...prev, [droppableId]: draggableId }));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };


  return (
    <div className={cardClass}>
      <p className="font-bold text-slate-800 dark:text-slate-200 mb-3">{q.question}</p>
      <div className="space-y-2">
        {/* Single Choice */}
        {q.type === 'multiple_choice' && q.options?.map(option => {
          const isSelected = userAnswer === option;
          const isCorrect = q.answer === option;
          let buttonClass = "w-full text-start p-2 rounded-md border transition-colors ";
          if (isAnswered && isSelected) {
            buttonClass += feedback === 'correct' ? 'bg-green-200 border-green-400 dark:bg-green-800/50 dark:border-green-600' : 'bg-red-200 border-red-400 dark:bg-red-800/50 dark:border-red-600';
          } else if (isAnswered && isCorrect) {
            buttonClass += 'bg-green-200 border-green-400 dark:bg-green-800/50 dark:border-green-600';
          } else {
            buttonClass += 'bg-white hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 border-slate-300 dark:border-slate-600';
          }
          return (
            <button key={option} onClick={() => onAnswer(q.id, option)} className={buttonClass} disabled={isAnswered}>
              {option}
            </button>
          );
        })}
        
        {/* Multiple Correct Choice */}
        {q.type === 'multiple_choice_multiple' && (
          <>
            <div className="space-y-2">
              {q.options?.map(option => (
                <label key={option} className={`flex items-center p-2 rounded-md border cursor-pointer transition-colors ${multiChoiceAnswers.includes(option) ? 'bg-sky-100 dark:bg-sky-900/50 border-sky-400' : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600'}`}>
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-sky-600 rounded" checked={multiChoiceAnswers.includes(option)} onChange={() => handleMultiChoiceChange(option)} disabled={isAnswered} />
                  <span className="ms-3">{option}</span>
                </label>
              ))}
            </div>
            {!isAnswered && <button onClick={() => onAnswer(q.id, multiChoiceAnswers)} className="mt-4 px-4 py-2 text-sm font-medium rounded-md bg-sky-500 text-white hover:bg-sky-600">{t.unites.submitAnswer}</button>}
          </>
        )}

        {/* Drag and Drop */}
        {q.type === 'drag_drop' && q.dragOptions && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className='space-y-2'>
                {q.dragOptions.droppables.map(droppable => (
                  <div key={droppable.id} onDrop={(e) => handleDrop(e, droppable.id)} onDragOver={handleDragOver} className="flex items-center gap-2 p-2 h-12 rounded-md bg-slate-200 dark:bg-slate-600 border border-dashed">
                    <span className='font-semibold'>{droppable.label}</span>
                    {dragPlacements[droppable.id] && (
                       <div className="p-1 px-2 text-sm bg-white dark:bg-slate-700 rounded-md shadow cursor-grab">{q.dragOptions.draggables.find(d => d.id === dragPlacements[droppable.id])?.label}</div>
                    )}
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                 {q.dragOptions.draggables.filter(d => !Object.values(dragPlacements).includes(d.id)).map(draggable => (
                    <div key={draggable.id} draggable onDragStart={(e) => handleDragStart(e, draggable.id)} className="p-2 h-12 flex items-center justify-center bg-white dark:bg-slate-700 rounded-md shadow cursor-grab">
                      {draggable.label}
                    </div>
                 ))}
              </div>
            </div>
             {!isAnswered && <button onClick={() => onAnswer(q.id, dragPlacements)} className="mt-4 px-4 py-2 text-sm font-medium rounded-md bg-sky-500 text-white hover:bg-sky-600">{t.unites.submitAnswer}</button>}
          </>
        )}
        
        {q.type === 'vrai_faux' && (
          <div className="flex gap-4">
            {[true, false].map(value => {
              const isSelected = userAnswer === value;
              const isCorrect = q.answer === value;
              let buttonClass = "w-1/2 p-2 rounded-md border font-semibold transition-colors ";
              if (isAnswered && isSelected) {
                buttonClass += feedback === 'correct' ? 'bg-green-200 border-green-400 dark:bg-green-800/50 dark:border-green-600' : 'bg-red-200 border-red-400 dark:bg-red-800/50 dark:border-red-600';
              } else if (isAnswered && isCorrect) {
                buttonClass += 'bg-green-200 border-green-400 dark:bg-green-800/50 dark:border-green-600';
              } else {
                buttonClass += 'bg-white hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 border-slate-300 dark:border-slate-600';
              }
              return (
                 <button key={String(value)} onClick={() => onAnswer(q.id, value)} className={buttonClass} disabled={isAnswered}>
                  {value ? t.unites.true : t.unites.false}
                </button>
              )
            })}
          </div>
        )}
      </div>
      {feedback === 'correct' && <p className="text-green-600 dark:text-green-400 font-semibold mt-2 text-sm">{t.unites.correct}</p>}
      {feedback === 'incorrect' && <p className="text-red-600 dark:text-red-400 font-semibold mt-2 text-sm">{t.unites.incorrect}</p>}
      {isAnswered && q.explanation && (
        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
          <p className="text-sm text-slate-600 dark:text-slate-400">{q.explanation}</p>
        </div>
      )}
    </div>
  );
};


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, unit, onNext, onPrevious, hasNext, hasPrevious, completedSubUnits, onToggleCompletion }) => {
  const { t } = useLanguage();
  const [answers, setAnswers] = useState<AnswersState>({});
  const [activeQuizSubUnitId, setActiveQuizSubUnitId] = useState<string | null>(null);
  const [currentQuizQuestions, setCurrentQuizQuestions] = useState<Question[]>([]);

  useEffect(() => {
    setAnswers({});
    setActiveQuizSubUnitId(null);
    setCurrentQuizQuestions([]);
  }, [isOpen, unit]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);
  
  const firstUncompletedIndex = useMemo(() => 
    unit?.subUnits.findIndex(su => !completedSubUnits.has(su.id)) ?? -1,
  [unit, completedSubUnits]);

  if (!isOpen || !unit) return null;

  const handleAnswer = (subUnitId: string, questions: Question[], questionId: number, userAnswer: any) => {
    const question = questions.find(q => q.id === questionId);
    if (!question) return;
  
    let isCorrect = false;
    switch(question.type) {
      case 'multiple_choice_multiple':
        isCorrect = Array.isArray(question.answer) && Array.isArray(userAnswer) && 
                    question.answer.length === userAnswer.length &&
                    [...question.answer].sort().join(',') === [...userAnswer].sort().join(',');
        break;
      case 'drag_drop':
        isCorrect = isEqual(question.answer, userAnswer);
        break;
      default:
        isCorrect = userAnswer === question.answer;
    }
    
    const newAnswers: AnswersState = {
      ...answers,
      [`${question.id}`]: { userAnswer, feedback: isCorrect ? 'correct' : 'incorrect' }
    };
    setAnswers(newAnswers);

    // Check for completion after state update
    const allCorrect = questions.every(q => {
      const answerState = newAnswers[`${q.id}`];
      return answerState?.feedback === 'correct';
    });

    if (allCorrect) {
      onToggleCompletion(subUnitId);
    }
  };

  const handleTakeQuizClick = (subUnit: SubUnit) => {
    setAnswers({});
    setActiveQuizSubUnitId(subUnit.id);
    
    const questionBank = subUnit.questions || [];
    if (questionBank.length > 0) {
      const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      setCurrentQuizQuestions(selected);
    } else {
      setCurrentQuizQuestions([]);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex justify-center items-start p-4 sm:p-8 overflow-y-auto animate-fadeIn" 
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-full sm:max-w-3xl max-h-[95vh] sm:max-h-[90vh] flex flex-col animate-scaleIn"
        onClick={e => e.stopPropagation()}
      >
        <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100">{unit.title}</h2>
          <button 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>
        <div className="p-4 md:p-6 overflow-y-auto space-y-4">
          {unit.subUnits.map((subUnit, index) => {
            const isCompleted = completedSubUnits.has(subUnit.id);
            const isLocked = firstUncompletedIndex !== -1 && index > firstUncompletedIndex;
            const isQuizVisible = activeQuizSubUnitId === subUnit.id;
            
            if (isLocked) {
              return (
                <div key={subUnit.id} className="p-4 rounded-lg bg-slate-100 dark:bg-slate-900 opacity-60">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-500 dark:text-slate-400">{subUnit.title}</h3>
                    <LockIcon />
                  </div>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{t.unites.completePrevious}</p>
                </div>
              );
            }

            return (
              <div key={subUnit.id} className={`p-4 rounded-lg transition-colors duration-300 ${isCompleted ? 'bg-green-50 dark:bg-green-900/30' : 'bg-slate-50 dark:bg-slate-700/50'}`}>
                <h3 className="text-lg font-semibold text-sky-600 dark:text-sky-400 mb-2">{subUnit.title}</h3>
                <div className="text-slate-600 dark:text-slate-300 leading-relaxed prose prose-slate dark:prose-invert max-w-none">
                  {subUnit.content}
                </div>
                
                {!isCompleted && !isQuizVisible && (subUnit.questions && subUnit.questions.length > 0) && (
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600 text-center">
                    <button
                      onClick={() => handleTakeQuizClick(subUnit)}
                      className="px-6 py-2 text-sm font-semibold rounded-md bg-sky-500 text-white hover:bg-sky-600 transition-colors shadow-sm"
                    >
                      {t.unites.takeQuiz}
                    </button>
                  </div>
                )}
                
                {isQuizVisible && (
                  <div className="mt-6 border-t pt-4 border-slate-200 dark:border-slate-600">
                    <h4 className="text-md font-bold text-slate-700 dark:text-slate-200 mb-4">{t.unites.quizTitle}</h4>
                    
                    {currentQuizQuestions.length > 0 && currentQuizQuestions.map(q => (
                      <QuestionRenderer
                        key={q.id}
                        q={q}
                        onAnswer={(id, ans) => handleAnswer(subUnit.id, currentQuizQuestions, id, ans)}
                        state={answers[q.id]}
                      />
                    ))}

                    {!isCompleted && Object.keys(answers).length > 0 && (
                       <div className="mt-4 text-center">
                        <button
                          onClick={() => handleTakeQuizClick(subUnit)}
                          className="px-6 py-2 text-sm font-semibold rounded-md bg-amber-500 text-white hover:bg-amber-600 transition-colors shadow-sm"
                        >
                          {t.unites.retryQuiz}
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {isCompleted && (
                  <div className="mt-4 p-3 text-center bg-green-100 dark:bg-green-800/50 text-green-700 dark:text-green-300 rounded-md font-semibold">
                    {t.unites.allCorrect}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {(onPrevious || onNext) && (
          <footer className="flex justify-between p-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={onPrevious}
              disabled={!hasPrevious}
              className="px-4 py-2 text-sm font-medium rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              &larr; {t.unites.previousUnit}
            </button>
            <button
              onClick={onNext}
              disabled={!hasNext || (hasNext && !unit.subUnits.every(su => completedSubUnits.has(su.id)))}
              className="px-4 py-2 text-sm font-medium rounded-md bg-sky-500 text-white hover:bg-sky-600 disabled:bg-slate-400 dark:disabled:bg-slate-600 transition-colors"
            >
              {t.unites.nextUnit} &rarr;
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

export default Modal;