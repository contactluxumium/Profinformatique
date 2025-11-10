import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { User, Student } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

type AuthMode = 'studentLogin' | 'studentCreate' | 'profLogin';

const PROF_PASSWORD = '14584135';

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const { t } = useLanguage();
  const [mode, setMode] = useState<AuthMode>('studentLogin');
  const [activeTab, setActiveTab] = useState<'student' | 'prof'>('student');
  
  // Form state
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const classOptions = Array.from({ length: 8 }, (_, i) => `2APIC-${i + 1}`);

  const handleStudentCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (lastName.trim().length < 1 || lastName.trim().length > 80) {
      setError(t.login.errorLastName);
      return;
    }
    if (firstName.trim().length < 1 || firstName.trim().length > 80) {
      setError(t.login.errorFirstName);
      return;
    }
    if (!studentClass) {
      setError(t.login.errorClass);
      return;
    }
    const num = Number(studentNumber);
    if (isNaN(num) || num < 1 || num > 40) {
        setError(t.login.errorNumber);
        return;
    }
    if (!/^\d{8}$/.test(password)) {
        setError(t.login.errorPassword);
        return;
    }

    const students: Student[] = JSON.parse(localStorage.getItem('students') || '[]');
    const generatedId = `${studentClass}-${num}`;

    if (students.some(s => s.id === generatedId)) {
        setError(t.login.errorUserExists);
        return;
    }

    const newStudent: Student = { 
        id: generatedId, 
        lastName, 
        firstName, 
        class: studentClass, 
        number: num,
        password 
    };
    students.push(newStudent);
    localStorage.setItem('students', JSON.stringify(students));
    
    setSuccess(t.login.successCreation.replace('{id}', generatedId));
    setLastName('');
    setFirstName('');
    setStudentClass('');
    setStudentNumber('');
    setPassword('');
    setTimeout(() => {
        setMode('studentLogin');
        setSuccess('');
    }, 4000);
  };

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const students: Student[] = JSON.parse(localStorage.getItem('students') || '[]');
    const foundStudent = students.find(s => s.id === studentId.trim());

    if (foundStudent && foundStudent.password === password) {
        onLogin({ ...foundStudent, role: 'student' });
    } else {
        setError(t.login.errorUserNotFound);
    }
  };

  const handleProfLogin = (e: React.FormEvent) => {
     e.preventDefault();
     setError('');
     if (password === PROF_PASSWORD) {
        onLogin({ id: 'prof-01', role: 'professor' });
     } else {
        setError(t.login.errorWrongPassword);
     }
  };

  const renderForm = () => {
    if (activeTab === 'prof') {
      return (
        <form onSubmit={handleProfLogin} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-slate-700 dark:text-slate-200">{t.login.password}</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600" />
          </div>
          <button type="submit" className="w-full bg-sky-600 text-white py-2.5 rounded-md hover:bg-sky-700 transition-colors font-semibold">{t.login.login}</button>
        </form>
      );
    }

    if (mode === 'studentCreate') {
       return (
        <>
            <div className="flex justify-center mb-4">
                <button onClick={() => setMode('studentLogin')} className="text-sm text-sky-600 hover:underline dark:text-sky-400">{t.login.login}</button>
                <span className="mx-2 text-slate-400">|</span>
                <span className="text-sm font-semibold">{t.login.createAccount}</span>
            </div>
            <form onSubmit={handleStudentCreate} className="space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-bold text-slate-700 dark:text-slate-200">{t.login.lastName}</label>
                        <input type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600" />
                    </div>
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-bold text-slate-700 dark:text-slate-200">{t.login.firstName}</label>
                        <input type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600" />
                    </div>
                </div>
                 <div>
                    <label htmlFor="studentClassCreate" className="block text-sm font-bold text-slate-700 dark:text-slate-200">{t.login.class}</label>
                    <select id="studentClassCreate" value={studentClass} onChange={e => setStudentClass(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600">
                        <option value="">{t.login.selectClass}</option>
                        {classOptions.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="studentNumberCreate" className="block text-sm font-bold text-slate-700 dark:text-slate-200">{t.login.number}</label>
                    <input type="number" id="studentNumberCreate" value={studentNumber} onChange={e => setStudentNumber(e.target.value)} min="1" max="40" required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600" />
                </div>
                 <div>
                    <label htmlFor="passwordCreate" className="block text-sm font-bold text-slate-700 dark:text-slate-200">{t.login.password}</label>
                    <input type="password" id="passwordCreate" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600" />
                </div>
                <button type="submit" className="w-full bg-sky-600 text-white py-2.5 rounded-md hover:bg-sky-700 transition-colors font-semibold">{t.login.createAccount}</button>
            </form>
        </>
       );
    }
    
    return (
        <>
            <div className="flex justify-center mb-4">
                 <span className="text-sm font-semibold">{t.login.login}</span>
                <span className="mx-2 text-slate-400">|</span>
                <button onClick={() => setMode('studentCreate')} className="text-sm text-sky-600 hover:underline dark:text-sky-400">{t.login.createAccount}</button>
            </div>
            <form onSubmit={handleStudentLogin} className="space-y-4">
                 <div>
                    <label htmlFor="studentIdLogin" className="block text-sm font-bold text-slate-700 dark:text-slate-200">{t.login.identifiant}</label>
                    <input type="text" id="studentIdLogin" placeholder="Ex: 2APIC-1-25" value={studentId} onChange={e => setStudentId(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600" />
                </div>
                 <div>
                    <label htmlFor="passwordLogin" className="block text-sm font-bold text-slate-700 dark:text-slate-200">{t.login.password}</label>
                    <input type="password" id="passwordLogin" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600" />
                </div>
                <button type="submit" className="w-full bg-sky-600 text-white py-2.5 rounded-md hover:bg-sky-700 transition-colors font-semibold">{t.login.login}</button>
            </form>
        </>
    )
  };

  const handleTabChange = (tab: 'student' | 'prof') => {
    setActiveTab(tab);
    setError('');
    setSuccess('');
    setPassword('');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 font-sans p-4">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-sky-600 dark:text-sky-400 mb-6">{t.sidebar.title}</h1>
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg">
          <div className="flex border-b border-slate-200 dark:border-slate-700">
            <button
              onClick={() => handleTabChange('student')}
              className={`w-1/2 p-4 font-semibold text-center transition-colors ${activeTab === 'student' ? 'text-sky-600 dark:text-sky-400' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
            >
              {t.login.studentSpace}
            </button>
            <button
              onClick={() => handleTabChange('prof')}
              className={`w-1/2 p-4 font-semibold text-center transition-colors ${activeTab === 'prof' ? 'text-sky-600 dark:text-sky-400' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'}`}
            >
              {t.login.profSpace}
            </button>
          </div>
          <div className="p-6 md:p-8">
            {error && <p className="text-red-500 text-center text-sm mb-4 animate-fadeIn">{error}</p>}
            {success && <p className="text-green-500 text-center text-sm mb-4 animate-fadeIn">{success}</p>}
            {renderForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;