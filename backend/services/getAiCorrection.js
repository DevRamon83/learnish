import { GoogleGenAI } from "@google/genai";
import summarySchema from "../ai/schema/summarySchema.js";
import generateSummaryPrompt from "../ai/prompt/generateSummaryPrompt.js";

const getAiCorrection = async (summary, lang) => {
  // SDK will find api key
  const ai = new GoogleGenAI();
  const prompt = generateSummaryPrompt(lang);

  const schemaObj = summarySchema(lang);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: summary,
      config: {
        systemInstruction: prompt,
        responseMimeType: "application/json",
        responseSchema: schemaObj,
        temperature: 0,
      },
    });

    const aiResp = response.text;
    const json = JSON.parse(aiResp);

    return { error: false, data: json };
  } catch (err) {
    console.error("ERRORE SDK GEMINI:", err);
    return { error: true, errorMsg: err.message || err };
  }
};

export default getAiCorrection;
