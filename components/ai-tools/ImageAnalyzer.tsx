import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { analyzeImage } from '../../services/geminiService';
import { PencilIcon, SpinnerIcon, UploadIcon } from '../Icons';

const ImageAnalyzer: React.FC = () => {
  const { t } = useLanguage();
  const [image, setImage] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!prompt || !image) {
      setError('Please provide an image and a question.');
      return;
    }
    setLoading(true);
    setError('');
    setResult('');
    try {
      const response = await analyzeImage(prompt, image);
      setResult(response);
    } catch (e) {
      setError(e instanceof Error ? e.message : t.common.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="image-upload-analyzer" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{t.aiTools.uploadImage}</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-md hover:border-sky-500 dark:hover:border-sky-400 transition-colors">
            <div className="space-y-1 text-center">
              {preview ? (
                <img src={preview} alt="Preview" className="mx-auto h-32 w-auto object-contain rounded-md" />
              ) : (
                <UploadIcon className="mx-auto h-12 w-12 text-slate-400" />
              )}
              <div className="flex text-sm text-slate-600 dark:text-slate-400">
                <label htmlFor="image-upload-analyzer" className="relative cursor-pointer bg-white dark:bg-slate-800 rounded-md font-medium text-sky-600 hover:text-sky-500 focus-within:outline-none">
                  <span>{image ? image.name : t.aiTools.uploadImage}</span>
                  <input id="image-upload-analyzer" name="image-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col">
          <label htmlFor="prompt" className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t.aiTools.askQuestion}</label>
          <div className="relative mt-1 flex-grow">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-slate-400">
                <PencilIcon className="w-5 h-5" />
            </div>
            <textarea
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t.aiTools.askQuestion}
              rows={4}
              className="block w-full h-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm bg-slate-50 dark:bg-slate-700 ps-10"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading || !image || !prompt}
            className="mt-4 w-full bg-sky-500 text-white py-2.5 px-4 rounded-md hover:bg-sky-600 disabled:bg-slate-400 dark:disabled:bg-slate-600 transition-all active:scale-95 flex items-center justify-center"
          >
            {loading ? <SpinnerIcon /> : t.aiTools.analyze}
          </button>
        </div>
      </div>
      
      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      {result && (
        <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-md">
          <h3 className="font-bold mb-2">Analysis Result:</h3>
          <p className="whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </div>
  );
};

export default ImageAnalyzer;