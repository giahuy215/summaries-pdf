import { SUMMARY_SYSTEM_PROMPT } from "@/utils/prompts";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

export const generateSummaryFromGemini = async (pdfText: string) => {
  try {
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-pro-exp-03-25",
      contents: {
        role: "user",
        parts: [
          { text: SUMMARY_SYSTEM_PROMPT },
          {
            text: `Transform this document into an engaging, easy-to-read summary with contextually relevant emojis and proper markdown formatting: \n\n${pdfText}`,
          },
        ],
      },
      config: {
        temperature: 0.7,
        maxOutputTokens: 1500,
      },
    });
    const response = await result.text;

    if (!response) {
      throw new Error("Empty response from Gemini API");
    }
    return response;
  } catch (error: any) {
    console.error("Gemini API Error: ", error);
    throw error;
  }
};
