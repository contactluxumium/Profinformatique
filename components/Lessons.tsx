import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import Modal from './Modal';
import { Unit, Exam, User } from '../types';
import { LockIcon } from './Icons';
import ExamModal from './ExamModal';

interface UnitesProps {
  completedSubUnits: Set<string>;
  onToggleCompletion: (subUnitId: string) => void;
  user: User;
}

const Unites: React.FC<UnitesProps> = ({ completedSubUnits, onToggleCompletion, user }) => {
  const { t } = useLanguage();
  const [view, setView] = useState<'lessons' | 'exams'>('lessons');
  const [currentUnitIndex, setCurrentUnitIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [isExamModalOpen, setIsExamModalOpen] = useState(false);

  const units = t.unites.units as Unit[];
  const exams = t.exams.examsList as Exam[];
  const selectedUnit = currentUnitIndex !== null ? units[currentUnitIndex] : null;

  const handleOpenModal = (index: number) => {
    const isLocked = index > 0 && !units[index - 1].subUnits.every(su => completedSubUnits.has(su.id));
    if (isLocked) return;
    
    setCurrentUnitIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentUnitIndex(null);
  };
  
  const handleOpenExamModal = (exam: Exam) => {
    setActiveExam(exam);
    setIsExamModalOpen(true);
  };

  const handleCloseExamModal = () => {
    setIsExamModalOpen(false);
    setActiveExam(null);
  };

  const handleNextUnit = () => {
    if (currentUnitIndex !== null && currentUnitIndex < units.length - 1) {
       const nextIndex = currentUnitIndex + 1;
       const isNextLocked = nextIndex > 0 && !units[nextIndex - 1].subUnits.every(su => completedSubUnits.has(su.id));
       if (!isNextLocked) {
         setCurrentUnitIndex(nextIndex);
       }
    }
  };

  const handlePreviousUnit = () => {
    if (currentUnitIndex !== null && currentUnitIndex > 0) {
      setCurrentUnitIndex(currentUnitIndex - 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-fadeInUp h-full flex flex-col">
      <div className="flex justify-center bg-slate-200 dark:bg-slate-800 rounded-lg p-1 mb-8 sticky top-2 z-10 flex-shrink-0">
        <button
          onClick={() => setView('lessons')}
          className={`w-1/2 py-2.5 text-center font-bold rounded-md transition-all duration-300 ${view === 'lessons' ? 'bg-white dark:bg-slate-700 shadow' : 'text-slate-500 dark:text-slate-400'}`}
        >
          {t.unites.title}
        </button>
        <button
          onClick={() => setView('exams')}
          className={`w-1/2 py-2.5 text-center font-bold rounded-md transition-all duration-300 ${view === 'exams' ? 'bg-white dark:bg-slate-700 shadow' : 'text-slate-500 dark:text-slate-400'}`}
        >
          {t.exams.title}
        </button>
      </div>

      {view === 'lessons' && (
        <>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2 flex-shrink-0">{t.unites.title}</h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-6 md:mb-8 flex-shrink-0">{t.unites.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {units.map((unit, index) => {
              const totalCount = unit.subUnits.length;
              const completedCount = unit.subUnits.filter(su => completedSubUnits.has(su.id)).length;
              const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
              const isLocked = index > 0 && !units[index - 1].subUnits.every(su => completedSubUnits.has(su.id));

              return (
                <div
                  key={unit.id}
                  onClick={() => handleOpenModal(index)}
                  className={`group relative bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden transform transition-all duration-300 flex flex-col ${isLocked ? 'cursor-not-allowed' : 'cursor-pointer hover:-translate-y-1'}`}
                  aria-disabled={isLocked}
                >
                  {isLocked && (
                    <div className="absolute inset-0 bg-slate-500/30 dark:bg-slate-800/50 backdrop-blur-sm flex flex-col justify-center items-center z-10 rounded-xl">
                        <LockIcon />
                        <span className="mt-2 text-sm font-semibold text-white dark:text-slate-200">{t.unites.unitLocked}</span>
                    </div>
                  )}
                  <div className="p-6 flex-grow">
                    <h2 className="text-xl font-bold text-sky-600 dark:text-sky-400 mb-2">{unit.title}</h2>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">{unit.description}</p>
                    <span className="font-semibold text-sky-500 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">
                      {t.unites.readMore} &rarr;
                    </span>
                  </div>
                  <div className="p-6 pt-0">
                      <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{t.unites.progress}</span>
                          <span className="text-sm font-medium text-sky-600 dark:text-sky-400">{completedCount} / {totalCount}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5 dark:bg-slate-700">
                          <div className="bg-sky-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                      </div>
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {view === 'exams' && (
        <>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t.exams.title}</h1>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-6 md:mb-8">{t.exams.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {exams.map((exam) => (
              <div
                key={exam.id}
                onClick={() => handleOpenExamModal(exam)}
                className="group bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold text-sky-600 dark:text-sky-400 mb-2">{exam.title}</h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">{exam.description}</p>
                  <span className="font-semibold text-sky-500 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">
                    {t.exams.takeExam} &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      
      {selectedUnit && (
        <Modal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          unit={selectedUnit}
          onNext={handleNextUnit}
          onPrevious={handlePreviousUnit}
          hasNext={currentUnitIndex !== null && currentUnitIndex < units.length - 1}
          hasPrevious={currentUnitIndex !== null && currentUnitIndex > 0}
          completedSubUnits={completedSubUnits}
          onToggleCompletion={onToggleCompletion}
        />
      )}

      {activeExam && (
        <ExamModal
          isOpen={isExamModalOpen}
          onClose={handleCloseExamModal}
          exam={activeExam}
          user={user}
        />
      )}
    </div>
  );
};

export default Unites;