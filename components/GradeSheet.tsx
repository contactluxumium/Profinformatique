import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { User, ExamResult } from '../types';
import { InfoCircleIcon } from './Icons';

interface GradeSheetProps {
  user: User;
}

const GradeSheet: React.FC<GradeSheetProps> = ({ user }) => {
  const { t } = useLanguage();
  const [results, setResults] = useState<ExamResult[]>([]);
  const [expandedReportId, setExpandedReportId] = useState<string | null>(null);

  useEffect(() => {
    if (user.role === 'student') {
      const allResults: { [studentId: string]: ExamResult[] } = JSON.parse(localStorage.getItem('examResults') || '{}');
      const studentResults = allResults[user.id] || [];
      // Sort by most recent first
      studentResults.sort((a, b) => b.timestamp - a.timestamp);
      setResults(studentResults);
    }
  }, [user]);

  const toggleReport = (resultId: string) => {
    setExpandedReportId(prevId => (prevId === resultId ? null : resultId));
  };
  
  const renderAnswer = (answer: any) => {
    if (answer === null || answer === undefined) return '—';
    if (typeof answer === 'boolean') return answer ? t.unites.true : t.unites.false;
    if (Array.isArray(answer)) return answer.join(', ') || '—';
    if (typeof answer === 'object') return Object.values(answer).join(', ') || '—';
    return String(answer);
  }

  if (results.length === 0) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center text-center p-8">
        <InfoCircleIcon className="mx-auto h-12 w-12 text-sky-400" />
        <h2 className="mt-4 text-xl font-semibold text-slate-800 dark:text-slate-200">{t.gradeSheet.title}</h2>
        <p className="mt-2 text-slate-500 dark:text-slate-400">{t.gradeSheet.noExams}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-fadeInUp">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t.gradeSheet.title}</h1>
      <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-8">{t.gradeSheet.description}</p>
      
      <div className="space-y-4">
        {results.map(result => {
          const resultId = `${result.examId}-${result.timestamp}`;
          const isExpanded = expandedReportId === resultId;
          const totalPointsPossible = result.answers.reduce((acc, ans) => acc + ans.totalPoints, 0);

          return (
            <div key={resultId} className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden transition-all duration-300">
              <div className="p-4 md:p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50" onClick={() => toggleReport(resultId)}>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                  <div>
                    <h2 className="text-lg font-bold text-sky-600 dark:text-sky-400">{result.examTitle}</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {t.gradeSheet.date}: {new Date(result.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <div className="mt-3 sm:mt-0 flex items-center gap-4 text-right">
                    <span className="text-sm font-semibold bg-slate-200 dark:bg-slate-700 px-3 py-1 rounded-full">
                      {t.gradeSheet.attempt} {result.attempt}
                    </span>
                    <p className={`text-xl font-bold ${result.score >= 10 ? 'text-green-500' : 'text-red-500'}`}>
                       {result.score.toFixed(2)} / 20
                    </p>
                     <button className="text-sky-500 font-semibold text-sm transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                        ▼
                    </button>
                  </div>
                </div>
              </div>
              
              {isExpanded && (
                <div className="p-4 md:p-6 border-t border-slate-200 dark:border-slate-700 animate-fadeIn">
                   <div className="overflow-x-auto">
                      <table className="w-full text-sm text-left rtl:text-right text-slate-500 dark:text-slate-400">
                          <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-300">
                              <tr>
                                  <th scope="col" className="px-6 py-3">{t.gradeSheet.question}</th>
                                  <th scope="col" className="px-6 py-3">{t.gradeSheet.yourAnswer}</th>
                                  <th scope="col" className="px-6 py-3">{t.gradeSheet.correctAnswer}</th>
                                  <th scope="col" className="px-6 py-3 text-center">{t.gradeSheet.pointsEarned}</th>
                              </tr>
                          </thead>
                          <tbody>
                              {result.answers.map(answer => (
                                  <tr key={answer.questionId} className={`border-b dark:border-slate-700 ${answer.isCorrect ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                                      <td className="px-6 py-4 font-medium text-slate-800 dark:text-slate-200">{answer.questionText}</td>
                                      <td className={`px-6 py-4 font-semibold ${answer.isCorrect ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>{renderAnswer(answer.userAnswer)}</td>
                                      <td className="px-6 py-4">{renderAnswer(answer.correctAnswer)}</td>
                                      <td className="px-6 py-4 text-center font-mono">{answer.pointsEarned.toFixed(2)} / {answer.totalPoints.toFixed(2)}</td>
                                  </tr>
                              ))}
                          </tbody>
                           <tfoot className="font-bold bg-slate-100 dark:bg-slate-700">
                                <tr>
                                    <td colSpan={3} className="px-6 py-3 text-right">{t.gradeSheet.total}</td>
                                    <td className="px-6 py-3 text-center font-mono">{result.score.toFixed(2)} / {totalPointsPossible.toFixed(2)}</td>
                                </tr>
                            </tfoot>
                      </table>
                   </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GradeSheet;