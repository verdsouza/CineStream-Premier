import { GoogleGenAI } from "@google/genai";

export const getAIRecommendation = async (query: string, availableContentTitles: string[]) => {
  if (!process.env.API_KEY) {
    console.warn("No API_KEY found for Gemini.");
    return "I can't access my brain right now, but I recommend browsing our Trending section!";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = "gemini-3-flash-preview";
    
    const prompt = `
      You are a helpful movie concierge for a premium streaming service.
      The user is asking: "${query}"
      
      Here are the movies/shows we have available: ${availableContentTitles.join(', ')}.
      
      Please recommend 1-2 titles from our list that match their mood or query. 
      If nothing matches perfectly, suggest the closest option.
      Keep the tone professional, cinematic, and brief (max 2 sentences).
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Our AI concierge is momentarily unavailable. Please check the Browse page for all titles.";
  }
};