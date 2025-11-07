import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import ImageAnalyzer from './ai-tools/ImageAnalyzer';
import ImageEditor from './ai-tools/ImageEditor';
import ImageGenerator from './ai-tools/ImageGenerator';
import VideoGenerator from './ai-tools/VideoGenerator';
import AdvancedAssistant from './ai-tools/AdvancedAssistant';

type AITool = 'imageAnalyzer' | 'imageEditor' | 'imageGenerator' | 'videoGenerator' | 'advancedAssistant';

const AITools: React.FC = () => {
  const { t } = useLanguage();
  const [activeTool, setActiveTool] = useState<AITool>('advancedAssistant');

  const tools: { id: AITool; label: string; description: string }[] = [
    { id: 'advancedAssistant', label: t.aiTools.advancedAssistant, description: t.aiTools.assistantDesc },
    { id: 'imageAnalyzer', label: t.aiTools.imageAnalyzer, description: t.aiTools.analyzerDesc },
    { id: 'imageEditor', label: t.aiTools.imageEditor, description: t.aiTools.editorDesc },
    { id: 'imageGenerator', label: t.aiTools.imageGenerator, description: t.aiTools.generatorDesc },
    { id: 'videoGenerator', label: t.aiTools.videoGenerator, description: t.aiTools.videoDesc },
  ];

  const renderTool = () => {
    switch (activeTool) {
      case 'imageAnalyzer': return <ImageAnalyzer />;
      case 'imageEditor': return <ImageEditor />;
      case 'imageGenerator': return <ImageGenerator />;
      case 'videoGenerator': return <VideoGenerator />;
      case 'advancedAssistant': return <AdvancedAssistant />;
      default: return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-fadeInUp">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2">{t.aiTools.title}</h1>
      <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mb-6">{t.aiTools.description}</p>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`px-3 py-2 md:px-4 rounded-lg font-semibold text-xs md:text-sm transition-all duration-200 ${
              activeTool === tool.id
                ? 'bg-sky-500 text-white shadow'
                : 'bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600'
            }`}
          >
            {tool.label}
          </button>
        ))}
      </div>
      
      <div className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-2">{tools.find(t => t.id === activeTool)?.label}</h2>
        <p className="text-slate-500 dark:text-slate-400 mb-6">{tools.find(t => t.id === activeTool)?.description}</p>
        {renderTool()}
      </div>
    </div>
  );
};

export default AITools;