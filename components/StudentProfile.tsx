import React, { useMemo, useState, useCallback } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { User, Student } from '../types';
import { translations } from '../constants';
import { UserCircleIcon, PencilIcon } from './Icons';
import EditStudentModal from './EditStudentModal';

interface StudentProfileProps {
  user: User;
  completedSubUnits: Set<string>;
  onUpdate: (user: User) => void;
}

const StudentProfile: React.FC<StudentProfileProps> = ({ user, completedSubUnits, onUpdate }) => {
  const { t } = useLanguage();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const totalSubUnits = useMemo(() => {
    const allUnits = (translations.ar.unites.units || []);
    return allUnits.reduce((acc, unit) => acc + unit.subUnits.length, 0);
  }, []);
  
  const fullStudentData = useMemo(() => {
    const allStudents: Student[] = JSON.parse(localStorage.getItem('students') || '[]');
    return allStudents.find(s => s.id === user.id) || null;
  }, [user.id]);

  const progressPercentage = totalSubUnits > 0 ? (completedSubUnits.size / totalSubUnits) * 100 : 0;

  const handleProfileUpdate = useCallback((updatedStudent: Student) => {
    const allStudents: Student[] = JSON.parse(localStorage.getItem('students') || '[]');
    const studentIndex = allStudents.findIndex(s => s.id === updatedStudent.id);
    if (studentIndex > -1) {
        allStudents[studentIndex] = updatedStudent;
        localStorage.setItem('students', JSON.stringify(allStudents));
    }
    
    onUpdate({ ...updatedStudent, role: 'student' });
    
    setIsEditModalOpen(false);
    setSuccessMessage(t.profile.updateSuccess);
    setTimeout(() => setSuccessMessage(''), 3000);
  }, [onUpdate, t.profile.updateSuccess]);
  
  return (
    <div className="max-w-4xl mx-auto animate-fadeInUp">
      {successMessage && (
        <div className="mb-4 p-3 rounded-md bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 text-center font-semibold animate-fadeIn">
          {successMessage}
        </div>
      )}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 md:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <UserCircleIcon className="h-24 w-24 text-sky-500" />
          </div>
          <div className="text-center sm:text-left flex-grow">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">{user.firstName} {user.lastName}</h1>
            <p className="text-lg text-slate-500 dark:text-slate-400">{t.login.class}: <span className="font-semibold">{user.class}</span></p>
            <p className="text-lg text-slate-500 dark:text-slate-400">{t.login.number}: <span className="font-semibold">{user.number}</span></p>
          </div>
           <button 
                onClick={() => setIsEditModalOpen(true)}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
                <PencilIcon className="w-4 h-4" />
                {t.profile.editProfile}
            </button>
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
      {fullStudentData && (
        <EditStudentModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            student={fullStudentData}
            onSave={handleProfileUpdate}
            currentUserRole="student"
        />
      )}
    </div>
  );
};

export default StudentProfile;