import React, { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { Student } from '../types';

interface EditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student;
  onSave: (student: Student) => void;
}

const EditStudentModal: React.FC<EditStudentModalProps> = ({ isOpen, onClose, student, onSave }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<Student>(student);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  const classOptions = Array.from({ length: 8 }, (_, i) => `2APIC-${i + 1}`);

  useEffect(() => {
    setFormData(student);
  }, [student]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.lastName || formData.lastName.length < 1 || formData.lastName.length > 80) {
      newErrors.lastName = t.login.errorLastName;
    }
    if (!formData.firstName || formData.firstName.length < 1 || formData.firstName.length > 80) {
      newErrors.firstName = t.login.errorFirstName;
    }
    const num = Number(formData.number);
    if (isNaN(num) || num < 1 || num > 40) {
        newErrors.number = t.login.errorNumber;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      onSave(formData);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: name === 'number' ? parseInt(value, 10) : value}));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-md animate-scaleIn" onClick={e => e.stopPropagation()}>
        <header className="p-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-bold">{t.dashboard.editStudent}</h2>
        </header>
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t.login.lastName}</label>
            <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600" />
            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
          </div>
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t.login.firstName}</label>
            <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600" />
            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="class" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t.login.class}</label>
            <select name="class" id="class" value={formData.class} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600">
              {classOptions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
           <div>
            <label htmlFor="number" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t.login.number}</label>
            <input type="number" name="number" id="number" value={formData.number} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm dark:bg-slate-700 dark:border-slate-600" />
            {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
          </div>
        </div>
        <footer className="flex justify-end gap-4 p-4 bg-slate-50 dark:bg-slate-900/50">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium rounded-md bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600">{t.dashboard.cancel}</button>
          <button onClick={handleSave} className="px-4 py-2 text-sm font-medium rounded-md bg-sky-500 text-white hover:bg-sky-600">{t.dashboard.save}</button>
        </footer>
      </div>
    </div>
  );
};

export default EditStudentModal;
