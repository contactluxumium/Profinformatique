import React, { useState, useMemo, useCallback } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { InfoCircleIcon, PencilIcon, TrashIcon, UserAddIcon } from './Icons';
import { Student, User } from '../types';
import EditStudentModal from './EditStudentModal';

interface DashboardProps {
  user: User;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const { t, language } = useLanguage();
  const [students, setStudents] = useState<Student[]>(() => 
    JSON.parse(localStorage.getItem('students') || '[]')
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const refreshStudents = useCallback(() => {
    setStudents(JSON.parse(localStorage.getItem('students') || '[]'));
  }, []);

  const handleEdit = (student: Student) => {
    setEditingStudent(student);
    setIsEditModalOpen(true);
  };
  
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

  const allProgress = useMemo(() => JSON.parse(localStorage.getItem('studentProgress') || '{}'), [students]);

  const chartData = useMemo(() => {
    return students.map(student => {
      const progress = allProgress[student.id] || [];
      return {
        name: `${student.firstName} ${student.lastName}`,
        lessonsCompleted: progress.length,
        averageScore: Math.floor(Math.random() * 30) + 70, // Placeholder score
      };
    });
  }, [students, allProgress]);

  const performanceData = useMemo(() => {
    const distribution = { 'ممتاز (90+)': 0, 'جيد جدا (80-89)': 0, 'جيد (70-79)': 0, 'مقبول (<70)': 0 };
    chartData.forEach(d => {
      if (d.averageScore >= 90) distribution['ممتاز (90+)']++;
      else if (d.averageScore >= 80) distribution['جيد جدا (80-89)']++;
      else if (d.averageScore >= 70) distribution['جيد (70-79)']++;
      else distribution['مقبول (<70)']++;
    });
    return Object.entries(distribution).map(([name, value]) => ({ name, value }));
  }, [chartData]);


  if (user.role === 'student') {
    return (
      <div className="text-center p-8">
        <h1 className="text-2xl font-bold">{t.dashboard.title}</h1>
        <p className="mt-4 text-slate-600 dark:text-slate-400">{t.dashboard.studentViewComingSoon}</p>
      </div>
    );
  }

  // Professor View
  return (
    <div className="max-w-7xl mx-auto animate-fadeInUp h-full flex flex-col">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t.dashboard.title}</h1>
      <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-6">{t.dashboard.description}</p>

      {students.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="text-center p-8 md:p-12 bg-white dark:bg-slate-800 rounded-lg shadow-md border-2 border-dashed border-slate-300 dark:border-slate-700">
            <InfoCircleIcon className="mx-auto h-12 w-12 text-sky-400" />
            <h2 className="mt-4 text-xl font-semibold text-slate-800 dark:text-slate-200">{t.dashboard.empty.title}</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">{t.dashboard.empty.description}</p>
          </div>
        </div>
      ) : (
        <>
        <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-lg md:text-xl font-bold mb-4">{t.dashboard.studentList}</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-slate-500 dark:text-slate-400">
                    <thead className="text-xs text-slate-700 uppercase bg-slate-50 dark:bg-slate-700 dark:text-slate-300">
                        <tr>
                            <th scope="col" className="px-6 py-3">{t.login.lastName}</th>
                            <th scope="col" className="px-6 py-3">{t.login.firstName}</th>
                            <th scope="col" className="px-6 py-3">{t.login.class}</th>
                            <th scope="col" className="px-6 py-3">{t.login.number}</th>
                            <th scope="col" className="px-6 py-3"><span className="sr-only">Actions</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map(student => (
                            <tr key={student.id} className="bg-white dark:bg-slate-800 border-b dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-600">
                                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{student.lastName}</td>
                                <td className="px-6 py-4">{student.firstName}</td>
                                <td className="px-6 py-4">{student.class}</td>
                                <td className="px-6 py-4">{student.number}</td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => handleEdit(student)} className="font-medium text-sky-600 dark:text-sky-500 hover:underline me-3"><PencilIcon className="w-5 h-5 inline-block"/></button>
                                    <button onClick={() => handleDelete(student.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline"><TrashIcon className="w-5 h-5 inline-block"/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg md:text-xl font-bold mb-4">{t.dashboard.lessonsCompleted} & {t.dashboard.averageScore}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" reversed={language === 'ar'} tick={false} />
                <YAxis yAxisId="left" orientation={language === 'ar' ? 'right' : 'left'} />
                <YAxis yAxisId="right" orientation={language === 'ar' ? 'left' : 'right'} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="lessonsCompleted" fill="#8884d8" name={t.dashboard.lessonsCompleted} />
                <Bar yAxisId="right" dataKey="averageScore" fill="#82ca9d" name={t.dashboard.averageScore} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg md:text-xl font-bold mb-4">{t.dashboard.studentDistribution}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={performanceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }: { name: string; percent: number }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} (${(performanceData.reduce((acc, entry) => acc + entry.value, 0) > 0 ? (Number(value) / performanceData.reduce((acc, entry) => acc + entry.value, 0) * 100).toFixed(0) : 0)}%)`, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
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
