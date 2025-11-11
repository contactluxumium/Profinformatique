import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { User, Student } from '../types';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

type AuthMode = 'studentLogin' | 'studentCreate';

const PROF_PASSWORD = '14584135';

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const { t } = useLanguage();
  const [authMode, setAuthMode] = useState<AuthMode>('studentLogin');
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
        setAuthMode('studentLogin');
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
    const inputClasses = "mt-1 block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base p-3 dark:bg-slate-700 dark:border-slate-600 bg-slate-50";
    const buttonClasses = "w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-base";
    
    if (activeTab === 'prof') {
      return (
        <form onSubmit={handleProfLogin} className="space-y-4 animate-fadeIn">
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-slate-700 dark:text-slate-200">{t.login.password}</label>
            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className={inputClasses} />
          </div>
          <button type="submit" className={buttonClasses}>{t.login.login}</button>
        </form>
      );
    }

    // Student Login / Create Account Forms
    return (
      <>
        <div className="flex justify-center p-1 mb-6 bg-slate-200 dark:bg-slate-700 rounded-lg">
            <button
                onClick={() => setAuthMode('studentLogin')}
                className={`w-1/2 py-2 text-center font-semibold rounded-md transition-all duration-300 text-sm ${
                    authMode === 'studentLogin'
                    ? 'bg-white dark:bg-slate-600 shadow text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
            >
                {t.login.login}
            </button>
            <button
                onClick={() => setAuthMode('studentCreate')}
                className={`w-1/2 py-2 text-center font-semibold rounded-md transition-all duration-300 text-sm ${
                    authMode === 'studentCreate'
                    ? 'bg-white dark:bg-slate-600 shadow text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-500 dark:text-slate-400'
                }`}
            >
                {t.login.createAccount}
            </button>
        </div>
        
        {authMode === 'studentCreate' && (
             <form onSubmit={handleStudentCreate} className="space-y-3 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-bold text-slate-700 dark:text-slate-200">{t.login.lastName}</label>
                        <input type="text" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} required className={inputClasses} />
                    </div>
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-bold text-slate-700 dark:text-slate-200">{t.login.firstName}</label>
                        <input type="text" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required className={inputClasses} />
                    </div>
                </div>
                 <div>
                    <label htmlFor="studentClassCreate" className="block text-sm font-bold text-slate-700 dark:text-slate-200">{t.login.class}</label>
                    <select id="studentClassCreate" value={studentClass} onChange={e => setStudentClass(e.target.value)} required className={inputClasses}>
                        <option value="">{t.login.selectClass}</option>
                        {classOptions.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="studentNumberCreate" className="block text-sm font-bold text-slate-700 dark:text-slate-200">{t.login.number}</label>
                    <input type="number" id="studentNumberCreate" value={studentNumber} onChange={e => setStudentNumber(e.target.value)} min="1" max="40" required className={inputClasses} />
                </div>
                 <div>
                    <label htmlFor="passwordCreate" className="block text-sm font-bold text-slate-700 dark:text-slate-200">{t.login.password}</label>
                    <input type="password" id="passwordCreate" value={password} onChange={e => setPassword(e.target.value)} required className={inputClasses} />
                </div>
                <button type="submit" className={buttonClasses}>{t.login.createAccount}</button>
            </form>
        )}

        {authMode === 'studentLogin' && (
            <form onSubmit={handleStudentLogin} className="space-y-4 animate-fadeIn">
                 <div>
                    <label htmlFor="studentIdLogin" className="block text-sm font-bold text-slate-700 dark:text-slate-200">{t.login.identifiant}</label>
                    <input type="text" id="studentIdLogin" placeholder="Ex: 2APIC-1-25" value={studentId} onChange={e => setStudentId(e.target.value)} required className={inputClasses} />
                </div>
                 <div>
                    <label htmlFor="passwordLogin" className="block text-sm font-bold text-slate-700 dark:text-slate-200">{t.login.password}</label>
                    <input type="password" id="passwordLogin" value={password} onChange={e => setPassword(e.target.value)} required className={inputClasses} />
                </div>
                <button type="submit" className={buttonClasses}>{t.login.login}</button>
            </form>
        )}
      </>
    );
  };

  const handleTabChange = (tab: 'student' | 'prof') => {
    setActiveTab(tab);
    setError('');
    setSuccess('');
    setPassword('');
    // Reset student-specific fields
    setStudentId('');
    setLastName('');
    setFirstName('');
    setStudentClass('');
    setStudentNumber('');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 font-sans p-4">
      <div className="w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-6">{t.sidebar.title}</h1>
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 md:p-8">
            <div className="flex bg-slate-100 dark:bg-slate-900 rounded-xl p-1.5 mb-8 space-x-2">
              <button
                onClick={() => handleTabChange('student')}
                className={`w-1/2 py-3 text-lg font-bold rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 ${
                  activeTab === 'student' 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50'
                }`}
              >
                {t.login.studentSpace}
              </button>
              <button
                onClick={() => handleTabChange('prof')}
                className={`w-1/2 py-3 text-lg font-bold rounded-lg transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 ${
                  activeTab === 'prof' 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105' 
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700/50'
                }`}
              >
                {t.login.profSpace}
              </button>
            </div>
            
            {error && <p className="text-red-500 text-center text-sm mb-4 animate-fadeIn">{error}</p>}
            {success && <p className="text-green-500 text-center text-sm mb-4 animate-fadeIn">{success}</p>}
            {renderForm()}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;