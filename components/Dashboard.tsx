import React, { useState, useMemo, useCallback } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { InfoCircleIcon, PencilIcon, TrashIcon, StarIcon } from './Icons';
import { Student, User, ExamResult, Exam } from '../types';
import EditStudentModal from './EditStudentModal';
import StudentProfile from './StudentProfile';
import GradeSheet from './GradeSheet';

interface DashboardProps {
  user: User;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const classOptions = Array.from({ length: 8 }, (_, i) => `2APIC-${i + 1}`);

// A self-contained view for showing a single student's details
const StudentDetailsView: React.FC<{ studentId: string; onBack: () => void }> = ({ studentId, onBack }) => {
    const { t } = useLanguage();

    const student = useMemo(() => {
        const allStudents: Student[] = JSON.parse(localStorage.getItem('students') || '[]');
        return allStudents.find(s => s.id === studentId);
    }, [studentId]);

    const completedSubUnits = useMemo(() => {
        const allProgress = JSON.parse(localStorage.getItem('studentProgress') || '{}');
        return new Set<string>(allProgress[studentId] || []);
    }, [studentId]);

    if (!student) {
        return <div className="text-center p-8">Student not found.</div>;
    }
    
    const userForProfile: User = { ...student, role: 'student' };

    return (
        <div>
            <button onClick={onBack} className="mb-6 px-4 py-2 text-sm font-medium rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors">
                &larr; {t.dashboard.backToList}
            </button>
            <div className="space-y-8">
               <StudentProfile user={userForProfile} completedSubUnits={completedSubUnits} />
               <GradeSheet user={userForProfile} />
            </div>
        </div>
    );
};

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const { t, language } = useLanguage();
  const [students, setStudents] = useState<Student[]>(() => 
    JSON.parse(localStorage.getItem('students') || '[]')
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [view, setView] = useState<'list' | 'details'>('list');
  const [viewingStudentId, setViewingStudentId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [activeRankingExamId, setActiveRankingExamId] = useState<string | null>(null);
  
  const allExams = t.exams.examsList as Exam[];

  const refreshStudents = useCallback(() => {
    setStudents(JSON.parse(localStorage.getItem('students') || '[]'));
  }, []);

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setIsEditModalOpen(true);
  };

  const handleViewDetails = (studentId: string) => {
      setViewingStudentId(studentId);
      setView('details');
  }
  
  const handleDelete = (studentId: string) => {
    if (window.confirm(t.dashboard.confirmDelete)) {
      const updatedStudents = students.filter(s => s.id !== studentId);
      localStorage.setItem('students', JSON.stringify(updatedStudents));
      
      const allProgress = JSON.parse(localStorage.getItem('studentProgress') || '{}');
      delete allProgress[studentId];
      localStorage.setItem('studentProgress', JSON.stringify(allProgress));

      refreshStudents();
    }
  };

  const handleSave = (updatedStudent: Student) => {
    const updatedStudents = students.map(s => s.id === updatedStudent.id ? updatedStudent : s);
    localStorage.setItem('students', JSON.stringify(updatedStudents));
    refreshStudents();
    setIsEditModalOpen(false);
    setEditingStudent(null);
  };
  
  const filteredStudents = useMemo(() => {
      return students
        .filter(student => 
            `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter(student => 
            classFilter ? student.class === classFilter : true
        );
  }, [students, searchTerm, classFilter]);
  
  const rankings = useMemo(() => {
    if (!activeRankingExamId) return [];

    const allResults: { [studentId: string]: ExamResult[] } = JSON.parse(localStorage.getItem('examResults') || '{}');
    const studentData = students.map(student => {
        const resultsForExam = (allResults[student.id] || []).filter(r => r.examId === activeRankingExamId);
        if (resultsForExam.length === 0) return null;

        // Find the best attempt based on highest score, then lowest duration
        const bestAttempt = [...resultsForExam].sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            if (a.duration !== b.duration) return a.duration - b.duration;
            return a.attempt - b.attempt;
        })[0];
        
        const totalAttempts = resultsForExam.length;
        const totalTime = 1200; // 20 minutes exam duration in seconds

        // Calculate weighted score based on score, duration, and number of attempts
        const weightedScore = bestAttempt.score * ((totalTime - Math.min(bestAttempt.duration, totalTime)) / totalTime) * (1 / totalAttempts);

        return {
            studentId: student.id,
            name: `${student.firstName} ${student.lastName}`,
            score: bestAttempt.score,
            duration: bestAttempt.duration,
            attempts: totalAttempts,
            weightedScore,
        };
    }).filter(Boolean) as { studentId: string; name: string; score: number; duration: number; attempts: number; weightedScore: number }[];
    
    // Sort by the new weightedScore in descending order
    studentData.sort((a, b) => b.weightedScore - a.weightedScore);

    return studentData;
  }, [activeRankingExamId, students]);

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };


  if (user.role === 'student') {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold">{t.dashboard.title}</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">{t.dashboard.studentViewComingSoon}</p>
      </div>
    );
  }
  
  if (view === 'details' && viewingStudentId) {
      return <StudentDetailsView studentId={viewingStudentId} onBack={() => setView('list')} />;
  }


  // Professor View
  return (
    <div className="max-w-7xl mx-auto animate-fadeInUp h-full flex flex-col">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t.dashboard.title}</h1>
      <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-6">{t.dashboard.description}</p>

      {students.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="text-center p-8 md:p-12 bg-white dark:bg-slate-800 rounded-lg shadow-md border-2 border-dashed border-slate-300 dark:border-slate-700">
            <InfoCircleIcon className="mx-auto h-12 w-12 text-indigo-400" />
            <h2 className="mt-4 text-xl font-semibold text-slate-800 dark:text-slate-200">{t.dashboard.empty.title}</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">{t.dashboard.empty.description}</p>
          </div>
        </div>
      ) : (
        <>
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-lg md:text-xl font-bold mb-4">{t.dashboard.studentList}</h2>
             <div className="flex flex-col md:flex-row gap-4 mb-4">
                <input
                    type="text"
                    placeholder={t.dashboard.searchByName}
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="flex-grow block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600"
                />
                <select
                    value={classFilter}
                    onChange={e => setClassFilter(e.target.value)}
                    className="block rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600"
                >
                    <option value="">{t.dashboard.allClasses}</option>
                    {classOptions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-slate-500 dark:text-slate-400">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-300">
                        <tr>
                            <th scope="col" className="px-6 py-3">{t.login.lastName}</th>
                            <th scope="col" className="px-6 py-3">{t.login.firstName}</th>
                            <th scope="col" className="px-6 py-3">{t.login.class}</th>
                            <th scope="col" className="px-6 py-3">{t.login.number}</th>
                            <th scope="col" className="px-6 py-3">{t.dashboard.status}</th>
                            <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredStudents.map(student => (
                            <tr key={student.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600 cursor-pointer" onClick={() => handleViewDetails(student.id)}>
                                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{student.lastName}</td>
                                <td className="px-6 py-4">{student.firstName}</td>
                                <td className="px-6 py-4">{student.class}</td>
                                <td className="px-6 py-4">{student.number}</td>
                                <td className="px-6 py-4 text-center">
                                  {student.isPremium && <StarIcon className="w-5 h-5 text-amber-400" />}
                                </td>
                                <td className="px-6 py-4 text-right" onClick={e => e.stopPropagation()}>
                                    <button onClick={() => handleEdit(student)} className="font-medium text-indigo-600 dark:text-indigo-500 hover:underline me-3"><PencilIcon className="w-5 h-5 inline-block"/></button>
                                    <button onClick={() => handleDelete(student.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline"><TrashIcon className="w-5 h-5 inline-block"/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {filteredStudents.length === 0 && <p className="text-center p-4">{t.common.error}</p>}
            </div>
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-lg md:text-xl font-bold mb-4">{t.dashboard.rankings}</h2>
            <select
                value={activeRankingExamId || ''}
                onChange={e => setActiveRankingExamId(e.target.value)}
                className="block w-full md:w-1/2 rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600 mb-4"
            >
                <option value="">{t.dashboard.selectExam}</option>
                {allExams.map(exam => <option key={exam.id} value={exam.id}>{exam.title}</option>)}
            </select>
            
            {activeRankingExamId && (
                 <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-slate-500 dark:text-slate-400">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-300">
                            <tr>
                                <th scope="col" className="px-6 py-3">{t.dashboard.rank}</th>
                                <th scope="col" className="px-6 py-3">{t.dashboard.studentName}</th>
                                <th scope="col" className="px-6 py-3">{t.dashboard.weightedScore}</th>
                                <th scope="col" className="px-6 py-3">{t.dashboard.score}</th>
                                <th scope="col" className="px-6 py-3">{t.dashboard.duration}</th>
                                <th scope="col" className="px-6 py-3">{t.dashboard.attempts}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rankings.map((student, index) => (
                                <tr key={student.studentId} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600">
                                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{index + 1}</td>
                                    <td className="px-6 py-4">{student.name}</td>
                                    <td className="px-6 py-4 font-semibold text-indigo-600 dark:text-indigo-400">{student.weightedScore.toFixed(3)}</td>
                                    <td className="px-6 py-4 font-semibold text-green-600 dark:text-green-400">{student.score.toFixed(2)} / 20</td>
                                    <td className="px-6 py-4">{formatDuration(student.duration)}</td>
                                    <td className="px-6 py-4">{student.attempts}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
            )}
        </div>
        </>
      )}
      {editingStudent && (
        <EditStudentModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          student={editingStudent}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default Dashboard;