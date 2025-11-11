// FIX: Import Modality for use in image editing and generation functions.
import { GoogleGenAI, Modality } from '@google/genai';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

// FIX: Add global declaration for window.aistudio to satisfy TypeScript for Veo video generation.
declare global {
  // FIX: Define the AIStudio interface to be merged with any existing global declarations
  // and resolve the type conflict for window.aistudio.
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }
  interface Window {
    aistudio?: AIStudio;
  }
}

// Helper function to convert file to a base64 string
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });
};


export const getAdvancedResponse = async (prompt: string): Promise<string> => {
  if (!API_KEY) return "API Key not configured.";
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: prompt,
    config: {
      thinkingConfig: { thinkingBudget: 32768 }
    }
  });
  return response.text;
};

// FIX: Implement and export analyzeImage function to resolve import error in ImageAnalyzer.tsx
export const analyzeImage = async (prompt: string, image: File): Promise<string> => {
  if (!API_KEY) return "API Key not configured.";

  const base64Image = await fileToBase64(image);
  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType: image.type,
    },
  };
  const textPart = { text: prompt };

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [imagePart, textPart] },
  });

  return response.text;
};

// FIX: Implement and export editImage function to resolve import error in ImageEditor.tsx
export const editImage = async (prompt: string, image: File): Promise<string> => {
  if (!API_KEY) throw new Error("API Key not configured.");
  
  const base64Image = await fileToBase64(image);
  const imagePart = {
    inlineData: {
      data: base64Image,
      mimeType: image.type,
    },
  };
  const textPart = { text: prompt };
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [imagePart, textPart],
    },
    config: {
      responseModalities: [Modality.IMAGE],
    },
  });
  
  if (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return part.inlineData.data;
      }
    }
  }

  throw new Error("No image generated.");
};

// FIX: Implement and export generateImage function to resolve import error in ImageGenerator.tsx
export const generateImage = async (prompt: string): Promise<string> => {
  if (!API_KEY) throw new Error("API Key not configured.");
  
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt: prompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
    },
  });

  if (!response.generatedImages || response.generatedImages.length === 0) {
    throw new Error("Image generation failed.");
  }

  return response.generatedImages[0].image.imageBytes;
};

// FIX: Implement and export generateVideo function to resolve import error in VideoGenerator.tsx
export const generateVideo = async (prompt: string, image: File): Promise<string> => {
  if (!process.env.API_KEY) throw new Error("API Key not configured.");

  if (window.aistudio && !(await window.aistudio.hasSelectedApiKey())) {
    await window.aistudio.openSelectKey();
  }
  
  // Re-initialize AI client to get the latest key
  const freshAi = new GoogleGenAI({ apiKey: process.env.API_KEY! });

  const base64Image = await fileToBase64(image);

  let operation = await freshAi.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    image: {
      imageBytes: base64Image,
      mimeType: image.type,
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '16:9'
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await freshAi.operations.getVideosOperation({operation: operation});
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) {
      throw new Error("Video generation failed or returned no link.");
  }
  
  const finalUrl = `${downloadLink}&key=${process.env.API_KEY}`;
  const videoResponse = await fetch(finalUrl);
  if (!videoResponse.ok) {
    const errorBody = await videoResponse.text();
    if (errorBody.includes('Requested entity was not found')) {
       throw new Error('API key may be invalid. Please select a valid API key and try again.');
    }
    throw new Error(`Failed to download video. Status: ${videoResponse.status}`);
  }
  const videoBlob = await videoResponse.blob();
  return URL.createObjectURL(videoBlob);
};