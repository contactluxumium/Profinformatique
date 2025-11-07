import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { InfoCircleIcon } from './Icons';

const studentData = [
  { name: 'أحمد', lessonsCompleted: 10, averageScore: 85 },
  { name: 'فاطمة', lessonsCompleted: 12, averageScore: 92 },
  { name: 'يوسف', lessonsCompleted: 8, averageScore: 78 },
  { name: 'مريم', lessonsCompleted: 15, averageScore: 95 },
  { name: 'علي', lessonsCompleted: 7, averageScore: 70 },
];
// To test the empty state, use this:
// const studentData: {name: string, lessonsCompleted: number, averageScore: number}[] = [];

const performanceData = [
  { name: 'ممتاز (90+)', value: 2 },
  { name: 'جيد جدا (80-89)', value: 1 },
  { name: 'جيد (70-79)', value: 2 },
  { name: 'مقبول (<70)', value: 0 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto animate-fadeInUp h-full flex flex-col">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2 flex-shrink-0">{t.dashboard.title}</h1>
      <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-6 md:mb-8 flex-shrink-0">{t.dashboard.description}</p>

      {studentData.length === 0 ? (
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="text-center p-8 md:p-12 bg-white dark:bg-slate-800 rounded-lg shadow-md border-2 border-dashed border-slate-300 dark:border-slate-700">
            <InfoCircleIcon className="mx-auto h-12 w-12 md:h-16 md:w-16 text-sky-400" />
            <h2 className="mt-4 text-xl font-semibold text-slate-800 dark:text-slate-200">{t.dashboard.empty.title}</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">{t.dashboard.empty.description}</p>
            <button className="mt-6 px-5 py-2.5 text-sm font-medium text-white bg-sky-500 rounded-lg hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 transition-all active:scale-95">
              {t.dashboard.empty.addStudent}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-md">
            <h2 className="text-lg md:text-xl font-bold mb-4">{t.dashboard.lessonsCompleted} & {t.dashboard.averageScore}</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" reversed={language === 'ar'} />
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
                  label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                >
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} (${(performanceData.reduce((acc, entry) => acc + entry.value, 0) > 0 ? (value / performanceData.reduce((acc, entry) => acc + entry.value, 0) * 100).toFixed(0) : 0)}%)`, name]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;