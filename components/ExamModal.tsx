import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Exam, Question, User, ExamResult, AnswerDetail } from '../types';
import { isEqual } from 'lodash';

type AnswersState = { [key: number]: any };

const QuestionReview: React.FC<{ q: Question; userAnswer: any, t: any }> = ({ q, userAnswer, t }) => {
  let isCorrect = false;
  if (q.type === 'multiple_choice_multiple') {
      isCorrect = Array.isArray(q.answer) && Array.isArray(userAnswer) && 
                  q.answer.length === userAnswer.length &&
                  [...q.answer].sort().join(',') === [...userAnswer].sort().join(',');
  } else {
    isCorrect = isEqual(q.answer, userAnswer);
  }

  const baseClasses = "p-4 rounded-lg shadow-sm mb-4 border-l-4";
  const feedbackClasses = isCorrect
    ? "bg-green-50 dark:bg-green-900/30 border-green-500"
    : "bg-red-50 dark:bg-red-900/30 border-red-500";
  
  const renderAnswer = (answer: any) => {
    if (typeof answer === 'boolean') {
      return answer ? t.unites.true : t.unites.false;
    }
    if (Array.isArray(answer)) {
      return answer.join(', ');
    }
    if(typeof answer === 'object' && answer !== null) {
        return Object.values(answer).join(', '); // Simplified for display
    }
    return answer;
  }
  
  return (
    <div className={`${baseClasses} ${feedbackClasses}`}>
      <p className="font-bold text-slate-800 dark:text-slate-200 mb-3">{q.question}</p>
      <div className="text-sm space-y-2">
        <p><span className="font-semibold">{t.exams.yourAnswer}:</span> <span className={isCorrect ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}>{renderAnswer(userAnswer) || '—'}</span></p>
        {!isCorrect && <p><span className="font-semibold">{t.exams.correctAnswer}:</span> {renderAnswer(q.answer)}</p>}
        {q.explanation && (
          <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-600">
            <p className="text-slate-600 dark:text-slate-400">{q.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};


const ExamModal: React.FC<{ isOpen: boolean; onClose: () => void; exam: Exam | null; user: User }> = ({ isOpen, onClose, exam, user }) => {
  const { t } = useLanguage();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswersState>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [timeTaken, setTimeTaken] = useState(0);
  const timerRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };
  
  const handleSubmit = useCallback(() => {
    if (isSubmitted || !exam || user.role !== 'student') return;
    
    clearTimer();

    let correctAnswersCount = 0;
    const pointsPerQuestion = exam.questions.length > 0 ? 20 / exam.questions.length : 0;
    const answerDetails: AnswerDetail[] = [];

    exam.questions.forEach(q => {
      const userAnswer = answers[q.id];
      let isCorrect = false;
      if (q.type === 'multiple_choice_multiple') {
        isCorrect = Array.isArray(q.answer) && Array.isArray(userAnswer) && 
                    q.answer.length === userAnswer.length &&
                    [...q.answer].sort().join(',') === [...userAnswer].sort().join(',');
      } else {
        isCorrect = isEqual(q.answer, userAnswer);
      }

      if (isCorrect) {
        correctAnswersCount++;
      }
      
      answerDetails.push({
        questionId: q.id,
        questionText: q.question,
        userAnswer: userAnswer || null,
        correctAnswer: q.answer,
        isCorrect,
        pointsEarned: isCorrect ? pointsPerQuestion : 0,
        totalPoints: pointsPerQuestion,
      });
    });

    const finalScore = correctAnswersCount * pointsPerQuestion;
    setScore(finalScore);
    
    // Save results to localStorage
    const allResults: { [studentId: string]: ExamResult[] } = JSON.parse(localStorage.getItem('examResults') || '{}');
    const studentResults = allResults[user.id] || [];
    const attempt = studentResults.filter(r => r.examId === exam.id).length + 1;

    const newResult: ExamResult = {
      examId: exam.id,
      examTitle: exam.title,
      score: finalScore,
      timestamp: Date.now(),
      attempt,
      duration: timeTaken,
      answers: answerDetails
    };

    studentResults.push(newResult);
    allResults[user.id] = studentResults;
    localStorage.setItem('examResults', JSON.stringify(allResults));
    
    setIsSubmitted(true);
  }, [exam, answers, user.id, user.role, isSubmitted, timeTaken]);


  useEffect(() => {
    if (isOpen) {
      setCurrentQuestionIndex(0);
      setAnswers({});
      setIsSubmitted(false);
      setScore(0);
      setTimeLeft(20 * 60);
      setTimeTaken(0);
    } else {
      clearTimer();
    }
  }, [isOpen, exam]);

  useEffect(() => {
    if (isOpen && !isSubmitted) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearTimer();
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
        setTimeTaken(prev => prev + 1);
      }, 1000);
    }
    return () => clearTimer();
  }, [isOpen, isSubmitted, handleSubmit]);
  
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen || !exam) return null;

  const currentQuestion = exam.questions[currentQuestionIndex];
  const totalQuestions = exam.questions.length;

  const handleAnswerSelect = (questionId: number, selectedAnswer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: selectedAnswer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const renderQuestionOptions = (q: Question) => {
    const userAnswer = answers[q.id];
    
    switch (q.type) {
      case 'vrai_faux':
        return (
          <div className="flex flex-col sm:flex-row gap-4">
            {[true, false].map(value => (
              <button
                key={String(value)}
                onClick={() => handleAnswerSelect(q.id, value)}
                className={`w-full p-3 rounded-md border font-semibold transition-colors ${userAnswer === value ? 'bg-sky-100 dark:bg-sky-900/50 border-sky-500' : 'bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600'}`}
              >
                {value ? t.unites.true : t.unites.false}
              </button>
            ))}
          </div>
        );
      case 'multiple_choice':
      case 'situation_problem':
        return (
          <div className="space-y-3">
            {q.options?.map(option => (
              <button
                key={option}
                onClick={() => handleAnswerSelect(q.id, option)}
                className={`w-full text-start p-3 rounded-md border transition-colors ${userAnswer === option ? 'bg-sky-100 dark:bg-sky-900/50 border-sky-500' : 'bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600'}`}
              >
                {option}
              </button>
            ))}
          </div>
        );
      case 'multiple_choice_multiple':
         const currentAnswers = (userAnswer || []) as string[];
         const handleMultiChange = (option: string) => {
            const newAnswers = currentAnswers.includes(option)
              ? currentAnswers.filter(item => item !== option)
              : [...currentAnswers, option];
            handleAnswerSelect(q.id, newAnswers);
          };
        return (
             <div className="space-y-3">
              {q.options?.map(option => (
                <label key={option} className={`flex items-center p-3 rounded-md border cursor-pointer transition-colors ${currentAnswers.includes(option) ? 'bg-sky-100 dark:bg-sky-900/50 border-sky-400' : 'bg-white dark:bg-slate-700 border-slate-300 dark:border-slate-600'}`}>
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-sky-600 rounded" checked={currentAnswers.includes(option)} onChange={() => handleMultiChange(option)} />
                  <span className="ms-3">{option}</span>
                </label>
              ))}
            </div>
        );
      default:
        return null;
    }
  };

  const formattedTime = `${Math.floor(timeLeft / 60)}:${('0' + (timeLeft % 60)).slice(-2)}`;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-start p-4 sm:p-8 overflow-y-auto animate-fadeIn" onClick={onClose} aria-modal="true" role="dialog">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-full sm:max-w-3xl max-h-[95vh] sm:max-h-[90vh] flex flex-col animate-scaleIn" onClick={e => e.stopPropagation()}>
        <header className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-slate-100">{exam.title}</h2>
            {!isSubmitted && (
                <span className={`text-base font-mono font-semibold px-3 py-1 rounded-md ${timeLeft < 300 ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' : 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'}`}>
                    {t.exams.timeLeft}: {formattedTime}
                </span>
            )}
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </header>

        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center">
              <h3 className="text-2xl font-bold">{t.exams.score}</h3>
              <p className={`text-5xl font-bold my-4 ${score >= 10 ? 'text-green-500' : 'text-red-500'}`}>{score.toFixed(2)} / 20</p>
              <h4 className="text-xl font-bold mt-8 mb-4 border-t pt-6">{t.exams.reviewAnswers}</h4>
              <div className="text-left">
                {exam.questions.map(q => <QuestionReview key={q.id} q={q} userAnswer={answers[q.id]} t={t} />)}
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-slate-600 dark:text-slate-300">
                  {t.exams.questionProgress.replace('{current}', String(currentQuestionIndex + 1)).replace('{total}', String(totalQuestions))}
                </span>
                <div className="w-1/2 bg-slate-200 rounded-full h-2.5 dark:bg-slate-700">
                  <div className="bg-sky-500 h-2.5 rounded-full" style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}></div>
                </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-lg">
                <p className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">{currentQuestion.question}</p>
                {renderQuestionOptions(currentQuestion)}
              </div>
            </div>
          )}
        </div>

        {!isSubmitted && (
          <footer className="flex justify-between p-4 border-t border-slate-200 dark:border-slate-700">
            <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="px-4 py-2 text-sm font-medium rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-50 transition-colors">
              &larr; {t.unites.previousUnit}
            </button>
            {currentQuestionIndex < totalQuestions - 1 ? (
              <button onClick={handleNext} className="px-4 py-2 text-sm font-medium rounded-md bg-sky-500 text-white hover:bg-sky-600 transition-colors">
                {t.unites.nextUnit} &rarr;
              </button>
            ) : (
              <button onClick={handleSubmit} className="px-4 py-2 text-sm font-medium rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors">
                {t.exams.submitExam}
              </button>
            )}
          </footer>
        )}
      </div>
    </div>
  );
};

export default ExamModal;