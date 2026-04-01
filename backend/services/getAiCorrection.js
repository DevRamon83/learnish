import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import generateSummaryPrompt from "../helpers/ai/generateSummaryPrompt.js";
import summarySchema from "../helpers/ai/summarySchema.js";

const getAiCorrection = async (summary, lang) => {
  const prompt = generateSummaryPrompt(summary, lang);
  const schema = summarySchema(lang);
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseJsonSchema: schema,
      },
    });

    const aiResp = response.text;
    const json = JSON.parse(aiResp);
    return { error: false, data: json };
  } catch (err) {
    console.error("ERRORE SDK 2026:", err);
    return { error: true, errorMsg: err };
  }
};

export default getAiCorrection;
