import { GoogleGenAI, GenerateContentResponse, Modality } from '@google/genai';
import { Question } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const analyzeImage = async (prompt: string, image: File): Promise<string> => {
  if (!API_KEY) return "API Key not configured.";
  const imagePart = await fileToGenerativePart(image);
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: { parts: [ {text: prompt}, imagePart ] },
  });
  return response.text;
};

export const editImage = async (prompt: string, image: File): Promise<string> => {
  if (!API_KEY) return "API Key not configured.";
  const imagePart = await fileToGenerativePart(image);
   const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [ imagePart, { text: prompt } ] },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

  const firstPart = response.candidates?.[0]?.content?.parts?.[0];
  if (firstPart && firstPart.inlineData) {
    return firstPart.inlineData.data;
  }
  throw new Error("No image data in response");
};

export const generateImage = async (prompt: string): Promise<string> => {
  if (!API_KEY) return "API Key not configured.";
  const response = await ai.models.generateImages({
    model: 'imagen-4.0-generate-001',
    prompt,
    config: {
      numberOfImages: 1,
      outputMimeType: 'image/jpeg',
      aspectRatio: '1:1',
    },
  });
  
  const base64ImageBytes = response.generatedImages[0].image.imageBytes;
  return base64ImageBytes;
};

export const generateVideo = async (prompt: string, image: File): Promise<string> => {
  if (!API_KEY) return "API Key not configured.";
  const imagePart = await fileToGenerativePart(image);
  
  let operation = await ai.models.generateVideos({
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    image: {
      imageBytes: imagePart.inlineData.data,
      mimeType: imagePart.inlineData.mimeType,
    },
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: '16:9'
    }
  });

  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({operation: operation});
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  if (!downloadLink) {
    throw new Error("Video generation failed or returned no URI.");
  }
  
  const videoResponse = await fetch(`${downloadLink}&key=${API_KEY}`);
  const videoBlob = await videoResponse.blob();
  return URL.createObjectURL(videoBlob);
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