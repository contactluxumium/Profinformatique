import React, { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { generateVideo } from '../../services/geminiService';
import { PencilIcon, SpinnerIcon, UploadIcon } from '../Icons';

const VideoGenerator: React.FC = () => {
  const { t } = useLanguage();
  const [image, setImage] = useState<File | null>(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  const handleSubmit = async () => {
    if (!prompt || !image) {
      setError('Please provide an image and a description.');
      return;
    }
    setLoading(true);
    setError('');
    setResult(null);
    try {
      const videoUrl = await generateVideo(prompt, image);
      setResult(videoUrl);
    } catch (e) {
      setError(e instanceof Error ? e.message : t.common.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        <label htmlFor="image-upload-video" className="relative cursor-pointer w-full border-2 border-slate-300 dark:border-slate-600 border-dashed rounded-md p-4 text-center hover:border-sky-500 dark:hover:border-sky-400 transition-colors">
          <UploadIcon className="mx-auto h-12 w-12 text-slate-400" />
          <span className="mt-2 block text-sm font-medium text-slate-900 dark:text-slate-100">{image ? image.name : t.aiTools.uploadImage}</span>
          <input id="image-upload-video" name="image-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
        </label>
        
        <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none text-slate-400">
                <PencilIcon className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={t.aiTools.videoPrompt}
              className="block w-full rounded-md border-slate-300 dark:border-slate-600 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm bg-slate-50 dark:bg-slate-700 ps-10"
            />
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={loading || !image || !prompt}
          className="w-full bg-sky-500 text-white py-2.5 px-4 rounded-md hover:bg-sky-600 disabled:bg-slate-400 dark:disabled:bg-slate-600 transition-all active:scale-95 flex items-center justify-center"
        >
          {loading ? <SpinnerIcon /> : t.aiTools.generate}
        </button>
      </div>

      {error && <p className="text-red-500 mt-4">{error}</p>}
      
      <div className="mt-6">
        {loading && (
          <div className="flex flex-col justify-center items-center h-64 bg-slate-100 dark:bg-slate-700 rounded-md">
            <p className="text-lg font-semibold">{t.aiTools.generating}...</p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t.aiTools.videoWait}</p>
          </div>
        )}
        {result && (
          <video src={result} controls autoPlay loop className="w-full max-w-lg mx-auto h-auto rounded-md" />
        )}
        {!result && !loading && preview && (
           <img src={preview} alt="Starting frame" className="w-full max-w-lg mx-auto h-auto rounded-md" />
        )}
      </div>
    </div>
  );
};

export default VideoGenerator;