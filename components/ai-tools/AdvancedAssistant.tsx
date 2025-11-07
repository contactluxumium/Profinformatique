import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { getAdvancedResponse } from '../../services/geminiService';
import { PencilIcon, SpinnerIcon } from '../Icons';

const AdvancedAssistant: React.FC = () => {
  const { t } = useLanguage();
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!prompt) {
      setError('Please ask a question.');
      return;
    }
    setLoading(true);
    setError('');
    setResult('');
    try {
      const response = await getAdvancedResponse(prompt);
      setResult(response);
    } catch (e) {
      setError(e instanceof Error ? e.message : t.common.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="relative">
            <div className="absolute top-3.5 start-0 flex items-center ps-3.5 pointer-events-none text-slate-400">
                <PencilIcon className="w-5 h-5" />
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t.aiTools.assistantPlaceholder}
              rows={4}
              className="block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm bg-slate-50 dark:bg-slate-700 ps-10 pt-3"
            />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading || !prompt}
          className="w-full bg-sky-500 text-white py-2.5 px-6 rounded-md hover:bg-sky-600 disabled:bg-slate-400 dark:disabled:bg-slate-600 transition-all active:scale-95 flex items-center justify-center"
        >
          {loading ? <SpinnerIcon /> : t.aiTools.ask}
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      {result && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-md">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{result}</pre>
        </div>
      )}
    </div>
  );
};

export default AdvancedAssistant;