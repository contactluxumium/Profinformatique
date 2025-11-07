import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { generateImage } from '../../services/geminiService';
import { PencilIcon, SpinnerIcon } from '../Icons';

const ImageGenerator: React.FC = () => {
  const { t } = useLanguage();
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!prompt) {
      setError('Please provide a description for the image.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const base64Image = await generateImage(prompt);
      setResult(`data:image/jpeg;base64,${base64Image}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : t.common.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-grow">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-slate-400">
                <PencilIcon className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t.aiTools.imagePrompt}
              className="block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm bg-slate-50 dark:bg-slate-700 ps-10"
            />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading || !prompt}
          className="bg-sky-500 text-white py-2.5 px-6 rounded-md hover:bg-sky-600 disabled:bg-slate-400 dark:disabled:bg-slate-600 transition-all active:scale-95 flex items-center justify-center"
        >
          {loading ? <SpinnerIcon /> : t.aiTools.generate}
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      <div className="mt-6">
        {loading && (
          <div className="flex justify-center items-center h-64 bg-slate-100 dark:bg-slate-700 rounded-md">
            <p>{t.aiTools.generating}...</p>
          </div>
        )}
        {result && (
          <img src={result} alt="Generated" className="w-full max-w-lg mx-auto h-auto object-contain rounded-md" />
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;