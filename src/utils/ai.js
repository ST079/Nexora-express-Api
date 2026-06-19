import { GoogleGenAI } from "@google/genai";
import config from "../config/config.js";

const ai = new GoogleGenAI({ apiKey: config.geminiApiKey });

const promptAi = async (promptMessage) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: promptMessage,
  });

  const text =
    response?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No description available.";

  return text.replace(/\\n/g, "\n").trim();
};

export default promptAi;
