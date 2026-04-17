import "dotenv/config";
import Groq from "groq-sdk";
import generateSummaryPrompt from "../helpers/ai/generateSummaryPrompt.js";
import summarySchema from "../helpers/ai/summarySchema.js";

const getAiCorrection = async (summary, lang) => {
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const prompt = generateSummaryPrompt(lang);

  const schemaStr = JSON.stringify(summarySchema(lang));

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `${prompt}. 
                    Respond ONLY in JSON format, following this pattern: ${schemaStr}`,
        },
        {
          role: "user",
          content: summary,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    });

    const aiResp = response.choices[0].message.content;
    const json = JSON.parse(aiResp);

    return { error: false, data: json };
  } catch (err) {
    console.error("ERRORE SDK GROQ:", err);
    return { error: true, errorMsg: err.message || err };
  }
};

export default getAiCorrection;
